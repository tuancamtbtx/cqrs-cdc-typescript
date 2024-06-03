import { Client } from "@elastic/elasticsearch";
import logger from "@src/utils/logger";
import ESConfig from "@src/configs/elasticsearch";
export default class ElasticsearchQuery {
  client: Client;
  constructor() {
    this.client = new Client({ node: ESConfig.HOST });
  }
 public async search(query: any) {
    try {
      const response = await this.client.search(query);
      logger.info(`Document found: ${response.hits.hits.length}`);
      const hits = response.hits.hits;
      let data = hits.map((hit: any) => {
        return hit._source;
      });
      return data;
    } catch (error) {
      logger.error("Error finding document:", error);
    }
 }
}
