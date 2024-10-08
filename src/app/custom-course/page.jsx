"use client";
import { useEffect, useState, useCallback } from "react";
import { FaTags, FaCheck } from "react-icons/fa"; 
import { FaSquarePlus } from "react-icons/fa6";
import { useUser } from "@clerk/nextjs";
import Loading from "../loading";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("JavaScript");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      lang_tech: selectedCategory,
    });

    try {
      const res = await fetch(`/api/custom?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await res.json();
      setProducts(Array.isArray(data.classes) ? data.classes : []);
      if (categories.length === 0 && data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, categories.length]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Handle category
  const handleCategorySelect = (lang_tech) => {
    setSelectedCategory(lang_tech);
  };

  // Add to Cart
  const addToCart = (product) => {
    if (!cart.find((item) => item._id === product._id)) {
      setCart([...cart, product]);
    }
  };

  // Remove from Cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  //Sidebar
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  if (loading && products.length === 0) {
    return <Loading />;
  }

  //Total Price
  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  return (
    <div className="px-4">
      <div className="container mx-auto">
        <header className="text-center md:text-left text-sm flex items-center justify-between">
          <h2 className="text-md md:text-2xl font-bold hidden md:inline">
            Customize your course
          </h2>
        </header>

        {/* Category Filter */}
        <div className="mt-4">
          <section>
            <div className="flex gap-4 flex-wrap">
              {categories.map((lang_tech, index) => (
                <button
                  key={index}
                  onClick={() => handleCategorySelect(lang_tech)}
                  className={`flex text-sm items-center gap-2 p-2 px-4 text-white bg-primary hover:scale-105 transition-transform md:text-lg ${
                    selectedCategory === lang_tech ? "bg-secondary" : ""
                  }`}
                >
                  <FaTags />
                  {lang_tech}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Cart Button*/}
        <div className="flex justify-end mt-4 relative">
          <button
            onClick={toggleCart}
            className="bg-primary text-2xl text-white font-extrabold p-4 rounded-2xl relative"
          >
            <PiShoppingCartSimpleLight />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-primary rounded-full border border-primary text-xs w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Courses */}
        <div className="my-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const isInCart = cart.find((item) => item._id === product._id);
              return (
                <div
                  key={product._id}
                  className={`bg-card w-full h-40 p-4 rounded-lg shadow-md flex flex-col justify-between relative ${
                    isInCart ? "opacity-50" : ""
                  }`}
                >
                  {/* Button*/}
                  <div className="flex justify-between items-center">
                    <button className="rounded-2xl px-4 py-1 bg-red-300 text-black">
                      {product.lang_tech}
                    </button>
                    <button
                      onClick={() => (isInCart ? null : addToCart(product))}
                      className={`text-3xl ${
                        isInCart ? "text-green-500" : "text-primary"
                      }`}
                      disabled={isInCart} 
                    >
                      {isInCart ? <FaCheck /> : <FaSquarePlus />}
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="flex justify-between items-center mt-2">
                    <h1 className="text-black font-semibold text-lg">
                      {product.concept_title}
                    </h1>
                    <p className="font-bold text-black text-xl">
                      ${product.price}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-yellow-500">{product.rating} ★</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
         <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleCart}
          ></div>

          {/* Sidebar */}
          <div className="relative ml-auto w-80 bg-white h-full shadow-lg p-4 overflow-y-auto">
            <button
              onClick={toggleCart}
              className="text-4xl bg-primary text-white rounded-full mb-4"
            >
              <MdOutlineCancel />
            </button>
            <div className="flex justify-between">
              <h2 className="text-2xl mb-4">Selected Concept</h2>
              <button className="text-3xl text-black">
                <PiShoppingCartSimpleLight />
              </button>
            </div>
            <div className="border border-gray-300"></div>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center mb-4"
                >
                  <div>
                    <h3 className="font-semibold">{item.concept_title}</h3>
                    <p className="text-sm text-gray-600">
                      ${item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
            {/* Checkout Button */}

            {cart.length > 0 && (
              <div className="flex justify-between bg-primary p-4">
                <h1 className="text-white text-xl font-medium">
                  Total = ${total.toFixed(2)}
                </h1>
               
                <Link href="/checkout">
                  <button className="bg-white text-primary p-1 rounded-xl">
                    Pay Now
                  </button>
                </Link>
               
              </div>
              
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
