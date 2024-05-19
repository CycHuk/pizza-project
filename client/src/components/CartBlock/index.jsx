import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { addItem, decrementItem, deleteItem } from "../../redux/Slice/Basket";

import style from "./CartBlock.module.scss";

import icon from "../../assets/img/icon/delete.png";

const CartBlock = ({ id, count }) => {
  const dispatch = useDispatch();

  const [info, setInfo] = React.useState([]);
  const [status, setStatus] = React.useState("loading");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setInfo(response.data[0]);
        setStatus("notloading");
      } catch (error) {
        console.error(error);
      }
    };

    setStatus("loading");
    fetchData();
  }, [id]);
  const block = (
    <div className={style.item}>
      <img src={info.product && info.product.imgUrl} alt="" />
      <h2>
        {info.product && info.product.title}:
        {" " + info.sizes + " " + (info.product && info.product.unit)}
      </h2>
      <p>
        {info.price} ₽ * {count} =<span> {info.price * count} ₽</span>
      </p>
      <div className={style.buttons}>
        <div className={style.editing}>
          <button
            onClick={() => {
              dispatch(addItem({ id: id, price: info.price }));
            }}
          >
            +
          </button>
          <span>{count}</span>
          <button
            onClick={() => {
              dispatch(decrementItem(id));
            }}
          >
            -
          </button>
        </div>

        <button
          onClick={() => {
            dispatch(deleteItem(id));
          }}
          className={style.delete}
        >
          <img src={icon} alt="icon" />
        </button>
      </div>
    </div>
  );

  return (
    <div className={style.item}>{status === "notloading" ? block : ""}</div>
  );
};

export default CartBlock;
