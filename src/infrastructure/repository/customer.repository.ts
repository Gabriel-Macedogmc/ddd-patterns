import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { ConsumerRepositoryInterface } from "../../domain/repository/consumer-repository.interface";
import { CustomerModel } from "../db/sequelize/model/customer.model";

export class CustomerRepository implements ConsumerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive,
      rewardPoints: entity.rewardPoints,
      street: entity.Address.street,
      number: entity.Address.number,
      zip: entity.Address.zip,
      city: entity.Address.city,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        active: entity.isActive,
        rewardPoints: entity.rewardPoints,
        street: entity.Address.street,
        number: entity.Address.number,
        zip: entity.Address.zip,
        city: entity.Address.city,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zip,
      customerModel.city
    );

    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customersModels = await CustomerModel.findAll();

    return customersModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);

      customer.addRewardPoints(customerModel.rewardPoints);

      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city
      );

      customer.changeAddress(address);

      if (customerModel.active) {
        customer.activate();
      }

      return customer;
    });
  }
}
