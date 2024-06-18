import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order unit Tests", () => {
  it("should trhow error when id is empty", () => {
    expect(() => {
      let order = new Order("", "1", []);
    }).toThrow("ID is required");
  });

  it("should trhow error when customer_id is empty", () => {
    expect(() => {
      let order = new Order("1", "", []);
    }).toThrow("CustomerId is required");
  });

  it("should trhow error when items is empty", () => {
    expect(() => {
      let order = new Order("1", "123", []);
    }).toThrow("items qtd must be greater than 0");
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "Ipad air 5", 3500, "p1", 2);
    const item2 = new OrderItem("2", "Apple Pencil", 1200, "p2", 2);

    let order = new Order("3", "1", [item, item2]);

    expect(order.total()).toBe(9400);
  });

  it("should trhow error if the item quantity is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("1", "Ipad air 5", 3500, "p1", 0);
      let order = new Order("3", "1", [item]);
    }).toThrow("Quantity must be greater than 0");
  });
});
