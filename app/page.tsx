import Hero from "./components/Hero"
import WearYourStory from "./components/WearYourStory"
import FeatureCarousel from "./components/FeatureCarousel"
import Timeline from "./components/Timeline"
import Marquee from "./components/Marquee"
import ContactForm from "./components/ContactForm"
import NewsletterSubscribe from "./components/NewsletterSubscribe"
import F1Showcase from "./components/F1Showcase"

export default function Home() {
  return (
    <>
      <Hero />
      <WearYourStory />
      <F1Showcase />
      <FeatureCarousel />
      {/* <Timeline /> */}
      <Marquee />
      <ContactForm />
      <NewsletterSubscribe />
    </>
  )
}

