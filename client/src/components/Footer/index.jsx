import React from "react";

import style from "./Footer.module.scss";

import logo from "../../assets/img/icon/logo.png";
import viber from "../../assets/img/icon/media/01.png";
import skype from "../../assets/img/icon/media/02.png";
import facebookMessenger from "../../assets/img/icon/media/03.png";
import telegram from "../../assets/img/icon/media/04.png";
import facebook from "../../assets/img/icon/media/05.png";
import vk from "../../assets/img/icon/media/06.png";

export const Footer = () => {
  return (
    <footer className="container">
      <div className={style.footer}>
        <div className={style.left__block}>
          <img src={logo} alt="logo" />
          <div className={style.media}>
            <h4>Мы в соцсетях</h4>
            <div className={style.row}>
              <ul>
                <li>YouTube</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>ВКонтакте</li>
              </ul>
              <span>Новосибирск ул. Проспект Вернадского 86В</span>
            </div>
          </div>
        </div>
        <div className={style.right__block}>
          <h4>Остались вопросы? А мы всегда на связи:</h4>
          <div className={style.icon}>
            <ul>
              <li>
                <img src={viber} alt="viber" />
              </li>
              <li>
                <img src={skype} alt="skype" />
              </li>
              <li>
                <img src={facebookMessenger} alt="facebookMessenger" />
              </li>
              <li>
                <img src={telegram} alt="telegram" />
              </li>
              <li>
                <img src={facebook} alt="facebook" />
              </li>
              <li>
                <img src={vk} alt="vk" />
              </li>
              <li>
                <button>Написать нам</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={style.lower}>
        <h5>Все праав защищены © 2021</h5>
        <div className={style.number}>
          <p>8 499 391-84-49</p>
        </div>
      </div>
    </footer>
  );
};
