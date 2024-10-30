"use client"
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import Loading from "@/app/loading";
import AddReviewForm from "./AddReviewForm";

function MyReview({courseId, handleLockedBuyBtn, isEnrolled}) {
  const user = useUser()
  const userEmail = user?.user?.emailAddresses[0]?.emailAddress

  const { data: myReview, isLoading, refetch } = useQuery({
    queryKey: ["my-review", courseId],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/get-reviews?email=${userEmail}&onlyMe=1&courseId=${courseId}`
      );
      return res.json();
    },
  });

  // handle delete review
  const handleDeleteReview = async () => {
    try {
      // confirmation alert
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#15803D",
        cancelButtonColor: "#B91C1C",
        confirmButtonText: "Yes, delete it!",
      });
      if (!isConfirmed) return;

      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/get-reviews`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );
      await res.json();
      
      await refetch();
      Swal.fire({
        title: "Successfully deleted the question!",
        icon: "success",
        confirmButtonColor: "#15803D",
      });
    } catch (error) {
      Swal.fire({
        title: "Error on deleting question!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#B91C1C",
      });
    }
  };


  if (isLoading) { return <Loading /> }
  if (myReview[0]) {
    return (
      <div>
        <header className="mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-secondary">My Review</h2>
        </header>
  
        <div className="border p-4 rounded-md shadow-md bg-card">
          <div className="flex items-center justify-between flex-col gap-1 md:flex-row md:gap-4 mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-secondary font-semibold text-sm">
                {myReview[0].reviewerEmail}
              </h3> • 
  
              <p className="flex items-center gap-2 font-semibold text-yellow-800">
                <FaStar className="text-yellow-600" /> {myReview[0].rating}
              </p> •

              <button 
                onClick={handleDeleteReview}
                className="p-1 border border-transparent hover:border-red-600 text-red-600 rounded hover:-translate-y-1 transition-all"
              >{<FaTrash />}</button>

            </div>
            <p className="text-sm text-gray-500">
              Reviewed {new Date(myReview[0].created_at).toLocaleDateString()}
            </p>
          </div>
  
          <p className="text-sm text-gray-600">{myReview[0].review_text}</p>
        </div>
      </div>
    );
  } else {
    return <AddReviewForm courseId={courseId} handleLockedBuyBtn={handleLockedBuyBtn} isEnrolled={isEnrolled} />
  }
}

export default MyReview;