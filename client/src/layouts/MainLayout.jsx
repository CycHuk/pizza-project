import React from "react";
import Header from "../components/Header";
import { Footer } from "../components/Footer";

import style from "./MainLayout.module.scss";
const MainLayout = ({ children }) => {
  return (
    <>
      <div className={style.constant}>
        <Header />
      </div>
      <div>
        <div className={style.dynamic}>{children}</div>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
