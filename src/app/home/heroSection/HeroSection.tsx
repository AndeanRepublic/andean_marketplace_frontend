import FigureWithImg from './FigureWithImg';

export default function HeroSection() {
  return (
    <div className="pt-36 bg-[url(/img/HeroSection_bg.png)] bg-fixed">
        <div className="w-[80%] m-auto text-center">
            <h1 className="display-xl pb-6 text-[##191919] font-black">LIVE THE ANDEAN EXPERIENCE</h1>
            <p className="body-xl-m">
                Discover ancient wisdom, soulful flavors, and experiences that connect you to something deeper.
            </p>
        </div>
        <div className="py-10 w-[93%] m-auto flex flex-wrap items-center justify-around">
            <div>
                <div className="flex justify-end">
                    <FigureWithImg
                        imageUrl="/img/heroSec_img1.png"
                        borderColor="#3067B0"
                        borderWidth={15}
                        size={220}
                    />
                </div>
                <div className="flex justify-start mr-10">
                    <FigureWithImg
                        imageUrl="/img/heroSec_img2.png"
                        borderColor="#3067B0"
                        borderWidth={18}
                        size={320}
                    />
                </div>
                <div className="flex justify-end">
                    <FigureWithImg
                        imageUrl="/img/heroSec_img3.png"
                        borderColor="#3067B0"
                        borderWidth={15}
                        size={220}
                    />
                </div>
            </div>
            <div>
                <FigureWithImg
                    imageUrl="/img/mainImg.png"
                    borderColor="#3067B0"
                    borderWidth={22}
                    size={470}
                />
            </div>
            <div>
                <div className="flex justify-start">
                    <FigureWithImg
                        imageUrl="/img/heroSec_img4.jpg"
                        borderColor="#3067B0"
                        borderWidth={15}
                        size={220}
                    />
                </div>
                <div className="flex justify-end ml-10">
                    <FigureWithImg
                        imageUrl="/img/heroSec_img6.jpg"
                        borderColor="#3067B0"
                        borderWidth={18}
                        size={320}
                    />
                </div>
                <div className="flex justify-start">
                    <FigureWithImg
                        imageUrl="/img/heroSec_img5.png"
                        borderColor="#3067B0"
                        borderWidth={15}
                        size={220}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
