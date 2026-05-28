package library;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        Library library = new Library();

        Book ebook = new Ebook("B01", "Clean Code", "Robert Martin", "111", 10.5);
        Book audiobook = new AudioBook("B02", "Pragmatic Programmer", "Andy Hunt", "222", 300);
        Book physical = new PhysicalBook("B03", "Design Patterns", "Erich Gamma", "333", "Shelf A");

        library.addBook(ebook);
        library.addBook(audiobook);
        library.addBook(physical);

        Member alice = new Student("M01", "Alice");
        Member bob = new Faculty("M02", "Dr. Bob");

        library.registerMember(alice);
        library.registerMember(bob);

        System.out.println("\n--- Displaying Book Details ---");
        ebook.displayDetails();
        audiobook.displayDetails();
        physical.displayDetails();

        System.out.println("\n--- Searching for 'Code' ---");
        List<Book> searchResults = library.searchByTitle("Code");
        for (Book b : searchResults) {
            System.out.println("Found book: " + b.getTitle());
        }

        System.out.println("\n--- Testing Borrowing ---");
        // Alice borrows Clean Code
        library.borrowBook("M01", "111");
        
        library.borrowBook("M02", "111");

        System.out.println("\n--- Testing Return ---");
        library.returnBook("M01", "111");
        
        library.borrowBook("M02", "111");
    }
}
