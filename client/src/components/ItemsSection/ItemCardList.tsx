import { observer } from "mobx-react-lite";
import ItemCard from "./ItemCard";
import { useItems } from "../../hooks";
import './ItemCardList.scss';

const ItemCardList = observer(() => {
  const { items, handleDragStart, handleDragOver, handleDrop } = useItems();

  return (
    <ul className="item-card-list">
      {items.map((item, index) => (
        <li
          className="item-card-list__item"
          key={item.value}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={handleDrop}
        >
          <ItemCard item={item} />
        </li>
      ))}
    </ul>
  );
});

export default ItemCardList;