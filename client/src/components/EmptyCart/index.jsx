import React from "react";

import style from "./Empty.module.scss";
import { Link } from "react-router-dom";
const Empty = () => {
  return (
    <div className={style.empty}>
      <h1>Корзина пустая</h1>
      <p>
        Добро пожаловать в вашу пустую корзину. 🛒 Видимо, ваши покупки еще не
        нашли путь сюда. Но не переживайте, у нас много удивительных товаров,
        готовых оживить вашу корзину. Поглядите по сторонам и найдите что-то по
        вкусу! 🌟"
      </p>
      <Link to="/" className={style.button}>
        Вернуться к покупкам
      </Link>
    </div>
  );
};

export default Empty;
