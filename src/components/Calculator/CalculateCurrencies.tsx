import { ICurrencyStateObject } from '../../pages/calculator';
import './CalculateCurrencies.sass';

interface ICalculateCurrenciesProps {
    targetCurrency: ICurrencyStateObject,
    currentCurrency: ICurrencyStateObject,
    setTargetCurrencyValue: (event: React.ChangeEvent<HTMLInputElement>) => void,
    setCurrentCurrencyValue: (event: React.ChangeEvent<HTMLInputElement>) => void,
    swapCurrencies: () => void,
}

const CalculateCurrencies = ({ targetCurrency, currentCurrency, setTargetCurrencyValue, setCurrentCurrencyValue, swapCurrencies }: ICalculateCurrenciesProps) => {


    return (
        <div className="calculator">
            <div className="calculator-item">
                <strong>{currentCurrency.name}</strong>
                <input type="text" value={currentCurrency.value ? currentCurrency.value : ""} onChange={(e) => setCurrentCurrencyValue(e)} />
            </div>
            <button className="calculator-button" onClick={swapCurrencies}></button>
            <div className="calculator-item">
                <strong>{targetCurrency.name}</strong>
                <input type="text" value={targetCurrency.value ? targetCurrency.value : ""} onChange={(e) => setTargetCurrencyValue(e)} />
            </div>
        </div>
    )
}


export default CalculateCurrencies;