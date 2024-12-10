import { filterData, formatPrice, formatLength } from "../src/productList";


describe("filterData function", () => {
  const mockData = [
    { id: 1, category: "Electronics", title: "Laptop" },
    { id: 2, category: "Clothing", title: "T-shirt" },
    { id: 3, category: "Electronics", title: "Smartphone" },
    { id: 4, category: "Books", title: "Novel" },
  ];

  test('returns all items when category is "All"', () => {
    const result = filterData(mockData, "All");
    expect(result).toEqual(mockData);
    expect(result.length).toBe(4);
  });

  test("filters items by Electronics category", () => {
    const result = filterData(mockData, "Electronics");
    expect(result).toEqual([
      { id: 1, category: "Electronics", title: "Laptop" },
      { id: 3, category: "Electronics", title: "Smartphone" },
    ]);
    expect(result.length).toBe(2);
  });

  test("filters items by Clothing category", () => {
    const result = filterData(mockData, "Clothing");
    expect(result).toEqual([{ id: 2, category: "Clothing", title: "T-shirt" }]);
    expect(result.length).toBe(1);
  });

  test("filters items by Books category", () => {
    const result = filterData(mockData, "Books");
    expect(result).toEqual([{ id: 4, category: "Books", title: "Novel" }]);
    expect(result.length).toBe(1);
  });

  test("returns empty array for non-existent category", () => {
    const result = filterData(mockData, "Food");
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  test("handles case-sensitive categories correctly", () => {
    const result = filterData(mockData, "electronics");
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  test("works with empty data array", () => {
    const result = filterData([], "Any");
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  test("works with null or undefined category", () => {
    expect(filterData(mockData, null)).toEqual([]);
    expect(filterData(mockData, undefined)).toEqual([]);
  });
});

describe("formatPrice function", () => {
  test("formats price to two decimal places", () => {
    expect(formatPrice(10)).toBe("10.00");
    expect(formatPrice(10.5)).toBe("10.50");
    expect(formatPrice(10.55)).toBe("10.55");
    expect(formatPrice(10.557)).toBe("10.56");
  });
});

describe("formatLength function", () => {
  test("returns original string if length is 100 or less", () => {
    const shortString = "A".repeat(100);
    expect(formatLength(shortString)).toBe(shortString);
  });

  test("truncates string and adds ellipsis if length is over 100", () => {
    const longString = "A".repeat(150);
    const expected = "A".repeat(100) + "...";
    expect(formatLength(longString)).toBe(expected);
  });
});
