import { Router } from "express";
import CustomerController from "@src/controllers/CustomerController";
class CustomerRouter {
  router = Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.post("/", (req, res) => {
      const controller = new CustomerController();
      controller.createCustomer(req, res);
    });
    this.router.put("/:id", async (req, res) => {
      const controller = new CustomerController();
      controller.updateCustomer(req, res);
    });
    this.router.delete("/:id", (req, res) => {
      const controller = new CustomerController();
      controller.deleteCustomer(req, res);
    });
    this.router.post("/:id/deposit", (req, res) => {
      const controller = new CustomerController();
      controller.deposit(req, res);
    });
  }
}

export default new CustomerRouter().router;
