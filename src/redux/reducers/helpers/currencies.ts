import { ICurrency, ICurrencySort } from "../currencies";

export const sortByField = (previousValue: ICurrency, nextValue: ICurrency, sort: ICurrencySort) => {
    if (previousValue[sort.field] > nextValue[sort.field]) {
        return sort.sort === 1 ? 1 : -1;
    } else if (previousValue[sort.field] < nextValue[sort.field]) {
        return sort.sort === 1 ? -1 : 1;
    }
    else { return 0 }
}