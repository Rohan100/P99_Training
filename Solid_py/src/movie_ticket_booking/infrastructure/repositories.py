from copy import deepcopy

from movie_ticket_booking.domain.entities import Movie, Show


class InMemoryMovieRepository:
    def __init__(self, movies: list[Movie]) -> None:
        self._movies = movies

    def search(self, keyword: str = "", genre: str | None = None) -> list[Movie]:
        normalized_keyword = keyword.casefold().strip()
        normalized_genre = genre.casefold().strip() if genre else None

        return [
            movie
            for movie in self._movies
            if self._matches_keyword(movie, normalized_keyword)
            and self._matches_genre(movie, normalized_genre)
        ]

    @staticmethod
    def _matches_keyword(movie: Movie, keyword: str) -> bool:
        return not keyword or keyword in movie.title.casefold()

    @staticmethod
    def _matches_genre(movie: Movie, genre: str | None) -> bool:
        return genre is None or movie.genre.casefold() == genre


class InMemoryShowRepository:
    def __init__(self, shows: list[Show]) -> None:
        self._shows = {show.id: deepcopy(show) for show in shows}

    def get_by_id(self, show_id: str) -> Show | None:
        show = self._shows.get(show_id)
        return deepcopy(show) if show else None

    def save(self, show: Show) -> None:
        self._shows[show.id] = deepcopy(show)
