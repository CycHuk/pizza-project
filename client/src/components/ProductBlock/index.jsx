import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectProductCountById,
  addItem,
  decrementItem,
} from "../../redux/Slice/Basket";

import style from "./ProductBlock.module.scss";

const ProductBlock = ({ title, imgUrl, description, variability, unit }) => {
  const [activeProduct, setActiveProduct] = React.useState(variability[0].id);
  const [price, setPrice] = React.useState(variability[0].price);
  const [id, setId] = React.useState(variability[0].id);

  const dispatch = useDispatch();

  const count = useSelector(selectProductCountById(id));

  const regulator = (
    <div className={style.regulator}>
      <button
        onClick={() => {
          dispatch(decrementItem(id));
        }}
      >
        {"<"}
      </button>
      <span>{count}</span>
      <button
        onClick={() => {
          dispatch(addItem({ id: id, price: price }));
        }}
      >
        {">"}
      </button>
    </div>
  );
  return (
    <div className={style.product}>
      <img src={imgUrl} alt={title} />
      <h4>{title}</h4>
      <p>{description}</p>
      <div className={style.variability}>
        <ul>
          {variability.map((item) => (
            <li
              className={item.id === activeProduct ? style.active : ""}
              key={item.id}
            >
              <button
                onClick={() => {
                  setId(item.id);
                  setActiveProduct(item.id);
                  setPrice(item.price);
                }}
              >
                {item.sizes} {unit}.
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.footer}>
        <span>{price} ₽</span>
        {count ? (
          regulator
        ) : (
          <button
            onClick={() => {
              dispatch(addItem({ id: id, price: price }));
            }}
          >
            В корзину
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductBlock;
