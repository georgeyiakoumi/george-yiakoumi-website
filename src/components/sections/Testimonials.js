import { Swiper, SwiperSlide } from 'swiper/react';

function Testimonials() {
  const testimonials = [
    "George goes beyond expectations – he solved challenges we hadn’t identified.",
    "His insight and user-focused design approach made a real difference.",
    // Add more testimonials here
  ];

  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <Swiper spaceBetween={50} slidesPerView={1}>
        {testimonials.map((text, index) => (
          <SwiperSlide key={index}>
            <p>{text}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Testimonials;