import { configureStore } from "@reduxjs/toolkit";
import shipmentsSlice from "./slices/shipmentSlice"


export const store = configureStore({
    reducer: {
        shipments: shipmentsSlice
    }
})