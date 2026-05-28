package library;

public class PhysicalBook extends Book {
    private String shelfLocation;

    public PhysicalBook(String id, String title, String author, String isbn, String shelfLocation) {
        super(id, title, author, isbn);
        this.shelfLocation = shelfLocation;
    }

    public String getShelfLocation() { return shelfLocation; }

    @Override
    public void displayDetails() {
        System.out.println("PhysicalBook: " + getTitle() + " by " + getAuthor() + " at " + shelfLocation);
    }
}
