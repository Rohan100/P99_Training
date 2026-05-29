from dataclasses import dataclass
from decimal import Decimal


@dataclass(frozen=True)
class PaymentRequest:
    booking_id: str
    amount: Decimal
    customer_name: str


@dataclass(frozen=True)
class PaymentReceipt:
    success: bool
    transaction_id: str
    message: str
