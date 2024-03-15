
// Import inquirer
const inquirer = require('inquirer')
// import and require mysql2
const mysql = require('mysql2');

// mysql connection
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'Cle4276!',
        database: 'employee_tracker_db'
    }
);

// Function to start program
function menu() {
    // Prompt user choices
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ['View all deparments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Delete an employee']
        }
    ]).then((response) => {
        if (response.options === 'View all deparments') {
            viewDepartments();
        };
        
        if (response.options === 'View all roles'){
            viewRoles();
        };
        
        if (response.options === 'View all employees'){
            viewEmployees();
        };
        
        if (response.options === 'Add a deparment'){
            addDepartment();
        };
        
        if (response.options === 'Add a role'){
            addRole();
        };
        
        if (response.options === 'Add an employee'){
            addEmployee();
        };
        
        if (response.options === 'Update an employee role'){
            updateEmployee();
        };
        
        if (response.options === 'Delete an employee'){
            deleteEmployee();
        };
    })
}

// view all departments
function viewDepartments() {
    console.log(`Showing all Departments`);
    db.query(`SELECT id, department_name AS Departments FROM departments`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows)
        menu();
    });
}

// view all roles
function viewRoles() {
    console.log(`Showing all Roles`);
    db.query(`SELECT id, title AS Title, salary AS Salary, department_id AS Department FROM roles`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows)
        menu();
    });
}

// view all employees
function viewEmployees() {
    const sql = `SELECT e.id, e.first_name AS First, e.last_name AS Last, r.title AS Title, r.department_id AS Department, r.salary AS Salary, e.manager_id AS Manager
    FROM employees e
    JOIN roles r ON e.role_id = r.id`;

    console.log(`Showing all Roles`);
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows)
        menu();
    });
}

// add new department
async function addDepartment() {
    const res = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new Department name?',
            name: 'deparmentName'
        }
    ])

    const sql = `INSERT INTO departments (deparment_name) VALUES (?)`;
    const params = [res.deparmentName]
    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.log(`Department Added!`);
        menu();
    }); 
}

// add new role
async function addRole() {
    const res = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            messge: 'What is the name of the new role?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            messge: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'roleDepartment',
            messge: 'Which department does this role belong to?',
            choices: ["Engineering", "Finance", "Legal", "Sales"]
        }
    ])
    const sql = `INSERT INTO roles (title, salary, department_id VALUES (?,?,?))`;
    const params = [res.roleName, res.roleSalary, res.roleDepartment]
    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.log(`Department Created!`);
        menu();
    })

}

// add new employee
async function addEmployee() {
    const res = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFName',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'employeeLName',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'What is the employee\'s role?'
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: 'Who is the employee\'s manager?'
        },
    ])
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [res.employeeFName, res.employeeLName, res.employeeRole, res.employeeManager];
    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.log(`Employee Added!`);
        menu();
    }); 
}

// update an employee role
async function updateEmployeeRole() {
    const res = inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee\'s role do you want to update?',
            choices: ['Tom Allens', 'Mr Bean', 'Chauncey Billips', 'Malia Brown', 'Mike Chan', 'Sarah Lourd', 'Ashley Rodriguez', 'Ben Simmons', 'Kevin Tupik']
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which role do you want to assign the selected employee?',
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant']
        }
    ]);

    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [res.employee, res.role]
    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Employee Role Updated!`);
        menu();
    })
}

// delete an employee
async function deleteEmployee() {
    const res = await inquirer.prompt([
        {
            type: 'list',
            name: 'delete',
            message: 'What is the employee\'s name you would like to delete?',
            choices: ['Tom Allens', 'Mr Bean', 'Chauncey Billips', 'Malia Brown', 'Mike Chan', 'Sarah Lourd', 'Ashley Rodriguez', 'Ben Simmons', 'Kevin Tupik']
        }
    ])
    
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [res.delete];
    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.log(`Employee Added!`);
        menu();
    }); 
}

menu();
