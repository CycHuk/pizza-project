import React, { useEffect, useRef } from "react";
import style from "./Popup.module.scss";

const Popup = ({ setActivePopup, children }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setActivePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActivePopup]);

  return (
    <div className={style.overlay}>
      <div className={style.popup} ref={overlayRef}>
        {children}
      </div>
    </div>
  );
};

export default Popup;
