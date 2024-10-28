"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Reviews from "./Reviews";
import AddNoteForm from "./AddNoteForm";
import Notes from "./Notes";
import Resources from "./Resources";
import { Clock, PlaySquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Questions from "./Questions";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import MyReview from "./MyReview";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel } from "react-icons/md";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "@/components/payment/Checkout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Page = ({ params }) => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const courseId = params.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);

  // Fetch course data
  const { data, isLoading } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${courseId}`
      );
      console.log('coureId', courseId)
      return res.json();
    },
  });

  // ------------check enrollment---------
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (!isLoaded || !isSignedIn || !user) return;
      try {
        const res = await fetch(
          `http://localhost:3000/api/get-orders?userId=${user.  id}`
        );
        const orders = await res.json();
        const isAlreadyEnrolled = orders.some(
          (order) => order.courseId === courseId
        );
        setIsEnrolled(isAlreadyEnrolled);
      } catch (error) {
        console.error("Error checking enrollment status:", error);
      }
    };
    checkEnrollmentStatus();
  }, [isLoaded, isSignedIn, user, courseId]);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn || !user) {
        router.replace("/?sign-in=true");
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  // video durations

  const VideoDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes} min ${seconds} sec`;
  };

  const handleLockedBuyBtn = () => {
    Swal.fire({
      title: "Access Denied",
      icon: "info",
      html: "You can watch more after enrolling in this course",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Enroll Now",
      confirmButtonColor: "#135276",
      cancelButtonText: "Skip for later",
      cancelButtonColor: "#d33",
      preConfirm: () => handlePayNow(),
    });
  };

  // Initialize payment intent
  const handlePayNow = async () => {
    if (!isLoaded || !isSignedIn || !user) {
      Swal.fire("Error", "Please sign in to proceed with payment.", "error");
      return;
    }

    if (!data?.pricing) {
      Swal.fire("Error", "Invalid course data or pricing not found.", "error");
      return;
    }

    const totalAmount = data.pricing;
    const coupon = data.additionalInfo?.coupon_code || "";
    const discount = data.additionalInfo?.discount_amount || 0;


    // Calculate final amount with discount
    const discountAmount = discount > 0 ? (totalAmount * discount) / 100 : 0;
    const finalAmount = totalAmount - discountAmount;
    setFinalAmount(finalAmount); // Set final amount state
    try {
      const res = await fetch("/enroll-api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          courseId: data._id,
          title: data.name,
          finalAmount: finalAmount,
          email: user.primaryEmailAddress?.emailAddress || "",
          items: data.lectures.map((item) => ({
            concept_title: item.title,
            concept_url: item.videoUrl,
            duration: item.duration,
          })),
          coupon: coupon,
          discount: discount,
        }),
      });

      const paymentData = await res.json();

      if (paymentData.clientSecret) {
        setClientSecret(paymentData.clientSecret);
        setIsModalOpen(true);
      } else {
        throw new Error(paymentData.error || "Failed to initialize payment.");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = async () => {

    
    const totalAmount = data.pricing;
    const coupon = data.additionalInfo?.coupon_code || "";
    const discount = data.additionalInfo?.discount_amount || 0;


    // Calculate final amount with discount
    const discountAmount = discount > 0 ? (totalAmount * discount) / 100 : 0;
    const finalAmount = totalAmount - discountAmount;
    setFinalAmount(finalAmount); // Set final amount state
    try {
      const res = await fetch("/enroll-api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          courseId: data._id,
          title: data.name,
          email: user.primaryEmailAddress?.emailAddress || "",
          status: "success",
          finalAmount: finalAmount,
          items: data.lectures.map((item) => ({
            concept_title: item.title,
            concept_url: item.videoUrl,
            duration: item.duration,
          })),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || "Failed to store order in the database."
        );
      }
      setIsEnrolled(true);

      // Swal success message
      Swal.fire({
        title: "Success",
        text: "Payment and enrollment successful!",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Payment History",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsModalOpen(false);
        } else if (result.isDismissed) {
          router.push("/payment-history");
        }
      });
    } catch (error) {
      console.error("Error storing order:", error);
      Swal.fire(
        "Error",
        "Failed to store order. Please contact support.",
        "error"
      );
    }
  };

  if (isLoading || !isLoaded) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row px-2">
        <div className="lg:w-5/12">
          <div className="bg-card p-6 h-full rounded-xl">
            <h2 className="text-2xl md:text-3xl font-semibold">{data.name}</h2>
            <div className="flex gap-2 items-center my-4">
              <progress
                className="progress progress-error w-full"
                value="10"
                max="100"></progress>
              <span className="font-semibold">10%</span>
            </div>
            <Button
              onClick={isEnrolled ? null : handlePayNow}
              className={isEnrolled ? "bg-gray-500 mb-2" : "bg-primary mb-2"}
              disabled={isEnrolled}>
              {isEnrolled ? "Already Enrolled" : "Enroll Now"}
            </Button>

            <div className="space-y-3">
              {data?.lectures?.length > 0 ? (
                data.lectures.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center p-2 bg-white w-full rounded-md">
                    <div className="bg-secondary p-2 rounded-md">
                      <PlaySquare className="size-8 text-white" />
                    </div>
                    <div className="text-start w-full ml-2">
                      <h2 className="md:text-lg font-semibold">
                        {index + 1}. {item.title.slice(0, 40)}..
                      </h2>
                      <h4 className="ml-5 flex items-center gap-2">
                        Duration : <span className=" text-secondary">{VideoDuration(item.duration)}</span>
                      </h4>
                    </div>
                    {item.freePreview || isEnrolled ? (
                      <button className="btn btn-sm bg-secondary text-white">
                        Play
                      </button>
                    ) : (
                      <button
                        onClick={handleLockedBuyBtn}
                        className="btn btn-sm bg-gray-400 text-white">
                        Locked
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div>No lectures available</div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-7/12 lg:px-6 w-full px-4 my-6 lg:my-0">
          <iframe
            className="w-full rounded-xl"
            width="600"
            height="340"
            src="https://www.youtube.com/embed/kmZz0v4COpw?start=314"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
          {/* tab */}

        
        </div>
      </div>

      {/*----------------Payment Modal----------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed text-white inset-0 bg-black opacity-50"></div>
          <div className="relative w-full md:w-2/3 lg:w-1/3 bg-white  p-4 rounded-lg shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-4xl bg-primary text-white rounded-full mb-4">
              <MdOutlineCancel />
            </button>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <Checkout
                  clientSecret={clientSecret}
                  handlePaymentSuccess={handlePaymentSuccess}
                  setIsModalOpen={setIsModalOpen}
                  totalAmount={data.pricing}   // Passing the totalAmount to Checkout
                  coupon={data.additionalInfo?.coupon_code || ""}
                  discount={data.additionalInfo?.discount_amount || 0}
                />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
