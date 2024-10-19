"use client";
import { useEffect, useState, useCallback } from "react";
import { FaTags, FaCheck } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { useUser } from "@clerk/nextjs";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { MdOutlineCancel } from "react-icons/md";
import Swal from "sweetalert2";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "../loading";
import Checkout from "@/components/payment/Checkout";
import { IoIosRemoveCircleOutline } from "react-icons/io";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CustomCoursePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("JavaScript");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { user, isLoaded, isSignedIn } = useUser();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // ---------fetch course-----------------
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({ lang_tech: selectedCategory });

    try {
      const res = await fetch(`/api/custom?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setProducts(Array.isArray(data.classes) ? data.classes : []);
      if (categories.length === 0 && data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Fetch Courses Error:", error);
      Swal.fire("Error", "Failed to fetch courses", "error");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, categories.length]);

  useEffect(() => {
    if (isLoaded && isSignedIn) fetchCourses();
  }, [fetchCourses, isLoaded, isSignedIn]);

  // ----------------handle category------------------
  const handleCategorySelect = (lang_tech) => {
    setSelectedCategory(lang_tech);
  };
// -------------------cart----------------------
  const addToCart = (product) => {
    if (!cart.find((item) => item._id === product._id)) {
      setCart([...cart, product]);
    }
  };
// ---------------remove from cart----------------
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };
// ----------------toggle--------------------
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // --------------------stripe payment------------------------
  const handlePayNow = async () => {
    if (!isLoaded || !isSignedIn || !user) {
      Swal.fire("Error", "Please sign in to proceed with payment.", "error");
      return;
    }

    if (cart.length === 0) {
      Swal.fire("Error", "Your cart is empty.", "error");
      return;
    }

    const totalAmount = convertToSubCurrency(
      cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0)
    );

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          items: cart.map((item) => ({
            concept_title: item.concept_title,
            concept_url: item.concept_url,
            price: item.price,
            duration: item.duration,
            lang_tech: item.lang_tech,
            rating: item.rating,
          })),
        }),
      });

      const data = await res.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setIsModalOpen(true);
      } else {
        throw new Error(data.error || "Failed to initialize payment.");
      }
    } catch (error) {
      console.error("Error fetching clientSecret:", error);
      Swal.fire("Error", "Failed to initialize payment. Please try again.", "error");
    }
  };

  // ----------------------backend-----------------------
  const handlePaymentSuccess = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          totalAmount: cart.reduce((sum, item) => sum + parseFloat(item.price), 0),
          items: cart.map((item) => ({
            concept_title: item.concept_title,
            concept_url: item.concept_url,
            price: item.price,
            duration: item.duration,
            lang_tech: item.lang_tech,
            rating: item.rating,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to store order in the database.");
      Swal.fire("Success", "Payment was successful and your order has been placed.", "success");
      setCart([]);
    } catch (error) {
      console.error("Error saving order to database:", error);
      Swal.fire("Error", "Failed to store order. Please contact support.", "error");
    }
  };

  // --------------------loader----------------------

  if (loading && products.length === 0) return <Loading />;

  return (
    <div className="px-4">
      <div className="container mx-auto">
        <header className="text-center md:text-left text-sm flex items-center justify-between">
          <h2 className="text-md md:text-2xl font-bold hidden md:inline">
            Customize your course
          </h2>
        </header>

        {/*--------------------Category Filter--------------- */}
        <div className="mt-4">
          <section>
            <div className="flex gap-4 flex-wrap">
              {categories.map((lang_tech, index) => (
                <button
                  key={index}
                  onClick={() => handleCategorySelect(lang_tech)}
                  className={`flex text-sm items-center gap-2 p-2 px-4 text-white bg-secondary hover:scale-105 transition-transform md:text-lg ${selectedCategory === lang_tech ? "bg-primary" : ""
                    }`}
                >
                  <FaTags />
                  {lang_tech}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/*-----------------Cart Button--------------------- */}
        <div className="flex justify-end mt-4 relative">
          <button
            onClick={toggleCart}
            className="bg-primary text-2xl text-white font-extrabold p-4 rounded-2xl relative"
          >
            <PiShoppingCartSimpleLight />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white rounded-full border text-xs w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/*-----------------Courses------------------ */}
        <div className="my-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const isInCart = cart.find((item) => item._id === product._id);
              return (
                <div
                  key={product._id}
                  className={`bg-secondary w-full h-40 p-4 rounded-lg shadow-md flex flex-col justify-between relative ${isInCart ? "opacity-50" : ""
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <button className="rounded-2xl px-4 py-1 bg-white text-black">
                      {product.lang_tech}
                    </button>
                    <button
                      onClick={() => (isInCart ? null : addToCart(product))}
                      className={`text-3xl ${isInCart ? "text-green-500" : "text-primary"
                        }`}
                      disabled={isInCart}
                    >
                      {isInCart ? <FaCheck /> : <FaSquarePlus />}
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <h1 className="text-white font-semibold text-lg">
                      {product.concept_title}
                    </h1>
                    <p className="font-bold text-white text-xl">
                      $ {parseFloat(product.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-yellow-500">{product.rating} ★</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/*--------------------Cart Sidebar----------------- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleCart}
          ></div>
          <div className="relative ml-auto w-80 bg-white h-full shadow-lg p-4 overflow-y-auto">
            <button
              onClick={toggleCart}
              className="text-4xl bg-primary text-white rounded-full mb-4"
            >
              <MdOutlineCancel />
            </button>
            <div className="flex justify-between">
              <h2 className="text-2xl mb-4">Selected Concepts</h2>
              <button className="text-3xl text-black">
                <PiShoppingCartSimpleLight />
              </button>
            </div>
            <div className="border border-gray-300"></div>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="my-4 flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <p className="text-lg font-semibold">{item.concept_title}</p>
                      <p className="text-gray-500">{item.lang_tech}</p>
                    </div>

                    <p className="text-lg font-semibold text-center mx-4">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-600"
                    >
                      <IoIosRemoveCircleOutline />
                    </button>
                  </div>
                ))}

                <div className="border border-gray-300"></div>
                <div className="flex justify-between mt-4">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-semibold">
                    €
                    {cart
                      .reduce((sum, item) => sum + parseFloat(item.price), 0)
                      .toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handlePayNow}
                  className="bg-primary text-white mt-4 p-3 rounded-lg w-full"
                >
                  Pay Now
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/*----------------Payment Modal----------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed text-white inset-0 bg-black opacity-50"></div>
          <div className="relative w-full md:w-2/3 lg:w-1/3 bg-white  p-4 rounded-lg shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-4xl bg-primary text-white rounded-full mb-4"
            >
              <MdOutlineCancel />
            </button>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <Checkout
                  clientSecret={clientSecret}
                  handlePaymentSuccess={handlePaymentSuccess}
                  setIsModalOpen={setIsModalOpen}
                  cart={cart}
                />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCoursePage;
