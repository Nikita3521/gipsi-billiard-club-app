import WelcomeSection from "@/components/home-page/WelcomeSection"
import AboutSection from "@/components/home-page/AboutSection"
import OpeningHoursSection from "@/components/home-page/OpeningHoursSection"
import PrivateLessonsSection from "@/components/home-page/PrivateLessonsSection"
import MenuSection from "@/components/home-page/MenuSection"
import TournamentsSection from "@/components/home-page/TournamentsSection"
import ReviewsSection from "@/components/home-page/ReviewsSection"

export default function Page() {
  return (
    <main>
      <WelcomeSection />
      <AboutSection />
      <OpeningHoursSection />
      <PrivateLessonsSection />
      <MenuSection />
      <TournamentsSection />
      <ReviewsSection />
    </main>
  )
}
