"use client"

import { ReactGoogleReviews } from "react-google-reviews"
import Link from "next/link"
import { cn } from "@/consts/utils"
import { useInView } from "@/hooks/useInView"
import Button from "../ui/button"
import { STATIC_REVIEWS } from "@/consts/reviews"
import { googleMapsReviewsUrl } from "@/consts/links"

interface GoogleReview {
  reviewId: string | null
  comment: string
  starRating: number
  reviewer: {
    isAnonymous: boolean
    displayName: string
  }
}

function StarRow({
  rating,
  className = "",
  size = "text-2xl",
}: {
  rating: number
  className?: string
  size?: string
}) {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating)

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {stars.map((filled, index) => (
        <span
          key={index}
          className={`${size} ${filled ? "text-gold" : "text-white/20"}`}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  const fallbackCount = 6
  const fallbackRating = "5.0"
  const { ref, inView } = useInView<HTMLElement>(0.1)

  return (
    <section id="reviews" ref={ref} className="relative text-white lg:py-8">
      <div className="relative mx-auto w-full max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-8">
            <div className="max-w-2xl space-y-4">
              <div className="overflow-hidden">
                <h2
                  className={cn(
                    "text-3xl leading-tight font-extrabold tracking-tight text-white transition-transform duration-700 ease-out sm:text-4xl lg:text-[2.25rem]",
                    inView ? "translate-y-0" : "translate-y-full"
                  )}
                >
                  Reviews on Google
                </h2>
              </div>

              <div
                className={cn(
                  "h-1 bg-gold/70 shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all delay-200 duration-700 ease-out",
                  inView ? "w-32" : "w-0"
                )}
              />

              <p
                className={cn(
                  "max-w-xl text-base leading-7 font-light text-white/70 transition-all delay-400 duration-700 ease-out",
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                )}
              >
                We constantly strive for perfection by listening directly to
                your feedback. See what others are saying today, or click below
                to share your personal experience with us.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {STATIC_REVIEWS.map((review, index) => (
                <article
                  key={review.id}
                  style={{
                    transitionDelay: inView ? `${600 + index * 120}ms` : "0ms",
                  }}
                  className={cn(
                    "flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-600 ease-out",
                    inView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  )}
                >
                  <div className="space-y-1">
                    <StarRow rating={review.rating} />
                    <p className="text-sm leading-6 font-light text-white/80">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-gold">
                      {review.author.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {review.author}
                      </p>
                      <p className="text-xs text-white/50">{review.date}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ReactGoogleReviews
              layout="custom"
              featurableId="28dc1ef6-c772-47f4-80f7-9b5a187f750a"
              widgetVersion="v2"
              theme="dark"
              renderer={(reviews: GoogleReview[]) => {
                const hasReviews = reviews && reviews.length > 0
                const totalRating = hasReviews
                  ? reviews.reduce((acc, item) => acc + item.starRating, 0)
                  : 0
                const liveRating = hasReviews
                  ? (totalRating / reviews.length).toFixed(1)
                  : fallbackRating
                const liveCount = hasReviews ? reviews.length : fallbackCount

                return (
                  <div
                    className={cn(
                      "w-full max-w-xs rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all delay-300 duration-1000 ease-out",
                      inView ? "scale-100 opacity-100" : "scale-90 opacity-0"
                    )}
                  >
                    <p className="text-lg font-bold tracking-[0.2em] text-gold uppercase">
                      Google rating
                    </p>

                    <div
                      className={cn(
                        "mx-auto mt-6 grid h-44 w-44 place-items-center rounded-full border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent transition-all delay-700 duration-700 ease-out",
                        inView ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                      )}
                    >
                      <div className="text-center">
                        <div className="mb-1 text-5xl font-black tracking-tight text-white">
                          {liveRating}
                        </div>
                        <StarRow
                          rating={Math.round(Number(liveRating))}
                          className="justify-center"
                        />
                        <p className="mt-1 text-xs leading-tight text-white/50 uppercase">
                          Based on
                          <br />
                          {liveCount} reviews
                        </p>
                      </div>
                    </div>

                    <Link
                      href={googleMapsReviewsUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button className="mt-6 w-full">View all reviews</Button>
                    </Link>
                  </div>
                )
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
