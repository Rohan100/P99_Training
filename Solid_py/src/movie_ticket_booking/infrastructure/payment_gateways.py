from uuid import uuid4

from movie_ticket_booking.domain.value_objects import PaymentReceipt, PaymentRequest


class CreditCardGateway:
    def pay(self, request: PaymentRequest) -> PaymentReceipt:
        return PaymentReceipt(
            success=True,
            transaction_id=f"CC-{uuid4()}",
            message=f"Credit card payment captured for {request.amount}.",
        )


class UpiGateway:
    def pay(self, request: PaymentRequest) -> PaymentReceipt:
        return PaymentReceipt(
            success=True,
            transaction_id=f"UPI-{uuid4()}",
            message=f"UPI payment captured for {request.amount}.",
        )


class WalletGateway:
    def pay(self, request: PaymentRequest) -> PaymentReceipt:
        return PaymentReceipt(
            success=True,
            transaction_id=f"WALLET-{uuid4()}",
            message=f"Wallet payment captured for {request.amount}.",
        )
