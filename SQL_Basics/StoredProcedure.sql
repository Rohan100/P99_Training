CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INTEGER CHECK (age > 0 AND age < 150),
    course VARCHAR(150),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(150) NOT NULL,
    duration INTEGER,
    fees NUMERIC(10,2)
);

CREATE OR REPLACE PROCEDURE insert_student(
    p_first_name VARCHAR,
    p_last_name VARCHAR,
    p_email VARCHAR,
    p_age INTEGER,
    p_course VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO students (first_name, last_name, email, age, course)
    VALUES (p_first_name, p_last_name, p_email, p_age, p_course);

    RAISE NOTICE 'Student inserted successfully';
END;
$$;

CALL insert_student('Rohan', 'Nagare', 'rohan@gmail.com', 22, 'IT');

CREATE OR REPLACE PROCEDURE delete_student(p_id INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
    student_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO student_count FROM students WHERE id = p_id;

    IF student_count = 0 THEN
        RAISE NOTICE 'Student not found';
    ELSE
        DELETE FROM students WHERE id = p_id;
        RAISE NOTICE 'Student deleted successfully';
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE get_students_by_course(p_course VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Display matching records
    RAISE NOTICE 'Students in course: %', p_course;

    FOR record IN 
        SELECT * FROM students WHERE course = p_course
    LOOP
        RAISE NOTICE '% % | Email: % | Age: %',
            record.first_name,
            record.last_name,
            record.email,
            record.age;
    END LOOP;
END;
$$;