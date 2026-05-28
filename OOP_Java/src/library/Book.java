package library;

public abstract class Book implements Borrowable {
    private String id;
    private String title;
    private String author;
    private String isbn;
    private String status = "Available";

    public Book(String id, String title, String author, String isbn) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getIsbn() { return isbn; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public void borrowItem() {
        this.status = "Borrowed";
    }

    @Override
    public void returnItem() {
        this.status = "Available";
    }

    public abstract void displayDetails();
}
