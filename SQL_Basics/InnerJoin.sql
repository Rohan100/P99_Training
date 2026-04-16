-- create Tables

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
	
);
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    student_id INTEGER,
    course_name VARCHAR(100),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

--insert values

INSERT INTO students (first_name, last_name)
VALUES 
('Rohan', 'Nagare'),
('Amit', 'Sharma'),
('Priya', 'Patil');

INSERT INTO courses (student_id, course_name)
VALUES
(1, 'Web Development'),
(1, 'Machine Learning'),
(2, 'Data Structures');

--inner join

SELECT 
    students.first_name,
    students.last_name,
    courses.course_name
FROM students
INNER JOIN courses
ON students.id = courses.student_id;