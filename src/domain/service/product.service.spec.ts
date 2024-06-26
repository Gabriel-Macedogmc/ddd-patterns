import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("Product Service unit Tests", () => {
  it("should change the prices of all products", () => {
    const product = new Product("1", "Ipad Air 5", 10);
    const product2 = new Product("2", "Apple Pencil 2", 20);
    const products = [product, product2];

    ProductService.incresePrice(products, 100);

    expect(product.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
