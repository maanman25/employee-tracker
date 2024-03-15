USE employee_tracker_db;

INSERT INTO departments (department_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4),
       ("Salesperson", 80000, 4),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2),
       ("Accoutant", 125000, 2);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Mike", "Chan", 1),
       ("Mr", "Bean", 3),
       ("Kevin", "Tupik", 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
       ("Ashley", "Rodriguez", 4, 1),
       ("Kunal", "Singh", 2, 2),
       ("Malia", "Brown", 2, 3),
       ("Sarah", "Lourd", 4, 1),
       ("Tom", "Allen", 4, 1),
       ("Ben", "Simmons", 6, 2),
       ("Chauncey", "Billups", 2, 3);

-- match the employee manager_i