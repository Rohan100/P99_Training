from decimal import Decimal
from uuid import uuid4

from movie_ticket_booking.domain.contracts import (
    PaymentGateway,
    ShowRepository,
    TicketGenerator,
)
from movie_ticket_booking.domain.entities import Booking, Ticket
from movie_ticket_booking.domain.exceptions import (
    PaymentFailedError,
    SeatAlreadyBookedError,
    ShowNotFoundError,
)
from movie_ticket_booking.domain.value_objects import PaymentRequest


class BookingService:
    """Coordinates seat reservation, payment, and ticket creation."""

    def __init__(
        self,
        show_repository: ShowRepository,
        payment_gateway: PaymentGateway,
        ticket_generator: TicketGenerator,
    ) -> None:
        self._show_repository = show_repository
        self._payment_gateway = payment_gateway
        self._ticket_generator = ticket_generator

    def book_seats(
        self,
        show_id: str,
        customer_name: str,
        seat_numbers: list[str],
    ) -> Ticket:
        show = self._show_repository.get_by_id(show_id)
        if show is None:
            raise ShowNotFoundError(f"Show '{show_id}' was not found.")

        if not show.are_seats_available(seat_numbers):
            raise SeatAlreadyBookedError("One or more requested seats are unavailable.")

        total_amount = show.price_per_seat * Decimal(len(seat_numbers))
        booking = Booking(
            id=str(uuid4()),
            show=show,
            customer_name=customer_name,
            seat_numbers=seat_numbers,
            total_amount=total_amount,
        )

        payment = self._payment_gateway.pay(
            PaymentRequest(
                booking_id=booking.id,
                amount=total_amount,
                customer_name=customer_name,
            )
        )
        if not payment.success:
            raise PaymentFailedError(payment.message)

        show.book_seats(seat_numbers)
        self._show_repository.save(show)
        return self._ticket_generator.generate(booking, payment.transaction_id)
