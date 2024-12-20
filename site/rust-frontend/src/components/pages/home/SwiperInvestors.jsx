import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "./home-styles/SwiperInvestors.css";

import natural from "../../../../public/natural.webp"
import iconic from "../../../../public/iconic.webp"
import hipster from "../../../../public/hipster.webp"
import refresh from "../../../../public/refresh.webp"
import retro from "../../../../public/retro.webp"


export default function SwiperInvestors() {
  return (
    <section className="swiperHome">
        <Swiper className="mySwiper"
        slidesPerView={6} 
        spaceBetween={30}
        >
            <SwiperSlide><img src={natural} alt="natural" /></SwiperSlide>
            <SwiperSlide><img src={iconic} alt="iconic" /></SwiperSlide>
            <SwiperSlide><img src={hipster} alt="hipster" /></SwiperSlide>
            <SwiperSlide><img src={refresh} alt="refresh" /></SwiperSlide>
            <SwiperSlide><img src={retro} alt="retro" /></SwiperSlide>
            <SwiperSlide><img src={natural} alt="natural" /></SwiperSlide>
            <SwiperSlide><img src={iconic} alt="iconic" /></SwiperSlide>
            <SwiperSlide><img src={hipster} alt="hipster" /></SwiperSlide>
            <SwiperSlide><img src={refresh} alt="refresh" /></SwiperSlide>
        </Swiper>
    </section>
  );
}
