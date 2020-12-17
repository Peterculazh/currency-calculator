import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies, ICurrency } from "../redux/reducers/currencies";
import { RootState } from "../redux/store";
import SelectCurrency from '../components/Calculator/SelectCurrency';

const Calculator = () => {

    const currencies = useSelector((state: RootState) => state.currencies.currencies);
    const [targetCurrency, setTargetCurrency] = useState({
        name: "",
        value: 0,
    });
    const [currentCurrency, setCurrentCurrency] = useState('UAH');
    const dispatch = useDispatch();

    if (currencies.length === 0) {
        dispatch(fetchCurrencies());
    }

    const findCurrency = (currencies: ICurrency[], name: string) => {
        let currency = currencies.find(currency => currency.name === name);
        return currency ? currency : false;
    }

    const onChangeTargetCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let name = e.target.value;
        let currency = findCurrency(currencies, name);
        setTargetCurrency({
            name: name,
            value: currency ? currency.buy : 0
        });
    }

    return (
        <>
            <SelectCurrency currencies={currencies}
                targetCurrency={targetCurrency.name}
                setTargetCurrency={onChangeTargetCurrency}
                contentOnNoCurrencies={<div>Loading...</div>} />
        </>
    )
}


export default Calculator;