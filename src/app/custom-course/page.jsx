"use client";
import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tag, 
  Check, 
  Plus, 
  ShoppingCart, 
  X, 
  Trash2, 
  Star, 
  Clock, 
  BookOpen,
  ArrowRight,
  Sparkles,
  Search
} from "lucide-react";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Loading from "../loading";
import Checkout from "@/components/payment/Checkout";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CustomCoursePage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("JavaScript");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { user, isLoaded, isSignedIn } = useUser();
  const [cart, setCart] = useState([]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const showError = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
      confirmButtonColor: "#135276",
    });
  };

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
      showError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, categories.length]);

  useEffect(() => {
    if (isLoaded && isSignedIn) fetchCourses();
  }, [fetchCourses, isLoaded, isSignedIn]);

  const addToCart = (product) => {
    if (!cart.some((item) => item._id === product._id)) {
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const handlePayNow = async () => {
    if (!isLoaded || !isSignedIn || !user) {
      showError("Please sign in to proceed with payment.");
      return;
    }

    if (cart.length === 0) {
      showError("Your cart is empty.");
      return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
    setFinalAmount(totalAmount);

    try {
      setClientSecret(null);
      setIsModalOpen(false);
  
      const res = await fetch("/pay-api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          finalAmount: totalAmount,
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          lectures: cart.map((item) => ({
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
      showError("Failed to initialize payment. Please try again.");
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const res = await fetch("/pay-api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          title: courseTitle,
          status: "success",
          type: "custom",
          finalAmount: cart.reduce((sum, item) => sum + parseFloat(item.price), 0),
          lectures: cart.map((item) => ({
            title: item.concept_title,
            videoUrl: item.concept_url,
            price: item.price,
            duration: item.duration,
            category: item.lang_tech,
            rating: item.rating,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to store order.");

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your custom course has been created successfully.",
        confirmButtonColor: "#135276",
      });

      setCart([]);
      setCourseTitle("");
      router.push("/payment-history");
    } catch (error) {
      showError("Failed to store order. Please contact support.");
    }
  };

  const filteredProducts = products.filter(p => 
    p.concept_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && products.length === 0) return <Loading />;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#135276] py-16 px-4 mb-8">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#135276] rounded-full blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Build Your <span className="text-blue-300">Perfect</span> Learning Path
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Select only the concepts you need. Pay for what you want to learn. Create your unique curriculum today.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-[-40px]">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 glass">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search concepts..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
              {categories.map((lang, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(lang)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 font-medium ${
                    selectedCategory === lang 
                    ? "bg-primary text-white shadow-lg shadow-primary/30" 
                    : "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primaryShadow"
                  }`}
                >
                  <Tag className="w-4 h-4" />
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="bg-[#135276] p-8 rounded-3xl shadow-sm inline-block">
                <BookOpen className="w-20 h-20 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">No concepts found</h3>
                <p className="text-white">Try adjusting your search or category filter</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => {
                const isInCart = cart.find((item) => item._id === product._id);
                return (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={`group relative bg-[#135276]/10 border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all ${
                      isInCart ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold uppercase tracking-wider">
                        {product.lang_tech}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => !isInCart && addToCart(product)}
                        className={`p-3 rounded-2xl transition-all ${
                          isInCart 
                          ? "bg-green-100 text-green-600" 
                          : "bg-primary/5 text-primary hover:bg-primary hover:text-white"
                        }`}
                        disabled={isInCart}
                      >
                        {isInCart ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </motion.button>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {product.concept_title}
                    </h3>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold">{product.rating || "4.8"}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{product.duration || "45m"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-black text-primary">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                      {isInCart && (
                        <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Added
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="group bg-primary text-white p-5 rounded-3xl shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7" />
              <span className="absolute -top-3 -right-3 bg-white text-primary text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                {cart.length}
              </span>
            </div>
            <span className="font-bold text-lg pr-2">View Cart</span>
          </button>
        </motion.div>
      )}

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-primary text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-xl">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold">Your Custom Course</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingCart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-500">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      layout
                      key={item._id}
                      className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between gap-4 group hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">
                          {item.lang_tech}
                        </span>
                        <h4 className="font-bold text-slate-800 line-clamp-1">{item.concept_title}</h4>
                        <p className="text-sm font-semibold text-primary">${parseFloat(item.price).toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-6">
                  <div className="flex items-center justify-between text-xl font-black text-slate-800">
                    <span>Total Amount</span>
                    <span className="text-primary">
                      ${cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Give your course a title</label>
                      <input
                        type="text"
                        placeholder="e.g. My Advanced JavaScript Masterclass"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <button
                      onClick={handlePayNow}
                      disabled={courseTitle.replace(/\s+/g, "").length < 10}
                      className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl transition-all ${
                        courseTitle.replace(/\s+/g, "").length >= 10
                        ? "bg-primary text-white hover:scale-[1.02] shadow-primary/20"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      Initialize Payment <ArrowRight className="w-5 h-5" />
                    </button>
                    {courseTitle.replace(/\s+/g, "").length < 10 && (
                      <p className="text-[10px] text-center text-slate-400 italic">
                        * Title must be at least 10 characters
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="bg-primary p-6 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-300" />
                    Secure Checkout
                  </h3>
                  <p className="text-blue-100 text-sm">Review and complete your purchase</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8">
                {clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <Checkout
                      clientSecret={clientSecret}
                      handlePaymentSuccess={handlePaymentSuccess}
                      setIsModalOpen={setIsModalOpen}
                      totalAmount={finalAmount}
                      cart={cart}
                    />
                  </Elements>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCoursePage;
