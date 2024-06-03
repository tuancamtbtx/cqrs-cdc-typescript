import pickle
import json

class EventSerdes:
    @staticmethod
    def serialize(event: any) -> bytes:
        return pickle.dumps(event)

    @staticmethod
    def deserialize(msg_value) -> any:
        msg_decoded = msg_value.decode()
        return json.loads(msg_decoded)
