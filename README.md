# Employee Tracker CMS

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description
The Employee Tracker is a command-line application designed to help business owners view and manage the departments, roles, and employees in their company. Built with Node.js, Inquirer, and MySQL, this application offers an easy-to-use interface for organizing and planning business operations.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Features](#features)
* [Technology Used](#technologies-used)
* [Contributing](#contributing)
* [Contact](#contact)

## Installation
Clone the repository to your local machine.
Navigate to the project directory and install the required npm packages by running npm install.
Ensure Inquirer version 8.2.4 is installed by running npm i inquirer@8.2.4.
Set up the MySQL database using the schema and seeds provided in the db folder.
Start the application by running node index.js in your terminal.

## Usage
To use this application, enter the User Name and the password for the MySQL2 CLI. After being granted access, use the selector options to choose the route taken. If a manage role needs to be created (there is no option to create a specified key for a management role outside of choosing an applicable name that properly defines the role as a manager) whenever an employee is added the manager can be chosen from the menu listing employees. The title should include whether a role is a management role or not. Managers can be changed from the editEmployee menu.
Follow the interactive prompts to manage your company's employee database:
View departments, roles, and employees.
Add departments, roles, and employees.
Update employee roles.

- Video Walkthrough

## Credits

## License
This project is licensed under the MIT license.
https://opensource.org/licenses/MIT


## Features
Comprehensive Management Options: Includes options to view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role.
Formatted Tables: Displays information in formatted tables for clear, readable access to department names, roles, and employee details.
Interactive Prompts: Utilizes the Inquirer package for interactive command-line prompts to gather user inputs for various operations like adding or updating records.
Acceptance Criteria
Provides options to view all departments, roles, and employees; add new departments, roles, and employees; and update employee roles.
Presents data in formatted tables for easy readability.
Adds new departments, roles, and employees to the database based on user input.
Updates existing employee roles in the database.

## Technologies Used
Inquirer
MySql2
Node.js

## Contributing
Contributions to improve the Employee Tracker or add new features are welcome. Please follow these steps:

Fork the project repository.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -am 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a pull request.

## Questions
If you have any questions, please feel free to reach out to me at Grant.L.Williams@outlook.com. You can also check out my GitHub profile at [GrantLW100](GrantLW100).
