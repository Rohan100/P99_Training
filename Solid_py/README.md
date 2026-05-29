# Movie Ticket Booking System

A small Python implementation focused on SOLID design principles.

## Structure

```text
src/movie_ticket_booking/
  application/     Use-case services
  domain/          Entities, value objects, contracts, exceptions
  infrastructure/  In-memory repositories and payment gateways
  presentation/    CLI/demo entry point
```

## Run Demo

```powershell
$env:PYTHONPATH = "src"
python -m movie_ticket_booking.presentation.cli
```

## SOLID Notes

- Single Responsibility: search, booking, payment, and ticket generation are separate.
- Open/Closed: add a payment gateway by creating another class with `pay()`.
- Dependency Inversion: services depend on protocols, not concrete classes.
