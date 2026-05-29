from datetime import datetime, timedelta
from decimal import Decimal

from movie_ticket_booking.application.booking_service import BookingService
from movie_ticket_booking.application.movie_search_service import MovieSearchService
from movie_ticket_booking.domain.entities import Movie, Show
from movie_ticket_booking.infrastructure.payment_gateways import (
    CreditCardGateway,
    UpiGateway,
    WalletGateway,
)
from movie_ticket_booking.infrastructure.repositories import (
    InMemoryMovieRepository,
    InMemoryShowRepository,
)
from movie_ticket_booking.infrastructure.ticket_generator import TextTicketGenerator


def build_demo_services(payment_method: str = "upi") -> tuple[MovieSearchService, BookingService]:
    movies = [
        Movie("M1", "Interstellar", "Sci-Fi", 169, "English"),
        Movie("M2", "The Dark Knight", "Action", 152, "English"),
        Movie("M3", "Dangal", "Drama", 161, "Hindi"),
    ]
    shows = [
        Show(
            id="S1",
            movie=movies[0],
            starts_at=datetime.now() + timedelta(hours=4),
            screen="Screen 1",
            price_per_seat=Decimal("250.00"),
            available_seats={"A1", "A2", "A3", "A4", "B1", "B2"},
        )
    ]

    gateways = {
        "card": CreditCardGateway(),
        "upi": UpiGateway(),
        "wallet": WalletGateway(),
    }
    payment_gateway = gateways[payment_method]

    movie_repository = InMemoryMovieRepository(movies)
    show_repository = InMemoryShowRepository(shows)
    ticket_generator = TextTicketGenerator()

    return (
        MovieSearchService(movie_repository),
        BookingService(show_repository, payment_gateway, ticket_generator),
    )


def main() -> None:
    search_service, booking_service = build_demo_services(payment_method="upi")

    print("Search results for 'dark':")
    for movie in search_service.search(keyword="dark"):
        print(f"- {movie.title} ({movie.genre})")

    ticket = booking_service.book_seats(
        show_id="S1",
        customer_name="Aarav Sharma",
        seat_numbers=["A1", "A2"],
    )

    print("\nTicket generated:")
    print(f"Ticket ID: {ticket.ticket_id}")
    print(f"Movie: {ticket.movie_title}")
    print(f"Customer: {ticket.customer_name}")
    print(f"Screen: {ticket.screen}")
    print(f"Seats: {', '.join(ticket.seat_numbers)}")
    print(f"Amount: {ticket.total_amount}")
    print(f"Transaction: {ticket.transaction_id}")


if __name__ == "__main__":
    main()
