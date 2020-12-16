import { ICurrency, setSort } from '../../redux/reducers/currencies';
import CurrencyRow from './CurrencyRow';
import './CurrencyList.sass';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const CurrenciesList = (
    { currencies }:
        {
            currencies: ICurrency[]
        }) => {

    const dispatch = useDispatch();
    const sort = useSelector((state: RootState) => state.currencies.sort);

    const sortBy = (field: string) => {
        let sortDirection = 1;
        if (sort.field === field) {
            switch (sort.sort) {
                case -1:
                    sortDirection = 1;
                    break;
                case 1:
                    sortDirection = -1;
                    break;
                default:
                    break;
            }
        }

        dispatch(setSort({
            field,
            sort: sortDirection
        }));
    }
    return (
        <div className="currencies-list">
            <div className="currencies-list-header">
                <div className="item" onClick={() => sortBy("name")}>Currency name</div>
                <div className="item" onClick={() => sortBy("sale")}>Sale</div>
                <div className="item" onClick={() => sortBy("buy")}>Buy</div>
            </div>
            <div className="currencies-list-content">
                {currencies.map(item => <CurrencyRow key={item.name} currency={item} />)}
            </div>

        </div>
    )
}


export default CurrenciesList;