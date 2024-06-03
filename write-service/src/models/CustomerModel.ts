// models/Product.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";

interface CustomerAttributes {
  customerId: number;
  name: string;
  description: string;
  phoneNumber: string;
  address: string;
}
@Table({
  tableName: "customers",
})
export class CustomerModel extends Model<CustomerAttributes> {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: number;
}
