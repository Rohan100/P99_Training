package library;

import java.util.ArrayList;
import java.util.List;

public abstract class Member {
    private String memberId;
    private String name;
    private List<Book> borrowedBooks = new ArrayList<>();

    public Member(String memberId, String name) {
        this.memberId = memberId;
        this.name = name;
    }

    public String getMemberId() { return memberId; }
    public String getName() { return name; }
    public List<Book> getBorrowedBooks() { return borrowedBooks; }

    public abstract int getMaxBorrowLimit();

    public void borrowBook(Book book) {
        if (borrowedBooks.size() >= getMaxBorrowLimit()) {
            System.out.println(name + " has reached the borrow limit of " + getMaxBorrowLimit() + " books.");
            return;
        }
        if (!book.getStatus().equals("Available")) {
            System.out.println("Book " + book.getTitle() + " is already borrowed.");
            return;
        }
        book.borrowItem();
        borrowedBooks.add(book);
        System.out.println(name + " successfully borrowed " + book.getTitle());
    }

    public void returnBook(Book book) {
        if (borrowedBooks.remove(book)) {
            book.returnItem();
            System.out.println(name + " successfully returned " + book.getTitle());
        } else {
            System.out.println(name + " did not borrow " + book.getTitle());
        }
    }
}
