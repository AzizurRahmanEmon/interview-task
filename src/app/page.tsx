import React from "react";
import styles from "./page.module.css";
import GallerySection from "./component/GallerySection";

export default function Home() {
  return (
    <main className={styles.image_gallery_container}>
      <GallerySection />
    </main>
  );
}
