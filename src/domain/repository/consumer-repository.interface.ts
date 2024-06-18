import { RepositoryInterface } from "./repository.interface";
import { Customer } from "../entity/customer";

export interface ConsumerRepositoryInterface
  extends RepositoryInterface<Customer> {}
