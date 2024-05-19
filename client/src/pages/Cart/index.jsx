import React from "react";
import { useSelector } from "react-redux";
import { selectBasketTotal } from "../../redux/Slice/Basket";

import CardBlock from "../../components/CartBlock";
import style from "./Card.module.scss";
import Empty from "../../components/EmptyCart";

import Popup from "../../layouts/Popup";
import OrderForm from "../../components/OrderForm";

const Cart = () => {
  const basketTotal = useSelector(selectBasketTotal);
  const [cost, setСost] = React.useState([]);
  const items = useSelector((state) => state.basket.products);

  const [popup, setPopup] = React.useState(false);

  const itemBlock = (
    <>
      {items.map((item) => (
        <CardBlock {...item} key={item.id} cost={cost} setСost={setСost} />
      ))}
    </>
  );

  const cart = (
    <div className={style.cart}>
      <h1>Корзина</h1>

      <div className={style.items}>{items.length ? itemBlock : ""}</div>
      <div className={style.decoration}>
        <p>
          Сумма заказа: <span>{basketTotal} ₽</span>
        </p>
        <button onClick={() => setPopup(true)}>Оформить заказ</button>
      </div>
    </div>
  );

  return (
    <main className="container ">
      {items.length ? cart : <Empty />}{" "}
      {popup ? (
        <Popup setActivePopup={setPopup}>
          <OrderForm onClose={setPopup} />
        </Popup>
      ) : (
        ""
      )}
    </main>
  );
};

export default Cart;
