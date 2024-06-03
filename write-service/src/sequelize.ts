// sequelize.ts
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "./models/CustomerModel";
import { DepositModel } from "./models/DepositModel";
import DBConfig from "./configs/DBConfig";
const sequelize = new Sequelize({
  database: DBConfig.DB,
  dialect: 'mysql',
  username: DBConfig.USER,
  password: DBConfig.PASSWORD,
  host: DBConfig.HOST,
  models: [CustomerModel, DepositModel], // Add more models as needed
});

export default sequelize;
