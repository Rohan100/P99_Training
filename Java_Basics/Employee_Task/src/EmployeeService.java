import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class EmployeeService {

    private List<Employee> employees = new ArrayList<>();

    public void addEmployee(Employee emp) {
        employees.add(emp);
        System.out.println("Employee added successfully!");
    }

    public void deleteEmployee(int id) {

        Iterator<Employee> iterator = employees.iterator();
        boolean found = false;

        while (iterator.hasNext()) {
            Employee emp = iterator.next();

            if (emp.getId() == id) {
                iterator.remove();
                found = true;
                System.out.println("Employee deleted successfully!");
                break;
            }
        }

        if (!found) {
            System.out.println("Employee not found!");
        }
    }

    public void viewEmployees() {

        if (employees.isEmpty()) {
            System.out.println("No employees available.");
            return;
        }

        System.out.println("\nEmployee List:");
        for (Employee emp : employees) {
            emp.display();
        }
    }
}