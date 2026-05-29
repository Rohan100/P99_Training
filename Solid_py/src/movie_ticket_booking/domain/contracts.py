from typing import Protocol

from movie_ticket_booking.domain.entities import Booking, Movie, Show, Ticket
from movie_ticket_booking.domain.value_objects import PaymentReceipt, PaymentRequest


class MovieRepository(Protocol):
    def search(self, keyword: str = "", genre: str | None = None) -> list[Movie]:
        """Return movies matching the given filters."""


class ShowRepository(Protocol):
    def get_by_id(self, show_id: str) -> Show | None:
        """Return a show by id."""

    def save(self, show: Show) -> None:
        """Persist show changes."""


class PaymentGateway(Protocol):
    def pay(self, request: PaymentRequest) -> PaymentReceipt:
        """Charge a customer and return payment result."""


class TicketGenerator(Protocol):
    def generate(self, booking: Booking, transaction_id: str) -> Ticket:
        """Create a ticket for a confirmed booking."""
