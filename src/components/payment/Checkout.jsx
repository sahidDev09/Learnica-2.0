import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";

const Checkout = ({ clientSecret, handlePaymentSuccess, setIsModalOpen, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe.js has not yet loaded.");
      setIsLoading(false);
      return;
    }

    try {
      // Confirm payment
      const { error, paymentIntent, paymentMethod } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/custom-course",
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "An unexpected error occurred.");
        Swal.fire("Error", error.message || "An unexpected error occurred.", "error");
      } else if (paymentIntent) {
        // Get card details (if available)
        const cardType = paymentMethod?.card?.brand || "unknown";
        const paymentStatus = paymentIntent.status; // Payment status from the paymentIntent

        // Check if the payment was successful
        if (paymentStatus === "succeeded") {
          // Send the card type and payment status to handlePaymentSuccess
          await handlePaymentSuccess(paymentIntent, cardType, paymentStatus);
          
          // Close the modal after successful payment
          setIsModalOpen(false);
        } else {
          // Handle unsuccessful payment
          setErrorMessage("Payment was not successful. Please try again.");
          Swal.fire("Payment Failed", "Your payment could not be processed. Please check your details and try again.", "error");
        }
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred while processing the payment.");
      console.error("Payment Error:", err);
      Swal.fire("Error", "An unexpected error occurred. Please try again later.", "error");
    } finally {
      setIsLoading(false); // Always reset loading state
    }
  };

  return (
    <form className="text-white" onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      <button
        className={`bg-primary text-white mt-4 p-3 rounded-lg w-full ${isLoading ? "opacity-50" : ""}`}
        disabled={isLoading || !stripe || !clientSecret}
        type="submit"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default Checkout;
