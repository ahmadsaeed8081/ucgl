import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./reducers/globalReducer";

const Store = configureStore({
  reducer: {
    globalReducer: globalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
});

export default Store;
