import React, { useEffect, useState } from "react";
import styles from "./TestimonialsSection.module.css";
import { fetchGalleries } from "../services/galleryService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Testimonial {
  id: string;
  imageUrl: string;
  desctiption: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await fetchGalleries();
        setTestimonials(data);
      } catch (err) {
        setTestimonials([]);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Testimonials</h2>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        className={styles.swiper}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.card}>
              <div className={styles.user}>
                <img
                  src={item.imageUrl}
                  alt="avatar"
                  className={styles.avatar}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div>
                  <strong>John Fang</strong>
                  <p className={styles.email}>wordfang.com</p>
                </div>
              </div>
              <p className={styles.desc}>{item.desctiption}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
