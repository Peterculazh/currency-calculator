import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies, ICurrency } from "../redux/reducers/currencies";
import { RootState } from "../redux/store";
import SelectCurrency from '../components/Calculator/SelectCurrency';
import CalculateCurrencies from "../components/Calculator/CalculateCurrencies";

export interface ICurrencyStateObject {
    name: string,
    value: number | null
}

const Calculator = () => {

    const currencies = useSelector((state: RootState) => state.currencies.currencies);
    const [targetCurrency, setTargetCurrency] = useState<ICurrencyStateObject>({
        name: "",
        value: 0,
    });
    const [currentCurrency, setCurrentCurrency] = useState<ICurrencyStateObject>({
        name: "UAH",
        value: 0
    });
    const dispatch = useDispatch();

    if (currencies.length === 0) {
        dispatch(fetchCurrencies());
    }

    const findCurrency = (currencies: ICurrency[], name: string) => {
        let currency = currencies.find(currency => currency.name === name);
        return currency ? currency : false;
    }

    const onChangeTargetCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.value;
        const currency = findCurrency(currencies, name);
        setTargetCurrency({
            name: name,
            value: 1
        });
        setCurrentCurrency({
            name: "UAH",
            value: currency ? currency.buy : 1
        })
    }


    // TODO: Need to rework or change behavior
    const onChangeCurrencyValue = (
        e: React.ChangeEvent<HTMLInputElement>,
        isCurrentCurrency: boolean,
    ) => {
        let value = Number(e.target.value);
        const currency = findCurrency(currencies, targetCurrency.name);
        if (currency) {
            setCurrentCurrency({
                name: currentCurrency.name,
                value: isCurrentCurrency ? value : Number((value * currency.buy).toFixed(2))
            });
            setTargetCurrency({
                name: targetCurrency.name,
                value: isCurrentCurrency ? Number((value / currency.buy).toFixed(2)) : value
            });
        } else {
            const currency = findCurrency(currencies, currentCurrency.name);
            if (currency) {
                setCurrentCurrency({
                    name: currentCurrency.name,
                    value: isCurrentCurrency ? value : Number((value / currency.buy).toFixed(2))
                });
                setTargetCurrency({
                    name: targetCurrency.name,
                    value: isCurrentCurrency ? Number((value * currency.buy).toFixed(2)) : value
                });
            }
        }
    }

    const swapCurrencies = () => {
        const currentCurrencyCopy = { ...currentCurrency };
        const targetCurrencyCopy = { ...targetCurrency };
        setCurrentCurrency({
            ...targetCurrencyCopy
        });
        setTargetCurrency({
            ...currentCurrencyCopy
        });
    }

    return (
        <>
            <SelectCurrency
                currencies={currencies}
                targetCurrency={targetCurrency.name}
                setTargetCurrency={onChangeTargetCurrency}
                contentOnNoCurrencies={<div>Loading...</div>} />
            {
                targetCurrency.name.length !== 0 &&
                <CalculateCurrencies
                    targetCurrency={targetCurrency}
                    currentCurrency={currentCurrency}
                    swapCurrencies={swapCurrencies}
                    setTargetCurrencyValue={(e) => onChangeCurrencyValue(
                        e,
                        false
                    )}
                    setCurrentCurrencyValue={(e) => onChangeCurrencyValue(
                        e,
                        true
                    )}
                />
            }
        </>
    )
}


export default Calculator;