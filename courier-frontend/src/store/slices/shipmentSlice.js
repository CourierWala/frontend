import { createSlice } from "@reduxjs/toolkit";


const shipmentSlice = createSlice({
    name: 'shipments',
    initialState: {
        list: [],
        loaded: false
    },

    reducers: {
        setShipments: (state, action) => {
            state.list = action.payload;
            state.loaded = true
        },

        addShipment: (state, action) => {
            state.list.unshift(action.payload) // new shipment at top
        },

        createShipment: (state) => {
            state.list = [];
            state.loaded = false
        }

    }
})

export const { setShipments, addShipment, createShipment } = shipmentSlice.actions;
export default shipmentSlice.reducer;

