import express, { Application } from "express";

import CustomerRouter from "@src/routes/CustomerRouter";
import logger from "@src/utils/logger";
import { errorHandler } from "@src/middlewares/ErrorMiddleware";


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/customers", CustomerRouter);
app.use(errorHandler);
const PORT = 3001;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

