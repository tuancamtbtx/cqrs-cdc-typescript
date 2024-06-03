from elasticsearch import Elasticsearch

from src.configs.elasticsearch import ElasticSearchConfig
class ElasticsearchDestination:
    def __init__(self) -> None:
        self._client = Elasticsearch(
            hosts=[ElasticSearchConfig.HOST],
            http_auth=(ElasticSearchConfig.USERNAME, ElasticSearchConfig.PASSWORD),
        )

    def index(self, index: str, body: dict):
        self._client.index(index=index, body=body)
    
    def add_document(self, index: str, id: str, body: dict):
        self._client.index(index=index, id=id, body=body)

    def remove_document(self, index: str, doc_type: str, id: str):
        self._client.delete(index=index, doc_type=doc_type, id=id)
    
    def update_document(self, index: str, doc_type: str, id: str, body: dict):
        self._client.update(index=index, doc_type=doc_type, id=id, body=body)

    def is_document_exists(self, index: str, doc_type: str, id: str):
        return self._client.exists(index=index, doc_type=doc_type, id=id)