"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Reviews from "./Reviews";
import AddReviewForm from "./AddReviewForm";
import AddNoteForm from "./AddNoteForm";
import Notes from "./Notes";
import Resources from "./Resources";
import { Clock, PlaySquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Questions from "./Questions";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import MyReview from "./MyReview";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel } from "react-icons/md";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "@/components/payment/Checkout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Page = ({ params }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const courseId = params.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // Wait until Clerk has fully loaded and the user is determined
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect("/?sign-in=true");
    }
  }, [isLoaded, isSignedIn]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${params.id}`
      );
      return res.json();
    },
  });

  const VideoDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes} min ${seconds} sec`;
  };

  const handleLockedBuybtn = () => {
    Swal.fire({
      title: "Access Denied",
      icon: "info",
      html: "You can watch more after enrolling in this course",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Enroll Now",
      confirmButtonColor: "#135276",
      cancelButtonText: "Skip for later",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        handlePayNow(); // This will call the function when "Enroll Now" is clicked
      }
    });
  };

 // Initialize payment intent
 const handlePayNow = async () => {
  if (!isLoaded || !isSignedIn || !user) {
    showError("Please sign in to proceed with payment.");
    return;
  }

  if (!data?.pricing) {
    showError("Invalid course data or pricing not found.");
    return;
  }

  const totalAmount = data.pricing;

  try {
    const res = await fetch("/enroll-api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        courseId:data._id,
        title:data.name,
        amount: totalAmount,
        email: user.primaryEmailAddress?.emailAddress || "",
        items: data.lectures.map((item) => ({
          concept_title: item.title,
          concept_url: item.videoUrl,
          duration: item.duration,
        })),
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
  try {
    const res = await fetch("/enroll-api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        courseId:data._id,
        title:data.name,
        email: user.primaryEmailAddress?.emailAddress || "",
        status: "success",
        totalAmount: data.pricing,
        items: data.lectures.map((item) => ({
          concept_title: item.title,
          concept_url: item.videoUrl,
          duration: item.duration,
        })),
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed to store order in the database.");
    }

    Swal.fire("Success", "Payment and enrollment successful!", "success");
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error storing order:", error);
    showError("Failed to store order. Please contact support.");
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
            {/* title */}
            <h2 className="text-2xl md:text-3xl font-semibold">{data.name}</h2>
            {/* progress */}
            <div className="flex gap-2 items-center my-4">
              <progress
                className="progress progress-error w-full"
                value="10"
                max="100"
              ></progress>
              <span className="font-semibold">10%</span>
            </div>
            <Button onClick={handlePayNow} className="my-3 bg-primary">
              Enroll Now
            </Button>
            {/* content */}
            <div className="space-y-3">
              {data?.lectures?.length > 0 ? (
                data.lectures.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center p-2 bg-white w-full rounded-md"
                  >
                    <div className="bg-secondary p-2 rounded-md">
                      <PlaySquare className="size-8 text-white" />
                    </div>
                    <div className="text-start w-full ml-2">
                      <h2 className="md:text-lg font-semibold">
                        {index + 1}. {item.title.slice(0, 25)}..
                      </h2>
                      <h4 className="ml-5 flex items-center gap-2">
                        <Clock className="h-5 w-5" />{" "}
                        {VideoDuration(item.duration)}
                      </h4>
                    </div>
                    {item.freePreview === true ? (
                      <button className="btn btn-sm bg-secondary text-white">
                        Play
                      </button>
                    ) : (
                      <button
                        onClick={handleLockedBuybtn}
                        className="btn btn-sm bg-gray-400 text-white"
                      >
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

          <div
            role="tablist"
            className="tabs tabs-bordered mt-4 bg-secondary pt-4 rounded-md w-full sm:max-w-none md:max-w-none lg:max-w-full flex flex-col md:inline-grid">
            {/*--------------------------------- Overview --------------------------------*/}
            <input
              type="radio"
              name="my_tabs_1"
              className="tab mx-2 px-2 text-white"
              aria-label="Overview"
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content py-4 min-h-full bg-white w-full">
              <h2 className="text-lg md:text-xl font-semibold">{data.title}</h2>
              <div className="flex gap-5 my-4 w-full">
                <div className="text-center">
                  <div className="flex gap-2">
                    <span className="font-semibold text-xl">4.6</span>{" "}
                    <FaStar className="text-xl mt-1 text-orange-600" />
                  </div>
                  <h4 className="text-gray-400 font-semibold">
                    34,506 ratings
                  </h4>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-xl">5,406</div>
                  <h4 className="text-gray-400 font-semibold">Students</h4>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-xl">50 h</div>
                  <h4 className="text-gray-400 font-semibold">total</h4>
                </div>
              </div>

              <h4 className="my-4">Last update 2024</h4>

              {/* author card */}
              <h4 className="text-secondary mb-2">Author</h4>
              <div className="flex gap-2 items-center p-2 bg-card rounded-md">
                <Image
                  width={30}
                  height={30}
                  src={"/assets/developers/numan.jpg"}
                  alt="video_thumbnail"
                  className="rounded w-16 h-16"></Image>
                <div className="text-start">
                  <h2 className="text-lg md:text-xl font-semibold">Jhon doe</h2>
                  <h4 className="text-gray-500">Web Developer </h4>
                </div>
              </div>
            </div>
            {/* --------------------------- Q&A -------------------------*/}
            <input
              type="radio"
              name="my_tabs_1"
              className="tab mx-2 px-2 text-white"
              aria-label="Q&A"
            />
            <div role="tabpanel" className="tab-content py-4 bg-white w-full">
              <Questions courseId={courseId} />
            </div>
            {/*------------------------------- Notes ----------------------------*/}
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab mx-2 px-2 text-white"
              aria-label="Notes"
            />
            <div role="tabpanel" className="tab-content py-2 bg-white w-full">
              <AddNoteForm courseId={courseId} />
              <Notes courseId={courseId} />
            </div>
            {/*------------------------------- Reviews --------------------------*/}
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab mx-2 px-2 text-white"
              aria-label="Reviews"
            />
            <div role="tabpanel" className="tab-content pt-4 bg-white w-full">
              <MyReview courseId={courseId} />
              <Reviews courseId={courseId} />
            </div>

            {/*------------------------------- Attachment --------------------------*/}

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab mx-2 px-2 text-white"
              aria-label="Resources"
            />
            <div role="tabpanel" className="tab-content bg-white pt-2 w-full">
              <Resources courseId={data._id} userid={data.userId} />
            </div>
          </div>
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
