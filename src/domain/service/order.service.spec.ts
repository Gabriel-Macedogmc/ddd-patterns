import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import { OrderService } from "./order.service";

describe("Order Service Unit Tests", () => {
  it("should trhow error place an order without items", () => {
    expect(() => {
      const customer = new Customer("1", "John Doe");

      OrderService.placeOrder(customer, []);
    }).toThrow("Order must have at least one item");
  });

  it("should place an order", () => {
    const customer = new Customer("1", "John Doe");
    const item = new OrderItem("1", "Item 1", 10, "1", 1);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total of all orders", () => {
    const item = new OrderItem("1", "Item 1", 100, "1", 2);
    const item2 = new OrderItem("2", "Item 2", 100, "2", 2);

    const order = new Order("1", "2", [item]);
    const order2 = new Order("2", "2", [item, item2]);

    const orders = [order, order2];
    const total = OrderService.total(orders);

    expect(total).toBe(600);
  });
});
