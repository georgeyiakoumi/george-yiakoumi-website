import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./SwiperComponent.js";


const SwiperComponent = ({ images = [], items = [], slidesPerView = 1, renderSlide, customClass = "" }) => {
  if (images.length === 0 && items.length === 0) {
    console.warn("No images or items provided for SwiperComponent");
    return null;
  }

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={10}
      slidesPerView={slidesPerView}
      pagination={{ clickable: true }}
      className={customClass}
    >
      {images.map((image, index) => {
        const imageUrl = image.url.startsWith("http") ? image.url : `http://localhost:1337${image.url}`;

        return (
          <SwiperSlide key={index}>
            <img
              src={imageUrl}
              alt={image.alternativeText || "Slide"}
            />
          </SwiperSlide>
        );
      })}

      {items.map((item, index) => (
        <SwiperSlide key={index}>{renderSlide(item)}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;