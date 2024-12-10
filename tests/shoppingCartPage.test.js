import { cartTotals, getCartFromLocalStorage, addProductToShoppingCart, removeProductFromShoppingCart } from '../src/page/shoppingCartPage'

describe('sumProductsInTheCart function', () => {
    test('should return 0 when the price list is empty', () => {
        const priceList = [];
        const result = cartTotals.sumProductsInTheCart(priceList);
        expect(result).toBe(0);
    });
    test('should return the sum of all products price in the list', () => {
        const priceList = [30, 50, 20];
        const result = cartTotals.sumProductsInTheCart(priceList);
        expect(result).toBe(100);
    });
    test('should handle decimals price', () => {
        const priceList = [30.30, 50.50, 20.20];
        const result = cartTotals.sumProductsInTheCart(priceList);
        console.log('Actual result:', result);
        expect(result).toBe(101.00);
    });
    test('should handle a list with one price', () => {
        const priceList = [30.30];
        const result = cartTotals.sumProductsInTheCart(priceList);
        expect(result).toBe(30.30);
    });
    test('should return 0 if all the prices are 0', () => {
        const priceList = [0, 0, 0, 0];
        const result = cartTotals.sumProductsInTheCart(priceList);
        expect(result).toBe(0);
    });
});

describe('getCartFromLocalStorage function', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    test('should return an empty array if the cart is empty', () => {
        expect(getCartFromLocalStorage()).toEqual([]);
    });
    test('should return the parsed cart from localStorage if it exists', () => {
        const cartList = [{ id: 1, name: "Apple", price: 0.99 }];
        localStorage.setItem("shoppingCart", JSON.stringify(cartList));

        expect(getCartFromLocalStorage()).toEqual(cartList);
    });
    test('should handle corrupted JSON data in localStorage', () => {
        localStorage.setItem("shoppingCart", "not a valid JSON string");

        expect(() => getCartFromLocalStorage()).toThrow(SyntaxError);
    });
})

describe('addProductToShoppingCart function', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    test('should add a product to the cart list', () => {
        const product = {id: 1, name: "Apple", price: 0.99};
        
        addProductToShoppingCart(product)
        expect(localStorage.length).toEqual(1);
    });
})
