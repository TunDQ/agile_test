import React from "react";
import { Navbar } from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import styles from "./Home.module.css";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";

export const Home = () => {
  return (
    <div className={styles.home}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};
