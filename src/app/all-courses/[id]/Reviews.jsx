"use client";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import Loading from "@/app/loading";
import { useUser } from "@clerk/nextjs";

function Reviews() {
  const user = useUser()
  const userEmail = user?.user.emailAddresses[0].emailAddress

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["course-reviews"],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/get-reviews?email=${userEmail}`
      );
      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="max-w-screen-lg mx-auto mt-6">
      <header className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">Learner Reviews</h2>
      </header>

      {/* cards */}
      {reviews.length > 0 ? (
        <div className="space-y-5 max-h-[500px] border-2 p-4 rounded-md overflow-y-auto">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded-md shadow-md bg-card">

              <div className="flex items-center justify-between flex-col gap-1 md:flex-row md:gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-secondary font-bold capitalize">
                    {review.reviewerName} 
                  </h3> •

                  <p className="flex items-center gap-2 font-semibold text-yellow-800">
                    <FaStar className="text-yellow-600" /> {review.rating}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Reviewed {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>

              <p className="text-sm text-gray-600">{review.review_text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">
          No reviews added till now!
        </p>
      )}
    </section>
  );
}

export default Reviews;
