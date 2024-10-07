import Image from "next/image";
import { FaStar } from "react-icons/fa";

async function Reviews() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/get-reviews')
  const reviews = await res.json()

  return (
    <section className="max-w-screen-lg mx-auto my-6">
      <header className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">Learner Reviews</h2>
      </header>

      {/* cards */}
      {reviews.length > 0
        ? (
          <div className="space-y-5">
            {reviews.map(review => (
              <div key={review._id} className="border p-4 rounded-md shadow-md bg-card">
                <div className="flex items-center gap-4 pb-3">
                  <figure>
                    <Image src={review.reviewerPhotoUrl} alt="reviewer photo" width={40} height={40} className="rounded-full border border-primary" />
                  </figure>
                  <div>
                    <h3 className="text-primary font-bold capitalize">{review.reviewerName}</h3>
                    <p className="flex items-center gap-4">
                      <span className="flex items-center gap-2 font-semibold"><FaStar className="text-yellow-600" /> {review.rating}</span> |
                      <span className="text-sm text-gray-600">Reviewed on {new Date(review.created_at).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>

                <p className="text-sm">{review.review_text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-500">No reviews added till now!</p>
        )
      }
    </section>
  );
}

export default Reviews;