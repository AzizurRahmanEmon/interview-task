import styles from "./component.module.css";
interface ItemProps {
  item: {
    id: number;
    imgSrc: string;
  };
}

const GridItem: React.FC<ItemProps> = ({ item }) => (
  <div className={styles.grid_item}>
    <div className={styles.single_img_container}>
      <img src={item.imgSrc} alt={`gallery-img-${item.id}`} />
    </div>
    <div className={styles.grid_input_container}>
      <input type="checkbox" name="checkbox" id={item.id.toString()} />
    </div>
  </div>
);

export default GridItem;
