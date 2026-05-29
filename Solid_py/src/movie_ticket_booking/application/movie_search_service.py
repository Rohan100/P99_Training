from movie_ticket_booking.domain.contracts import MovieRepository
from movie_ticket_booking.domain.entities import Movie


class MovieSearchService:
    """Searches movies without knowing where movies are stored."""

    def __init__(self, movie_repository: MovieRepository) -> None:
        self._movie_repository = movie_repository

    def search(self, keyword: str = "", genre: str | None = None) -> list[Movie]:
        return self._movie_repository.search(keyword=keyword, genre=genre)
