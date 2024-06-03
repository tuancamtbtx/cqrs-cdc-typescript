from dataclasses import dataclass


@dataclass
class Item:
    id: int
    name: str
    price: float
    quantity: int
    description: str
    category: str
    image: str

    def __str__(self):
        return f"Item(id={self.id}, name={self.name}, price={self.price}, quantity={self.quantity}, description={self.description}, category={self.category}, image={self.image})"