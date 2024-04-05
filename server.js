const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

let connection;

async function connectToDatabase() {
    try {
        const answers = await inquirer.prompt([
            {
                name: 'username',
                type: 'input',
                message: 'Please enter Employee Database username',
            },
            {
                name: 'password', 
                type: 'password', 
                message: 'Please enter Employee Database password',
            }
        ]);

        connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: answers.username,
            password: answers.password,
            database: 'happyco_db'
        });

        console.log('Connected to the MySQL server as ID ' + connection.threadId);
        await mainMenu(); 
    }   catch (err) {
        console.error('Error connecting: ' + err.stack);
    }
}


async function mainMenu() {
    try {
        const answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View', 'Add', 'Edit','Delete', 'Exit']
        });

        switch (answer.action) {
            case 'View':
                await viewMenu();
                break;
            case 'Add':
                await addMenu();
                break;
            case 'Edit':
                await editMenu();
                break;
            case 'Delete':
                await deleteMenu();
                break;
            case 'Exit':
                await exit();
                break;
        }
    }
    catch (err) {
        console.error('An error occurred in mainMenu function:', err);
    }
}

async function viewMenu() {
    try {
        const answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to view?',
            choices: ['Departments', 'Roles', 'Employees', 'Back']
        });

        switch (answer.action) {
            case 'Departments':
                await viewDepartments();
                break;
            case 'Roles':
                await viewRoles();
                break;
            case 'Employees':
                await viewEmployees();
                break;
            case 'Back':
                await mainMenu();
                break;
        }
    }
    catch (err) {
        console.error('An error occurred in viewMenu function:', err);
    }
}

async function addMenu() {
    try {
        const answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to add?',
            choices: ['Department', 'Role', 'Employee', 'Back']
        });

        switch (answer.action) {
            case 'Department':
                await addDepartment();
                break;
            case 'Role':
                await addRole();
                break;
            case 'Employee':
                await addEmployee();
                break;
            case 'Back':
                await mainMenu();
                break;
        }
    }
    catch (err) {
        console.error('An error occurred in addMenu function:', err);
    }
}

async function editMenu() {
    try {
        const answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to edit?',
            choices: ['Department', 'Role', 'Employee', 'Back']
        });

        switch (answer.action) {
            case 'Department':
                await editDepartment();
                break;
            case 'Role':
                await editRole();
                break;
            case 'Employee':
                await editEmployee();
                break;
            case 'Back':
                await mainMenu();
                break;
        }
    }
    catch (err) {
        console.error('An error occurred in editMenu function:', err);
    }
}

async function deleteMenu() {
    try {
        const answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to delete?',
            choices: ['Department', 'Role', 'Employee', 'Back']
        });

        switch (answer.action) {
            case 'Department':
                await deleteDepartment();
                break;
            case 'Role':
                await deleteRole();
                break;
            case 'Employee':
                await deleteEmployee();
                break;
            case 'Back':
                await mainMenu();
                break;
        }
    }
    catch (err) {
        console.error('An error occurred in deleteMenu function:', err);
    }
}

connectToDatabase();

async function viewDepartments() {
    try {
        const [departments] = await connection.execute('SELECT * FROM department');
        console.table(departments); 
        const nextAction = await inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['View Another Department', 'Return to View Menu', 'Main Menu']
        });

        switch (nextAction.nextAction) {
            case 'View Another Department':
                await viewDepartments(); 
                break;
            case 'Return to View Menu':
                await viewMenu(); 
                break;
            case 'Main Menu':
                await mainMenu(); 
        }
    } catch (err) {
        console.error('An error occurred in viewDepartments function:', err);
    }
}
    

async function viewRoles() {
    try {
        const [roles] = await connection.execute('SELECT * FROM role');
        console.table(roles); 
        const nextAction = await inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['View Another Role', 'Return to View Menu', 'Main Menu']
        });

        switch (nextAction.nextAction) {
            case 'View Another Role':
                await viewRoles();
                break;
            case 'Return to View Menu':
                await viewMenu(); 
                break;
            case 'Main Menu':
                await mainMenu();
                break;
        }
    } catch (err) {
        console.error('An error occurred in viewRoles function:', err);
    }
}

async function viewEmployees() {
    try {
        const [employees] = await connection.execute('SELECT * FROM employee');
        console.table(employees); 
        const nextAction = await inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['View Another Employee', 'Return to View Menu', 'Main Menu']
        });

        switch (nextAction.nextAction) {
            case 'View Another Employee':
                await viewEmployees();
                break;
            case 'Return to View Menu':
                await viewMenu(); 
                break;
            case 'Main Menu':
                await mainMenu(); 
                break;
        }
    } catch (err) {
        console.error('An error occurred in viewEmployees function:', err);
    }
}
    
async function addDepartment() {
    console.log('Starting addDepartment function');

    try {
        console.log('Prompting user for department details...');
        const answers = await inquirer.prompt([
            {
                name: 'name',
                type: 'input',
                message: 'Please enter the department name',
            },
            {
                name: 'description',
                type: 'input',
                message: 'Please enter the department description',
            }
        ]);

        console.log('User provided department details:', answers);

        const query = 'INSERT INTO department (name, description) VALUES (?, ?)';
        console.log('Executing query to insert department...');
        const [result] = await connection.query(query, [answers.name, answers.description]);
        console.log('Department added successfully:', result);

        console.log('Asking user for next action...');
        const nextAction = await inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['Add Another Department','Delete a Department', 'Return to Add Menu', 'Main Menu']
        });

        console.log('User selected next action:', nextAction.nextAction);
        switch (nextAction.nextAction) {
            case 'Add Another Department':
                console.log('User chose to add another department');
                await addDepartment(); 
                break;
            case 'Delete a Department':
                console.log('User chose to delete a department');
                await deleteDepartment();
            case 'Return to Add Menu':
                console.log('Returning to add menu');
                await addMenu(); 
                break;
            case 'Main Menu':
                console.log('Returning to main menu');
                await mainMenu();
                break;
        }
    } catch (err) {
        console.error('An error occurred in addDepartment function:', err);
    }
}



async function addRole() {
    try {
        const [departments] = await connection.execute('SELECT id, name FROM department');
        const answers = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Please enter the role title',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Please enter the role salary',
                validate: value => {
                    if (!isNaN(value) && value > 0) return true;
                    return 'Please enter a valid salary.';
                }
            },
            {
                name: 'department_id',
                type: 'list',
                message: 'Please select the department for this role',
                choices: departments.map(department => ({
                    name: department.name,
                    value: department.id
                }))
            }
        ]);

        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        const [result] = await connection.query(query, [answers.title, answers.salary, answers.department_id]);
        console.log('Role added successfully:', result);

        const nextAction = await inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['Add Another Role','Delete a Role', 'Return to Add Menu', 'Main Menu']
        });

        switch (nextAction.nextAction) {
            case 'Add Another Role':
                await addRole(); 
                break;
            case 'Delete a Role':
                await deleteRole(); 
                break;
            case 'Return to Add Menu':
                await addMenu();
                break;
            case 'Main Menu':
                await mainMenu();
                break;
        }
    } catch (err) {
        console.error('An error occurred in addRole function:', err);
    }
}


async function addEmployee() {
    try {
        const [roles] = await connection.execute('SELECT id, title FROM role');
        const [employees] = await connection.execute('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
        const [departments] = await connection.execute('SELECT id, name FROM department');

        const answers = await inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Please enter the employee first name',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Please enter the employee last name',
            },
            {
                name: 'role_id',
                type: 'list',
                message: 'Please select the role',
                choices: roles.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            },
            {
                name: 'manager_id',
                type: 'list',
                message: 'Please select the manager',
                choices: [{ name: 'None', value: null }].concat(employees.map(employee => ({
                    name: employee.name,
                    value: employee.id
                })))
            },
            {
                name: 'department_id',
                type: 'list',
                message: 'Please select the department',
                choices: departments.map(department => ({
                    name: department.name,
                    value: department.id
                }))
            }
        ]);

        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        const [result] = await connection.query(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
        console.log('Employee added successfully:', result);

        const nextAction = await inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['Add Another Employee','Delete a Role', 'Return to Add Menu', 'Main Menu']
        });

        switch (nextAction.nextAction) {
            case 'Add Another Employee':
                await addEmployee(); 
                break;
            case 'Delete a Role':
                await deleteEmployee(); 
                break;
            case 'Return to Add Menu':
                await addMenu();
                break;
            case 'Main Menu':
                await mainMenu();
                break;
        }
    } catch (err) {
        console.error
    }       
}



async function editEmployee() {
    try {
        const [employees] = await connection.execute('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
        const [roles] = await connection.execute('SELECT id, title FROM role');
        const [departments] = await connection.execute('SELECT id, name FROM department');

        const employeeChoices = employees.map(employee => ({
            name: employee.name,
            value: employee.id
        }));
        employeeChoices.push({ name: 'Cancel and return to menu', value: 'CANCEL' });

        const employeeAnswer = await inquirer.prompt([
            {
                name: 'employee_id',
                type: 'list',
                message: 'Please choose an employee to edit or cancel:',
                choices: employeeChoices
            }
        ]);

        if (employeeAnswer.employee_id === 'CANCEL') {
            console.log('Editing canceled. Returning to menu.');
            await editMenu();
            return;
        }

        const roleDepartmentManagerPrompts = [
            {
                name: 'role_id',
                type: 'list',
                message: 'Please enter the new role ID',
                choices: roles.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            },
            {
                name: 'manager_id',
                type: 'list',
                message: 'Please enter the new manager ID',
                choices: [{ name: 'None', value: null }].concat(employees.filter(employee => employee.id !== employeeAnswer.employee_id).map(employee => ({
                    name: employee.name,
                    value: employee.id
                })))
            },
            {
                name: 'department_id',
                type: 'list',
                message: 'Please enter the new department ID',
                choices: departments.map(department => ({
                    name: department.name,
                    value: department.id
                }))
            }
        ];

        const moreAnswers = await inquirer.prompt(roleDepartmentManagerPrompts);

        const query = 'UPDATE employee SET role_id = ?, manager_id = ?, department_id = ? WHERE id = ?';
        await connection.query(query, [moreAnswers.role_id, moreAnswers.manager_id, moreAnswers.department_id, employeeAnswer.employee_id]);
        console.log('Employee updated successfully.');

        const nextAction = await inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['Edit Another Employee', 'Return to Edit Menu', 'Main Menu']
        });
    
        switch (nextAction.nextAction) {
    
            case `Edit Another Employee`:
                await editEmployee();
                break;
            case 'Return to Edit Menu':
                await editMenu();
                break;
            case 'Main Menu':
                await mainMenu();
                break;
        }
    } catch (err) {
        console.error('An error occurred in editEmployee function:', err);
    }
}


async function editRole() {
    try {
        const [roles] = await connection.execute('SELECT id, title FROM role');
        const [departments] = await connection.execute('SELECT id, name FROM department');

        const roleChoices = roles.map(role => ({
            name: role.title,
            value: role.id
        }));
        roleChoices.push({ name: 'Cancel and return to menu', value: 'CANCEL' });
        const answers = await inquirer.prompt([
            {
                name: 'role_id',
                type: 'list',
                message: 'Please choose a role to edit:',
                choices: roleChoices
            },
        ]);
        if (answers.role_id === 'CANCEL') {
            console.log('Editing canceled. Returning to menu.');
            await editMenu();
            return;
        }

        const titleSalaryDepartmentPrompts = [
            {
                name: 'title',
                type: 'input',
                message: 'Enter the new title for the role:',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the new salary for the role:',
                validate: value => {
                    if (!isNaN(value) && value > 0) return true;
                    return 'Please enter a valid salary.';
                }
            },
            {
                name: 'department_id',
                type: 'list',
                message: 'Enter the new department ID for the role:',
                choices: departments.map(department => ({
                    name: department.name,
                    value: department.id
                }))
            }
        ]

        const moreAnswers = await inquirer.prompt(titleSalaryDepartmentPrompts);

        const query = 'UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?';
        await connection.query(query, [moreAnswers.title, moreAnswers.salary, moreAnswers.department_id, answers.role_id]);
        console.log('Role updated successfully');
        // Follow with the next action prompt
        const nextAction = await inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['Edit Another Role', 'Return to Edit Menu', 'Main Menu']
        });
    
        switch (nextAction.nextAction) {
    
            case `Edit Another Role`:
                await editEmployee();
                break;
            case 'Return to Edit Menu':
                await editMenu();
                break;
            case 'Main Menu':
                await mainMenu();
                break;
        }
    } catch (err) {
        console.error('An error occurred in editRole function:', err);
    }
}


async function editDepartment() {
    try {
        const [departments] = await connection.execute('SELECT id, name FROM department');
        const choices = departments.map(department => ({
            name: department.name,
            value: department.id
        }));
        choices.push({ name: 'Cancel and return to menu', value: 'CANCEL' });

        const answers = await inquirer.prompt([
            {
                name: 'department_id',
                type: 'list',
                message: 'Please choose a department to edit:',
                choices: choices
            }
        ]);

        if (answers.department_id === 'CANCEL') {
            console.log('Editing canceled. Returning to menu.');
            await editMenu();
            return;
        }
        const nameDepartmentPrompts = [
            {
                name: 'name',
                type: 'input',
                message: 'Enter the new name for the department:',
            }
        ]

        const moreAnswers = await inquirer.prompt(nameDepartmentPrompts);

        const query = 'UPDATE department SET name = ? WHERE id = ?';
        await connection.query(query, [moreAnswers.name, answers.department_id]);
        console.log('Department updated successfully');
        const nextAction = await inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['Edit Another Department', 'Return to Edit Menu', 'Main Menu']
        });
    
        switch (nextAction.nextAction) {
    
            case `Edit Another Department`:
                await editDepartment();
                break;
            case 'Return to Edit Menu':
                await editMenu();
                break;
            case 'Main Menu':
                await mainMenu();
                break;
        }
    } catch (err) {
        console.error('An error occurred in editEmployee function:', err);
    }
}

async function deleteDepartment() {
    try {
        const [departments] = await connection.execute('SELECT id, name FROM department');
        // Add a 'Cancel' option to the list of departments
        const choices = departments.map(department => ({
            name: department.name,
            value: department.id
        }));
        choices.push({ name: 'Cancel and return to menu', value: 'CANCEL' });

        const answers = await inquirer.prompt({
            name: 'department_id',
            type: 'list',
            message: 'Please choose a department to delete or cancel:',
            choices: choices
        });

        if (answers.department_id === 'CANCEL') {
            console.log('Deletion canceled. Returning to menu.');
            await deleteMenu();
            return; 
        }

        const query = 'DELETE FROM department WHERE id = ?';
        await connection.query(query, [answers.department_id]);
        console.log('Department deleted successfully');

        console.log('Department deleted successfully');
        inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['Delete Another Department', 'Return to Delete Menu', 'Main Menu']
        }).then(answer => {
            switch (answer.nextAction) {
                case 'Delete Another Department':
                    deleteDepartment();
                    break;
                case 'Return to Delete Menu':
                    deleteMenu(); 
                    break;
                case 'Main Menu':
                    mainMenu(); 
                    break;
            }
        });
    } catch (err) {
        console.error('An error occurred in deleteDepartment function:', err);
    }
}

async function deleteRole() {
    try {
        const [roles] = await connection.execute('SELECT id, title FROM role');
        const choices = roles.map(role => ({
            name: role.title,
            value: role.id
        }));
        choices.push({ name: 'Cancel and return to menu', value: 'CANCEL' });
        const answers = await inquirer.prompt({
            name: 'role_id',
            type: 'list',
            message: 'Please choose a role to delete:',
            choices: choices
        });

        if (answers.role_id === 'CANCEL') {
            console.log('Deletion canceled. Returning to menu.');
            await deleteMenu(); 
            return;
        }

        const query = 'DELETE FROM role WHERE id = ?';
        await connection.query(query, [answers.role_id]);
        console.log('Role deleted successfully');
        inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['Delete Another Role', 'Return to Delete Menu', 'Main Menu']
        }).then(answer => {
            switch (answer.nextAction) {
                case 'Delete Another Role':
                    deleteRole(); 
                    break;
                case 'Return to Delete Menu':
                    deleteMenu();
                    break;
                case 'Main Menu':
                    mainMenu();
                    break;
            }
        });
    } catch (err) {
        console.error('An error occurred in deleteRole function:', err);
    }
}

async function deleteEmployee() {
    try {
        const [employees] = await connection.execute('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
        const choices = employees.map(employee => ({
            name: employee.name,
            value: employee.id
        }));
        choices.push({ name: 'Cancel and return to menu', value: 'CANCEL' });
        
        const answers = await inquirer.prompt({
            name: 'employee_id',
            type: 'list',
            message: 'Please choose an employee to delete:',
            choices: choices
        });

        if (answers.employee_id === 'CANCEL') {
            console.log('Deletion canceled. Returning to menu.');
            await deleteMenu();
            return;
        }

        const query = 'DELETE FROM employee WHERE id = ?';
        await connection.query(query, [answers.employee_id]);
        console.log('Employee deleted successfully');
        inquirer.prompt({
            name: 'nextAction',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['Delete Another Employee', 'Return to Delete Menu', 'Main Menu']
        }).then(answer => {
            switch (answer.nextAction) {
                case 'Delete Another Employee':
                    deleteEmployee(); 
                    break;
                case 'Return to Delete Menu':
                    deleteMenu();
                    break;
                case 'Main Menu':
                    mainMenu(); 
                    break;
            }
        });
    } catch (err) {
        console.error('An error occurred in deleteEmployee function:', err);
    }
}


async function exit() {
    try {
        await connection.end(); 
        console.log('Connection closed. Exiting the application. Have a great day! ;)');
        process.exit(0); 
    } catch (err) {
        console.error('An error occurred while closing the connection:', err);
    }
}