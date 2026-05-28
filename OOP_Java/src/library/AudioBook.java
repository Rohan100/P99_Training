package library;

public class AudioBook extends Book {
    private int durationMinutes;

    public AudioBook(String id, String title, String author, String isbn, int durationMinutes) {
        super(id, title, author, isbn);
        this.durationMinutes = durationMinutes;
    }

    public int getDurationMinutes() { return durationMinutes; }

    @Override
    public void displayDetails() {
        System.out.println("AudioBook: " + getTitle() + " by " + getAuthor() + " (" + durationMinutes + " mins)");
    }
}
