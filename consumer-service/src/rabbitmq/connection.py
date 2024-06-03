import pika
from src.configs.rabbitmq import RabbitMQConfig 

class RabbitMQConnection:
    def __init__(self, config: RabbitMQConfig):
        self._config = config
        self._connection = None
        self._channel = None
    def get_connection(self):
        if self._connection is None or self._connection.is_closed:
            self._connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    host=self._config["host"],
                    port=self._config["port"],
                    credentials=pika.PlainCredentials(
                        username=self._config["username"],
                        password=self._config["password"],
                    ),
                ),
            )
        return self._connection
    
    def consume(self, channel, queue, callback):
        channel.basic_consume(queue=queue, on_message_callback=callback)
        channel.start_consuming()
    
    def publish(self, channel, exchange, routing_key, body):
        channel.basic_publish(
            exchange=exchange,
            routing_key=routing_key,
            body=body,
        )
    
    def declare_queue(self, channel, queue):
        channel.queue_declare(queue=queue, durable=True)
