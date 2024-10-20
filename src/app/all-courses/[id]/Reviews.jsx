"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Loader from "@/components/shared/Loader";
import Loading from "@/app/loading";

function Reviews() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["course-reviews"],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/get-reviews"
      );
      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="max-w-screen-lg mx-auto">
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
              <div className="flex items-center gap-4">
                <figure>
                  <Image
                    src={review.reviewerPhotoUrl}
                    alt="reviewer photo"
                    width={40}
                    height={40}
                    className="rounded-full border border-primary"
                  />
                </figure>
                <div>
                  <h3 className="text-primary font-bold capitalize">
                    {review.reviewerName}
                  </h3>
                  <p className="flex items-center gap-4">
                    <span className="flex items-center gap-2 font-semibold">
                      <FaStar className="text-yellow-600" /> {review.rating}
                    </span>{" "}
                    |
                    <span className="text-sm text-gray-600">
                      Reviewed on{" "}
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>

              <p className="text-sm">{review.review_text}</p>
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
