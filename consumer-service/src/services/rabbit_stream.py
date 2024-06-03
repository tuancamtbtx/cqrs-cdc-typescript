import json
from src.serdes.event_serdes import EventSerdes
from src.rabbitmq.connection import RabbitMQConnection
from src.destinations.elasticsearch import ElasticsearchDestination
from src.configs.debezium import DebeziumConfigEnum
class RabbitStreamService:
    def __init__(self,rabbit_conf) -> None:
        self.rabbit_conf = rabbit_conf
        
        self.serdes = EventSerdes()

        self.elasticsearch = ElasticsearchDestination()

    def process(self, channel, method, properties, body):

        payload = self.get_payload(body)
        if payload is None:
            channel.basic_ack(delivery_tag=method.delivery_tag)
            return
        schema = self.get_schema(body)
        if schema is None:
            channel.basic_ack(delivery_tag=method.delivery_tag)
            return
        print(f" [x] Received: {payload}")
        table_name = self.get_table_name(payload)
        ops = self.get_ops(payload)
        print(f" [x] Operation: {ops}")
        print(f" [x] Table: {table_name}")
        try:
            if ops == DebeziumConfigEnum.DELETE.value:
                self.elasticsearch.remove_document(table_name, payload['id'])
            else:
                self.elasticsearch.index(table_name, payload)
            channel.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            print(f"Error indexing document: {e}")

    def get_table_name(self, payload):
        if '__table' in payload:
            return payload['__table'].lower()
        return None
    
    def get_payload(self, event):
        msg = self.serdes.deserialize(event)
        return msg['payload']
    
    def get_schema(self, event):
        msg = self.serdes.deserialize(event)
        return msg['schema']
    
    def get_ops(self, payload):
        if '__op' in payload:
            return payload['__op']
        return None
    
    def run(self):
        print(" [*] Waiting for messages. To exit press CTRL+C")
        rabbit = RabbitMQConnection(config=self.rabbit_conf,)
        rabbit_conn = rabbit.get_connection()
        channel = rabbit_conn.channel()
        channel.basic_qos(prefetch_count=1)
        rabbit.consume(channel, 'changelog', lambda ch, method, properties, body: self.process(ch, method, properties, body))