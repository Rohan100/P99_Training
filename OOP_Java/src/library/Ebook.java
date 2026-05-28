package library;

public class Ebook extends Book {
    private double fileSizeMB;

    public Ebook(String id, String title, String author, String isbn, double fileSizeMB) {
        super(id, title, author, isbn);
        this.fileSizeMB = fileSizeMB;
    }

    public double getFileSizeMB() { return fileSizeMB; }

    @Override
    public void displayDetails() {
        System.out.println("Ebook: " + getTitle() + " by " + getAuthor() + " (" + fileSizeMB + " MB)");
    }
}
