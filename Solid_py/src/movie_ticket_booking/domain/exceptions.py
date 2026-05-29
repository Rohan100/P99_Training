class BookingError(Exception):
    """Base exception for booking failures."""


class ShowNotFoundError(BookingError):
    """Raised when a show cannot be found."""


class SeatAlreadyBookedError(BookingError):
    """Raised when requested seats are not available."""


class PaymentFailedError(BookingError):
    """Raised when payment is declined or cannot be completed."""
