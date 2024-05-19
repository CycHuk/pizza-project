import React from "react";

import style from "./Empty.module.scss";

const Empty = () => {
  return (
    <div className={style.empty}>
      <h1>Произошла ошибка</h1>
      <p>
        К сожалению, не удалось получить товары. Попробуйте повторить попытку
        позже.
      </p>
    </div>
  );
};

export default Empty;
