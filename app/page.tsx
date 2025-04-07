import Hero from "./components/Hero"
import WearYourStory from "./components/WearYourStory"
import FeatureCarousel from "./components/FeatureCarousel"
import RegistrationGuides from "./components/PortfolioGrid"
import Timeline from "./components/Timeline"
import Marquee from "./components/Marquee"
import ContactForm from "./components/ContactForm"
import NewsletterSubscribe from "./components/NewsletterSubscribe"
import NumberPlates from "./components/NumberPlates"

export default function Home() {
  return (
    <>
      <Hero />
      <WearYourStory />
      <NumberPlates />
      <FeatureCarousel />
      <RegistrationGuides />
      <Timeline />
      <Marquee />
      <ContactForm />
      <NewsletterSubscribe />
    </>
  )
}

