import { cartTotals } from '../src/page/shoppingCartPage'
// const { cartTotals } = require("../src/page/shoppingCartPage") 


test('returns 0 when the price list is empty', () => {
    const priceList = [];
    const result = cartTotals.sumProductsInTheCart(priceList);
    expect(result).toBe(0);
})
