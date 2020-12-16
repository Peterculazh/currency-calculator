import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import calculatorReducer from './reducers/currencies';

export const store = configureStore({
    reducer: {
        currencies: calculatorReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>