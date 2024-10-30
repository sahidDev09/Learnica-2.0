"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Reviews from "./Reviews";
import AddNoteForm from "./AddNoteForm";
import Notes from "./Notes";
import Resources from "./Resources";
import { PlaySquare } from "lucide-react";
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
import ReactPlayer from "react-player";

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
  const [playedLectures, setPlayedLectures] = useState([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [currentLectureIndex, setCurrentLectureIndex] = useState(null);
  const [totalDuration, setTotalDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  // Fetch course data
  const { data, isLoading } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${courseId}`
      );
      return res.json();
    },
  });

  // Check enrollment by email
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (!isLoaded || !isSignedIn || !user) return;
      const userEmail = user.primaryEmailAddress?.emailAddress;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-orders?email=${userEmail}&courseId=${courseId}`
        );
        const orders = await res.json();
        const isAlreadyEnrolled = orders.some(
          (order) => order.email === userEmail && order.courseId === courseId
        );
        setIsEnrolled(isAlreadyEnrolled);
      } catch (error) {
        console.error("Error checking enrollment status:", error);
      }
    };
    checkEnrollmentStatus();
  }, [isLoaded, isSignedIn, user, courseId]);

  // Redirect to sign-in if not signed in
  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn || !user) {
        router.replace("/?sign-in=true");
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

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

    // discount
    const discountAmount = discount > 0 ? (totalAmount * discount) / 100 : 0;
    const finalAmount = totalAmount - discountAmount;
    setFinalAmount(finalAmount);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/enroll-api/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            courseId: data._id,
            title: data.name,
            finalAmount: finalAmount,
            email: user.primaryEmailAddress?.emailAddress || "",
            lectures: data.lectures.map((lecture) => ({
              concept_title: lecture.title,
              concept_url: lecture.videoUrl,
              duration: lecture.duration,
              freePreview: true,
            })),
            coupon: coupon,
            discount: discount,
          }),
        }
      );

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

  // Handle payment
  const handlePaymentSuccess = async () => {
    const totalAmount = data.pricing;
    const coupon = data.additionalInfo?.coupon_code || "";
    const discount = data.additionalInfo?.discount_amount || 0;

    // Calculate final amount
    const discountAmount = discount > 0 ? (totalAmount * discount) / 100 : 0;
    const finalAmount = totalAmount - discountAmount;
    setFinalAmount(finalAmount);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/enroll-api/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            courseId: data._id,
            title: data.name,
            email: user.primaryEmailAddress?.emailAddress || "",
            status: "success",
            type: "course",
            finalAmount: finalAmount,
            lectures: data.lectures.map((lecture) => ({
              concept_title: lecture.title,
              concept_url: lecture.videoUrl,
              duration: lecture.duration,
              freePreview: true,
            })),
          }),
        }
      );

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

  // total hours calculation

  useEffect(() => {
    if (data?.lectures) {
      const totalSeconds = data.lectures.reduce(
        (sum, lecture) => sum + lecture.duration,
        0
      );
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      setTotalDuration({ hours, minutes, seconds });
    }
  }, [data]);

  // video playback code

  const handlePlayback = (videoUrl, index) => {
    setCurrentVideoUrl(videoUrl);
    setCurrentLectureIndex(index);
  };

  const handleVideoEnded = () => {
    if (currentLectureIndex !== null) {
      setPlayedLectures((prev) => [...prev, currentLectureIndex]);
    }
  };

  const isLecturePlayed = (index) => playedLectures.includes(index);

  //code for progress bar

  const totalLectures = data?.lectures?.length || 0;
  const progressPercentage = totalLectures
    ? (playedLectures.length / totalLectures) * 100
    : 0;

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
                value={progressPercentage}
                max="100"></progress>
              <span className="font-semibold">{`${Math.round(
                progressPercentage
              )}%`}</span>
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
                    className={`flex gap-2 items-center p-2 rounded-md ${
                      currentLectureIndex === index
                        ? "bg-secondary text-white"
                        : "bg-white"
                    }`}>
                    <div className="bg-secondary p-2 rounded-md">
                      <PlaySquare className="size-8 text-white" />
                    </div>
                    <div className="text-start w-full ml-2">
                      <h2 className="md:text-lg font-semibold">
                        {index + 1}. {item.title.slice(0, 25)}..
                      </h2>
                      <h4 className="ml-5 flex items-center gap-2">
                        Duration : <span>{VideoDuration(item.duration)}</span>
                      </h4>
                    </div>
                    {item.freePreview || isEnrolled ? (
                      <button
                        onClick={() => handlePlayback(item.videoUrl, index)}
                        className="btn btn-sm bg-secondary text-white">
                        {isLecturePlayed(index) ? "Played" : "Play"}
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
          <div className="w-full">
            <ReactPlayer
              controls={true}
              url={currentVideoUrl}
              width={"100%"}
              playing={true}
              className=" rounded-md"
              onEnded={handleVideoEnded}
            />
          </div>

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
                {/* total time for the course */}
                <div className="text-center">
                  <div className="font-semibold text-xl">
                    {totalDuration.hours} h {totalDuration.minutes} min{" "}
                    {totalDuration.seconds} sec
                  </div>
                  <h4 className="text-gray-400 font-semibold">total</h4>
                </div>
              </div>

              <h4 className="my-4">
                Last update : {formatDate(data.publish_date)}
              </h4>

              {/* author card */}
              <h4 className="text-secondary mb-2">Author</h4>
              <div className="flex gap-2 items-center p-2 bg-card rounded-md">
                <Image
                  width={30}
                  height={30}
                  src={data.author.profile}
                  alt="video_thumbnail"
                  className="rounded w-16 h-16"></Image>
                <div className="text-start">
                  <h2 className="text-lg md:text-xl font-semibold">
                    {data.author.name}
                  </h2>
                  <h4 className="text-gray-500">Email : {data.author.email}</h4>
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
              <AddNoteForm courseId={courseId} handleLockedBuyBtn={handleLockedBuyBtn} isEnrolled={isEnrolled} />
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
              <MyReview courseId={courseId} handleLockedBuyBtn={handleLockedBuyBtn} isEnrolled={isEnrolled} />
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
              <Resources courseId={data?._id} userid={data?.author?.id} />
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
                  totalAmount={data.pricing} // Passing the totalAmount to Checkout
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
