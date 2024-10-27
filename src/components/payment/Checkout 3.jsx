import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";

const Checkout = ({
  clientSecret,
  handlePaymentSuccess,
  setIsModalOpen,
  cart,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/custom-course",
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setIsLoading(false);
      Swal.fire(
        "Error",
        error.message || "An unexpected error occurred.",
        "error"
      );
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsModalOpen(false);
      await handlePaymentSuccess();
    }
  };

  return (
    <form className="text-white" onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      <button
        className={`bg-primary text-white mt-4 p-3 rounded-lg w-full ${
          isLoading ? "opacity-50" : ""
        }`}
        disabled={isLoading || !stripe || !clientSecret}
        type="submit">
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default Checkout;
