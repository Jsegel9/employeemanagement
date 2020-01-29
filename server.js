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
    })
}


function view(){
        console.log("viewing")
    }

function update(){
        console.log("updating")
    }

function quit(){
    process.exit();
}

startApp();