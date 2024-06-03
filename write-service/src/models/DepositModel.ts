// models/Product.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";

interface DepositAttributes {
  depositId: string;
  customerId: string;
  amount: number;
}
@Table({
  tableName: "deposits",
  timestamps: true,
})
export class DepositModel extends Model<DepositAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  customerId: string;
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;
}
