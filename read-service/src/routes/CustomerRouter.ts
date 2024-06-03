import { Router } from "express";
import CustomerController from "@src/controllers/CustomerController";
class CustomerRouter {
  router = Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get('/', (req, res) => {
      const controller = new CustomerController()
      controller.get(req, res)
    })
    this.router.get('/:id', (req, res) => {
        const controller = new CustomerController()
        controller.getOne(req, res)
      })
  }
}

export default new CustomerRouter().router;
