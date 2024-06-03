import { Request, Response } from "express";
import { CustomerModel } from "@src/models/CustomerModel";
import { DepositModel } from "@src/models/DepositModel";
import { v4 as uuidv4 } from "uuid";

import logger from "@src/utils/logger";

export default class CustomerController {
  constructor() {}
  async createCustomer(req: Request, res: Response) {
    let { name, description, phoneNumber, address } = req.body;
    let created = await CustomerModel.create({
      name,
      description,
      phoneNumber,
      address,
    });
    logger.info(`Customer created successfully ${created.isNewRecord}`);
    res.status(201).json({ message: "Customer created successfully" });
  }
  async updateCustomer(req: Request, res: Response) {
    logger.info("Updating a customer");
    res.status(201).json({ message: "Customer update successfully" });
  }
  async deleteCustomer(req: Request, res: Response) {
    logger.info("Delete a customer");
    res.status(200).json({ message: "Customer deleted successfully" });
  }
  async deposit(req: Request, res: Response) {
    logger.info("Deposit a customer");
    const { customerId, amount } = req.body;
    const depositId = uuidv4();
    await DepositModel.create({
      depositId,
      customerId,
      amount,
    });
    res.status(201).json({ message: "Customer deposited successfully " });
  }
}
