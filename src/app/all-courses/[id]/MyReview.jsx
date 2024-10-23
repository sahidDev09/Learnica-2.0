"use client"
import Loading from "@/app/loading";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa6";
import AddReviewForm from "./AddReviewForm";

function MyReview() {
  const user = useUser()
  const userEmail = user?.user.emailAddresses[0].emailAddress

  const { data: myReview, isLoading } = useQuery({
    queryKey: ["my-review"],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/get-reviews?email=${userEmail}&onlyMe=1`
      );
      return res.json();
    },
  });


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
              <h3 className="text-secondary font-bold capitalize">
                {myReview[0].reviewerName}
              </h3> •
  
              <p className="flex items-center gap-2 font-semibold text-yellow-800">
                <FaStar className="text-yellow-600" /> {myReview[0].rating}
              </p>
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
    return <AddReviewForm />
  }
}

export default MyReview;