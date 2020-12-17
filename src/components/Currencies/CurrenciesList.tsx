import { ICurrency, ICurrencySort, setSort } from '../../redux/reducers/currencies';
import CurrencyRow from './CurrencyRow';
import './CurrencyList.sass';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const isSorting = (sort: ICurrencySort, fieldName: string) => fieldName === sort.field ? true : false;

const getDirectionSort = (sort: ICurrencySort) => {
    if (sort.sort === -1) {
        return "item-descending";
    } else if (sort.sort === 1) {
        return "item-ascending";
    }
}

const CurrenciesList = (
    { currencies }:
        {
            currencies: ICurrency[]
        }) => {

    const dispatch = useDispatch();
    const sort = useSelector((state: RootState) => state.currencies.sort);

    const sortBy = (field: string) => {
        let sortDirection = -1;
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
                <div className={`item ${isSorting(sort, "name") ? getDirectionSort(sort) : ""}`} onClick={() => sortBy("name")}>
                    <span>Currency name</span>
                </div>
                <div className={`item ${isSorting(sort, "sale") ? getDirectionSort(sort) : ""}`} onClick={() => sortBy("sale")}>
                    <span>Sale</span>
                </div>
                <div className={`item ${isSorting(sort, "buy") ? getDirectionSort(sort) : ""}`} onClick={() => sortBy("buy")}>
                    <span>Buy</span>
                </div>
            </div>
            <div className="currencies-list-content">
                {currencies.map(item => <CurrencyRow key={item.name} currency={item} />)}
            </div>

        </div>
    )
}


export default CurrenciesList;