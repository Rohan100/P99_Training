//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
        Student student = new Student(21,"Rohan");
        Student student2 = new Student(21,"Rohan");
        System.out.println(student2.equals(student));
        System.out.println("Name of student " + student.getName() + " and age is" + student.getAge());
        System.out.println(student.getClass());

        Rectangle rectangle = new Rectangle(10,20,"red");
        System.out.println(rectangle.calculateArea());
    }
}