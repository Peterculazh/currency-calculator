// Names there pretty bad, but I didn't focused on that

import { ICurrency } from "../../redux/reducers/currencies";
import './SelectCurrency.sass';

interface ISelectCurrency {
    currencies: ICurrency[],
    contentOnNoCurrencies: React.ReactNode,
    setTargetCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    targetCurrency: string,
}


const SelectCurrency = ({ currencies, setTargetCurrency, targetCurrency, contentOnNoCurrencies }: ISelectCurrency) => {
    let currencySelector;
    let selectedCurrencyContent;

    if (currencies.length >= 1) {
        currencySelector = <select onChange={setTargetCurrency}>
            <option value="">None</option>
            {currencies.map(currency => <option key={currency.name} value={currency.name}>{currency.name}</option>)}
        </select>
        if (targetCurrency.length >= 1) {
            selectedCurrencyContent = <div className="currency-selector-selected">
                Target currency: <strong>{targetCurrency}</strong>
            </div>
        } else {
            selectedCurrencyContent = <div className="currency-selector-selected">
                Please, choose currency
            </div>
        }
    } else {
        currencySelector = contentOnNoCurrencies;
    }



    return (
        <div className="currency-selector">
            {currencySelector}
            {selectedCurrencyContent}
        </div>
    )
}


export default SelectCurrency;