import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { CustomerRepository } from "./customer.repository";
import { Customer } from "../../domain/entity/customer";
import { Address } from "../../domain/entity/address";

describe("Customer Repository unit test", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequileze.addModels([CustomerModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street Address", 123, "1234556", "SP");

    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "John Doe",
      street: "Street Address",
      number: 123,
      zip: "1234556",
      city: "SP",
      active: customer.isActive,
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street Address", 123, "1234556", "SP");

    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "John Doe",
      street: "Street Address",
      number: 123,
      zip: "1234556",
      city: "SP",
      active: customer.isActive,
      rewardPoints: customer.rewardPoints,
    });

    customer.changeName("John Doe 2");
    customer.changeAddress(
      new Address("Street Address 2", 123, "1234556", "SP")
    );

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel2.toJSON()).toStrictEqual({
      id: "1",
      name: "John Doe 2",
      street: "Street Address 2",
      number: 123,
      zip: "1234556",
      city: "SP",
      active: customer.isActive,
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepostory = new CustomerRepository();

    expect(() => customerRepostory.find("123")).rejects.toThrow(
      "Customer not found"
    );
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street Address", 123, "1234556", "SP");

    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    const foundCustomer = await customerRepository.find(customer.id);

    expect(customerModel.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      street: foundCustomer.Address.street,
      number: foundCustomer.Address.number,
      zip: foundCustomer.Address.zip,
      city: foundCustomer.Address.city,
      active: foundCustomer.isActive,
      rewardPoints: foundCustomer.rewardPoints,
    });
  });

  it("should find all products", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street Address", 123, "1234556", "SP");

    customer.Address = address;

    await customerRepository.create(customer);

    const customer2 = new Customer("2", "John Doe 2");
    const address2 = new Address("Street Address", 123, "1234556", "SP");

    customer2.Address = address2;

    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer, customer2];

    expect(customers).toEqual(foundCustomers);
  });
});
