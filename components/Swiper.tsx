import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronUp, ChevronDown } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

export default function VerticalSlider() {
    const swiperRef = useRef<any>(null);

    const images = [
        "/icons/krishna.png",
        "/icons/ganesh.png",
        "/icons/shiva.png",
        "/icons/ram.png",
        "/icons/vishnu.png",
        "/icons/hanuman.png",
        "/icons/durga.png",
        "/icons/mahamritunjaya.png"
    ];

    return (
        <div className="relative mx-auto w-full max-w-md">
            {/* Top Arrow */}
            <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute top-2 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 shadow"
            >
                <ChevronUp size={20} />
            </button>

            <Swiper
                direction="vertical"
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={20}
                className="h-[300px] rounded-3xl"
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide>
                        <div className="flex h-full w-full items-center justify-center">
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-[220px] sm:w-[350px] h-auto object-contain rounded-3xl shadow-[0_0px_50px_0px_rgba(248,165,68,0.55)] backdrop-blur-3xl transition duration-300 hover:border-orange-200/30 "
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Bottom Arrow */}
            <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 shadow"
            >
                <ChevronDown size={20} />
            </button>
        </div>
    );
}