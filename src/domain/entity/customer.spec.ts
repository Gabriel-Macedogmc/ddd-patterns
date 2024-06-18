import { Address } from "./address";
import { Customer } from "./customer";

describe("Customer unit Tests", () => {
  it("should trhow error when id is empty", () => {
    expect(() => {
      new Customer("", "John Doe");
    }).toThrow("ID is required");
  });

  it("should trhow error when Name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    //Arrange
    const customer = new Customer("123", "John Doe");

    //Act
    customer.changeName("John Doe Changed");

    //Assert
    expect(customer.name).toBe("John Doe Changed");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street 1", 123, "1233045", "Sao Paulo");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive).toBe(true);
  });

  it("should desactivate customer", () => {
    const customer = new Customer("1", "John Doe");

    customer.desactivate();

    expect(customer.isActive).toBe(false);
  });

  it("should trhow error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "John Doe");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "John Doe");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
