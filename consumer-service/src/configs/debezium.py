from enum import Enum

class DebeziumConfigEnum(Enum):
    CREATE = 'c'
    UPDATE = 'u'
    DELETE = 'd'