import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrenciesList from "../components/Currencies/CurrenciesList";
import { fetchCurrencies, getAllCurrencies, getCurrenciesBySort } from "../redux/reducers/currencies";
import { RootState } from "../redux/store";
import '../styles/pages/currencies.sass';

const Currencies = () => {
    const dispatch = useDispatch();
    const currencies = useSelector((state: RootState) => getCurrenciesBySort(state));
    const currenciesStatus = useSelector((state: RootState) => state.currencies.status);
    useEffect(() => {
        if (currenciesStatus === 'idle') {
            dispatch(fetchCurrencies());
        }
    }, [currenciesStatus, dispatch]);

    let content;

    if (currenciesStatus === "loading") {
        content = <div className="currencies-message">Loading...</div>
    } else if (currenciesStatus === 'succeeded') {
        content = <CurrenciesList currencies={currencies} />
    } else if (currenciesStatus === "failed") {
        content = <>
            <div className="currencies-message">Error happen during fetching</div>
        </>
    }
    return (
        <>
            {content}
        </>
    )
}


export default Currencies;