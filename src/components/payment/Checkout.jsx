import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

const Checkout = ({
  clientSecret,
  handlePaymentSuccess,
  setIsModalOpen,
  totalAmount,
  coupon = "", // use coupon as prop
  discount = 0, // use discount as prop
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCouponInputVisible, setIsCouponInputVisible] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [finalAmount, setFinalAmount] = useState(Number(totalAmount) || 0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponMessageType, setCouponMessageType] = useState(""); // success or error

  // Effect to reset final amount when totalAmount changes
  useEffect(() => {
    setFinalAmount(Number(totalAmount));
  }, [totalAmount]);

  const handleApplyCoupon = () => {
    if (appliedCoupon.trim().toLowerCase() === coupon.trim().toLowerCase()) {
      const discountAmount = totalAmount * (discount / 100);
      setFinalAmount(Number(totalAmount) - discountAmount);
      setIsCouponApplied(true);
      setCouponMessage(`Coupon applied! You've received a ${discount}% discount.`);
      setCouponMessageType("success");
    } else {
      setIsCouponApplied(false);
      setFinalAmount(Number(totalAmount));
      setCouponMessage("Invalid Coupon. Please check the code and try again.");
      setCouponMessageType("error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe.js has not yet loaded.");
      setIsLoading(false);
      return;
    }

    try {
      const { error, paymentIntent, paymentMethod } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/custom-course",
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "An unexpected error occurred.");
      } else if (paymentIntent) {
        const cardType = paymentMethod?.card?.brand || "unknown";
        const paymentStatus = paymentIntent.status;
        if (paymentStatus === "succeeded") {
          await handlePaymentSuccess(paymentIntent, cardType, paymentStatus);
          setIsModalOpen(false);
        } else {
          setErrorMessage("Payment was not successful. Please try again.");
        }
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred while processing the payment.");
      console.error("Payment Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {coupon && discount > 0 ? (
        <p className="text-secondary">You have a Coupon Code! Wanna apply it?</p>
      ) : (
        <p className="text-red-500">You have no discount available.</p>
      )}

      {isCouponApplied && coupon && discount > 0 && (
        <div className="text-green-500 ">
          Coupon Applied: {coupon} - Discount: {discount}%
        </div>
      )}

      {!isCouponApplied && coupon && discount > 0 && (
        <div>
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={() => setIsCouponInputVisible(!isCouponInputVisible)}
          >
            {isCouponInputVisible ? "Hide Coupon" : "Click here"}
          </button>
          {isCouponInputVisible && (
            <div className="mt-2">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={appliedCoupon}
                  onChange={(e) => setAppliedCoupon(e.target.value)}
                  className="p-2 rounded-l border w-full text-black"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-secondary text-white p-2 rounded-r"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Display coupon message based on success or error */}
      {couponMessage && (
        <div className={`mt-2 text-${couponMessageType === "success" ? "green" : "red"}-500`}>
          {couponMessage}
        </div>
      )}

      <PaymentElement />

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      <button
        className={`bg-secondary text-white mt-4 p-3 rounded-lg w-full ${isLoading ? "opacity-50" : ""}`}
        disabled={isLoading || !stripe || !clientSecret}
        type="submit"
      >
        {isLoading ? "Processing..." : `Pay Now $${finalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default Checkout;
