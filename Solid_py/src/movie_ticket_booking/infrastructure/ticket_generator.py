from uuid import uuid4

from movie_ticket_booking.domain.entities import Booking, Ticket


class TextTicketGenerator:
    def generate(self, booking: Booking, transaction_id: str) -> Ticket:
        return Ticket(
            ticket_id=f"TICKET-{uuid4()}",
            booking_id=booking.id,
            movie_title=booking.show.movie.title,
            customer_name=booking.customer_name,
            screen=booking.show.screen,
            starts_at=booking.show.starts_at,
            seat_numbers=tuple(booking.seat_numbers),
            total_amount=booking.total_amount,
            transaction_id=transaction_id,
        )
