import React from "react";
import styles from "./component.module.css";
interface AddImageProps {
  addImage: (imgSrc: string) => void;
}
const AddImage: React.FC<AddImageProps> = ({ addImage }) => {
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
  return (
    <label htmlFor="file-input" className={styles.add_image_container}>
      <img src="/images/add-photo-icon.png" alt="icon" />
      <h3>Add Photo</h3>
      <input type="file" id="file-input" onChange={handleImageUpload} />
    </label>
  );
};

export default AddImage;
