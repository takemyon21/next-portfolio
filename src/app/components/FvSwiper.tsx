"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Slider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} // モジュールを読み込む
      spaceBetween={12} // スライド間の余白
      slidesPerView={"auto"} // 一度に見せるスライド数
      // navigation // ← これだけで矢印ON
      // pagination={{ clickable: true }} // ← クリック可能なドットON
      centeredSlides={true} // スライドを中央に配置
      loop={true} // ループさせたい場合
      direction="vertical"
      freeMode={true}
      speed={5000}
      autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }} // 自動再生させたい場合
      className="fv-slider h-[900px] transform translate-y-[-45px] rotate-[15deg] w-[200px] !mx-[12px]"
    >
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#28a7e1]">スライド1</div>
      </SwiperSlide>
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#0966c3]">スライド2</div>
      </SwiperSlide>
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#f39c12]">スライド3</div>
      </SwiperSlide>
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#28a7e1]">スライド1</div>
      </SwiperSlide>
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#0966c3]">スライド2</div>
      </SwiperSlide>
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#f39c12]">スライド3</div>
      </SwiperSlide>
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#28a7e1]">スライド1</div>
      </SwiperSlide>
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#0966c3]">スライド2</div>
      </SwiperSlide>
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#f39c12]">スライド3</div>
      </SwiperSlide>
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#28a7e1]">スライド1</div>
      </SwiperSlide>
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#0966c3]">スライド2</div>
      </SwiperSlide>
      <SwiperSlide className="!w-[200px] !h-[200px]">
        <div className="w-full h-[200px] bg-[#f39c12]">スライド3</div>
      </SwiperSlide>
    </Swiper>
  );
}
