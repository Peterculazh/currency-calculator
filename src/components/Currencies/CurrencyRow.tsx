import React from 'react';
import { ICurrency } from '../../redux/reducers/currencies';

const CurrenciesRow = ({ currency }: { currency: ICurrency }) => {
    return (
        <div className="currencies-list-content-row">
            <div className="item">{currency.name}</div>
            <div className="item">{currency.sale}</div>
            <div className="item">{currency.buy}</div>
        </div>
    )
}


export default CurrenciesRow;