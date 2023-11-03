"use client";
import React, { useState } from "react";
import { imageList } from "../data/PlaceHolderData";
import styles from "./GallerySection.module.css";
import { ReactSortable } from "react-sortablejs";

interface ItemProps {
  id: number;
  imgSrc: string;
}

const GallerySection = () => {
  const [state, setState] = useState<ItemProps[]>(imageList);
  const [itemSelected, setItemSelected] = useState<number[]>([]);
  const [clearSelection, setClearSelection] = useState(false);
  const addImage = (imgSrc: string) => {
    const newItem = {
      id: state.length,
      imgSrc: imgSrc,
    };
    setState((prevItems) => [...prevItems, newItem]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          addImage(e.target.result! as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const toggleSelection = (id: number) => {
    if (itemSelected.includes(id)) {
      setItemSelected(itemSelected.filter((itemId) => itemId !== id));
    } else {
      setItemSelected([...itemSelected, id]);
    }
  };

  const deleteSelectedItems = () => {
    const filteredState = state.filter(
      (item) => !itemSelected.includes(item.id)
    );
    setState(filteredState);
    setItemSelected([]);
  };

  const handleClearSelection = () => {
    setItemSelected([]);
    setClearSelection(!clearSelection);
  };

  return (
    <>
      <div className={styles.header_container}>
        {itemSelected.length === 0 ? (
          <h2>Gallery</h2>
        ) : (
          <div className={styles.selected_header}>
            <div className={styles.selected_count}>
              <input
                type="checkbox"
                id="clear-selection"
                defaultChecked={clearSelection}
                onChange={handleClearSelection}
              />
              <p>{`${itemSelected.length} ${
                itemSelected.length === 1 ? "File" : "Files"
              } Selected`}</p>
            </div>
            <button
              className={styles.delete_btn}
              type="button"
              onClick={deleteSelectedItems}
            >
              {itemSelected.length === 1 ? "Delete File" : "Delete Files"}
            </button>
          </div>
        )}
      </div>

      <ReactSortable
        className={styles.grid_container}
        list={state}
        setList={setState}
      >
        {state.map((item) => (
          <div className={styles.grid_item} key={item.id}>
            <div className={styles.single_img_container}>
              <img src={item.imgSrc} alt={`gallery-img-${item.id}`} />
              <div
                className={`${styles.grid_input_container} ${
                  itemSelected.includes(item.id) ? styles.selected_item : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="checkbox"
                  id={item.id.toString()}
                  defaultChecked={itemSelected.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}
        <label htmlFor="file-input" className={styles.add_image_container}>
          <img src="/images/add-photo-icon.png" alt="icon" />
          <h3>Add Photo</h3>
          <input
            type="file"
            id="file-input"
            onChange={handleImageUpload}
            readOnly
          />
        </label>
      </ReactSortable>
    </>
  );
};

export default GallerySection;
