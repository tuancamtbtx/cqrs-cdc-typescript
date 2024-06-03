import { Request, Response } from "express";
import ElasticsearchQuery from "@src/elasticsearch/query";
import logger from "@src/utils/logger";

export default class CustomerController {
    constructor() {

    }
    async get(req: Request, res: Response) {
        logger.info('Getting all customers');
        const es:ElasticsearchQuery = new ElasticsearchQuery()
        const query = {
            index: 'customers', // Name of the Elasticsearch index
            body: {
                query: {
                    match_all: {}
                }
            }
        }
        let data = await es.search(query)
        res.status(200).json(data)
    }
    async getOne(req: Request, res: Response) {
        logger.info('Getting a customer');
        res.status(200).json({ message: 'bank account created successfully' })
    }
    
}