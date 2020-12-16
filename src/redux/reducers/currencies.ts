import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { RootState } from "../store";
import { sortByField } from "./helpers/currencies";

export enum CurrenciesNames {
    SALE = "sale",
    BUY = "buy",
    NAME = "name",
}

export interface ICurrency {
    sale: number,
    buy: number,
    name: string,
    targetCurrency: string,
}

export interface ICurrencySort {
    sort: number,
    field: keyof ICurrency
}

export interface ICurrencyState {
    currencies: ICurrency[],
    sort: ICurrencySort,
    status: string,
    error: string | null,
}

const initialState: ICurrencyState = {
    currencies: [],
    sort: {
        sort: -1,
        field: 'name'
    },
    status: 'idle',
    error: null,
}

export const fetchCurrencies = createAsyncThunk('currencies/fetchCurrencies', async () => {
    const response = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    return response.data
});


export const currenciesSlice = createSlice({
    name: "currencies",
    initialState,
    reducers: {
        setSort(state, action) {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrencies.pending, (state: ICurrencyState, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchCurrencies.fulfilled, (state: ICurrencyState, action) => {
            if (action.payload && typeof action.payload === 'object') { // Based on return type of data from PrivatBank API
                let currencies: ICurrency[] = [];

                action.payload.forEach((item: any) => {
                    let name = item.ccy;
                    currencies.push({
                        sale: Number(Number(item.sale).toFixed(2)),
                        buy: Number(Number(item.buy).toFixed(2)),
                        name,
                        targetCurrency: item.base_ccy
                    })
                });

                state.currencies = Object.assign(state.currencies, currencies);
                state.status = 'succeeded';
            } else {
                state.error = action.payload;
                state.status = 'failed';
            }
        });

    }
});

export const { setSort } = currenciesSlice.actions;

export const getAllCurrencies = (state: RootState) => state.currencies.currencies;

export const getCurrenciesBySort = createSelector(
    [getAllCurrencies, (state: RootState) => state.currencies.sort],
    (currencies, sort) => currencies.slice().sort((prev, next) => sortByField(prev, next, sort))
);



export default currenciesSlice.reducer;