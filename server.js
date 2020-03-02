const inquirer = require("inquirer");
const mysql = require("mysql2");
// const cTable = require("console.table");
const connection = require("./config/connection");


function startApp(){
inquirer
    .prompt([
        {
            type: "list",
            name: "start",
            message: "Welcome to the Employee Management System, what would you like to do?",
            choices: ["Enter New","View", "Update", "Quit"] 
        }
    ]).then(function(res){
        console.log(res.start)
        if(res.start === "Enter New"){
            enterNew();
        }
        else if(res.start === "View"){
            view();
        }
        else if(res.start === "Update"){
            update();
        } else {
            quit();
        }
    })}
    function enterNew(){
        console.log("entering")
        inquirer
        .prompt([{
            type: "list",
            name: "enterWhat",
            message: "What Would you like to enter?",
            choices: ["Role", "Department", "Employee", "Return Home", "Quit"]
        }]).then(function(res){
            if (res.enterWhat === "Role"){
                enterRole();
            } else if (res.enterWhat === "Department"){
                enterDepartment();
            } else if(res.enterWhat === "Employee"){
                enterEmployee();
            } else if(res.enterWhat === "Return Home"){
                startApp();
            } else {
                quit();
            }
        })
    }

function enterRole(){
        
        inquirer
        .prompt([{
            type: "input",
            name: "roleTitle",
            message: "Please enter the title of the role"
        },{
            type: "input",
            name: "salary",
            message: "Please enter the role's salary"
        },{
            type: "input",
            name: "deptId",
            message: "Please enter the department ID associated with the role"
        }
    ]).then(function(res){
        console.log(res)
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: res.roleTitle,
                salary: res.salary,
                department_id: res.deptId
            },
            function (err){
                if (err) throw (err)
                console.log("Your Role was entered")
                startOrQuit();
            }
        )
    })
    }

function enterDepartment(){
    inquirer
    .prompt([
        {
            type: "input",
            name: "deptName",
            message: "Please enter the department name"
        }
    ]).then(function(res){
        console.log(res)
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.deptName
            },
            function(err){
                if (err) throw (err)
                console.log("Your Department was entered")
                startOrQuit();
            }
        )
    })
}

function enterEmployee(){
    inquirer
    .prompt([
        {
            type: "input",
            name: "empFirst",
            message: "Please enter the employee's first name"
        },
        {
            type: "input",
            name: "empLast",
            message: "Please enter the employee's last name"
        },
        {
            type: "input",
            name: "roleId",
            message: "Please enter the Role ID # associated with this employee's role"
        },
        {
            type: "input",
            name: "empMgr",
            message: "Please enter the ID # for this employee's manager"
        }
    ]).then(function(res){
        console.log(res)
        connection.query(
            "INSERT INTO employee SET ?", 
            {
                first_name: res.empFirst,
                last_name: res.empLast,
                role_id: res.roleId,
                manager_id: res.empMgr
            },
            function(err){
                if (err) throw (err)
                console.log("Your Employee Was Entered")
                startOrQuit();
            }
        )
    })
}


function view(){
        inquirer
        .prompt([
            {
                type: "list",
            name: "viewWhat",
            message: "What would you like to view?",
            choices: [
                "Employees",
                "Roles",
                "Departments"
            ]
            }
        ])
        .then(function(res){
            if (res.viewWhat === "Employees"){
                viewEmployees();
            }else if (res.viewWhat === "Roles"){
                viewRoles();
            }else if (res.viewWhat === "Departments"){
                viewDepts();
            }
        })
    }

function update(){
    inquirer
    .prompt([
        {
            type: "list",
            name: "updateWhat",
            message: "What would you like to update?",
            choices: [
                "Employees",
                "Roles",
                "Departments"
            ]
        }
    ])
    .then(function(res){
        if (res.updateWhat === "Employees"){
            updateEmployees();
        }else if(res.updateWhat === "Roles"){
            updateRoles();
        }else if(res.updateWhat === "Departments"){
            updateDepts();
        }
    })
    }

function quit(){
    process.exit();
}

function startOrQuit(){
    inquirer
    .prompt([
        {
            type: "list",
            name: "startorquit",
            message: "What Would you like to do next?",
            choices: [
                "Return Home",
                "Quit"
            ]
        }
    ])
    .then(function(res){
        if(res.startorquit === "Return Home"){
            startApp();
        }else{
            quit();
        }
    })
}

function viewEmployees(){
    console.log("Viewing Emps")
    connection.query(
        "SELECT * FROM employee", function(err, results){
            if (err) throw (err)
            console.log(results)
        }
    )
}

function viewRoles(){
    console.log("Viewing Roles")
    connection.query(
        "SELECT * FROM role", function(err,results){
            if (err) throw (err)
            console.log(results)
        }
    )
}

function viewDepts(){
    console.log("Viewing Depts")
    connection.query(
        "SELECT * FROM department", function(err, results){
            if (err) throw (err)
            console.log(results)
        }
    )
}

function updateEmployees(){
    console.log("Updating Emps")
    connection.query(
        "SELECT * from employee", function(err, results){
            if (err) throw (err);
            inquirer
            .prompt([
                {
                    type: "list",
                    name: "choice",
                    message: "Which employee ID # would you like to update?",
                    choices: function(){
                        var choiceArray = [];
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].id)                            
                        }
                        return choiceArray;
                    }
                }
            ])
        }
    )
}

function updateRoles(){
    console.log("Updating Roles")
}

function updateDepts(){
    console.log("Updating Depts")
}

startApp();