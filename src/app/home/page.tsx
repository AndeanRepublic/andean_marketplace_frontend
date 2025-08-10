import SuperFoodsIntro from '@/app/home/SuperFoodsSection/SuperFoodsIntro'
import SuperFoods from '@/app/home/SuperFoodsSection/SuperFoods';
import HeroSection from "@/app/home/heroSection/HeroSection";


export default function Home() {
  return (
    <>
      <HeroSection />
      <SuperFoodsIntro />
      <SuperFoods />
    </>
  );
}