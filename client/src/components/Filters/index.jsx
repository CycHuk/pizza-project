import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSubcategoryId } from "../../redux/Slice/Search";

import style from "./Filters.module.scss";
import Skeleton from "./Skeleton";

const Filters = () => {
  const dispatch = useDispatch();
  const categoryid = useSelector((state) => state.search.categoryId);
  const subcategoryId = useSelector((state) => state.search.subcategoryId);

  const [status, setStatus] = React.useState("loading");
  const [item, setItem] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/products/categories/Subcategory${categoryid}`
        );
        setItem([{ id: 0, title: "Все" }, ...response.data]);
        setStatus("notloading");
      } catch (error) {
        console.error(error);
      }
    };
    dispatch(setSubcategoryId(0));
    setStatus("loading");
    fetchData();
  }, [categoryid, dispatch]);

  const items = item.map((obj, index) => (
    <li key={index}>
      <button
        className={subcategoryId === obj.id ? style.actine : ""}
        onClick={() => dispatch(setSubcategoryId(obj.id))}
      >
        {obj.title}
      </button>
    </li>
  ));

  const filtersBlock =
    item.length === 1 ? (
      " "
    ) : (
      <>
        {" "}
        <h3>Фильтр:</h3>
        <ul>{items}</ul>
      </>
    );

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className={style.filters}>
      {status === "loading" ? skeletons : filtersBlock}
    </div>
  );
};

export default Filters;
