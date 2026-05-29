from dataclasses import dataclass, field
from datetime import datetime
from decimal import Decimal


@dataclass(frozen=True)
class Movie:
    id: str
    title: str
    genre: str
    duration_minutes: int
    language: str


@dataclass
class Show:
    id: str
    movie: Movie
    starts_at: datetime
    screen: str
    price_per_seat: Decimal
    available_seats: set[str]

    def are_seats_available(self, seat_numbers: list[str]) -> bool:
        return all(seat in self.available_seats for seat in seat_numbers)

    def book_seats(self, seat_numbers: list[str]) -> None:
        for seat in seat_numbers:
            self.available_seats.remove(seat)


@dataclass
class Booking:
    id: str
    show: Show
    customer_name: str
    seat_numbers: list[str]
    total_amount: Decimal


@dataclass(frozen=True)
class Ticket:
    ticket_id: str
    booking_id: str
    movie_title: str
    customer_name: str
    screen: str
    starts_at: datetime
    seat_numbers: tuple[str, ...]
    total_amount: Decimal
    transaction_id: str
    generated_at: datetime = field(default_factory=datetime.now)
