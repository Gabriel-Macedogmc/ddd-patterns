import { Product } from "./product";

describe("Product unit Tests", () => {
  it("should trhow error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow("ID is required");
  });

  it("should trhow error when name is empty", () => {
    expect(() => {
      new Product("1", "", 100);
    }).toThrow("Name is required");
  });

  it("should trhow error when price is less than zero", () => {
    expect(() => {
      new Product("1", "Product 1", -1);
    }).toThrow("Price imust be greater than zero");
  });

  it("Should change name", () => {
    const product = new Product("1", "Product 1", 100);

    product.changeName("Product 2");

    expect(product.name).toBe("Product 2");
  });

  it("Should change price", () => {
    const product = new Product("1", "Product 1", 100);

    product.changePrice(10);

    expect(product.price).toBe(10);
  });
});
