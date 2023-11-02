"use client";
import React, { useState } from "react";
import { imageList } from "../data/PlaceHolderData";
import GridItem from "./GridItem";
import AddImage from "./AddImage";
import styles from "./component.module.css";
import { ReactSortable } from "react-sortablejs";
interface ItemProps {
  id: number;
  imgSrc: string;
}

const GallerySection = () => {
  const [state, setState] = useState<ItemProps[]>(imageList);
  const addImage = (imgSrc: string) => {
    const newItem = {
      id: state.length, // Assign a unique ID to the new item
      imgSrc: imgSrc,
    };

    setState((prevItems) => [...prevItems, newItem]);
  };
  return (
    <>
      <div className={styles.header_container}>
        <h2>Gallery</h2>
      </div>
      <ReactSortable
        className={styles.grid_container}
        list={state}
        setList={setState}
      >
        {state.map((item) => (
          <GridItem key={item.id} item={item} />
        ))}
        <AddImage addImage={addImage} />
      </ReactSortable>
    </>
  );
};

export default GallerySection;
