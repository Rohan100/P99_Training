public class Employee {

    private int id;
    private String name;
    private String department;
    private double salary;

    public Employee(int id, String name, String department, double salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public void display() {
        System.out.println(
                "ID: " + id +
                        " | Name: " + name +
                        " | Department: " + department +
                        " | Salary: " + salary
        );
    }
}