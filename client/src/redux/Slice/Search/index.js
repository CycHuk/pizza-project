import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    categoryId: 1,
    subcategoryId: 0,
    sortBy: "rating",
  },
  reducers: {
    setCategoryId: (state, action) => {
      return { ...state, categoryId: action.payload };
    },
    setSubcategoryId: (state, action) => {
      return { ...state, subcategoryId: action.payload };
    },
    setSortBy: (state, action) => {
      return { ...state, sortBy: action.payload };
    },
  },
});

export const { setCategoryId, setSubcategoryId, setSortBy, setSearchTitle } =
  searchSlice.actions;

export default searchSlice.reducer;
