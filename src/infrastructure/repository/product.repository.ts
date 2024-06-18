import { Product } from "../../domain/entity/product";
import { ProductRepositoryInterface } from "../../domain/repository/product-repository.interface";
import { ProductModel } from "../db/sequelize/model/product.model";

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Product> {
    const prodcutModel = await ProductModel.findOne({ where: { id } });

    return new Product(prodcutModel.id, prodcutModel.name, prodcutModel.price);
  }

  async findAll(): Promise<Product[]> {
    const prodcutModel = await ProductModel.findAll();

    return prodcutModel.map(
      (product) => new Product(product.id, product.name, product.price)
    );
  }
}
