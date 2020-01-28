const inquirer = require("inquirer");
const mysql = require("mysql2");
// const cTable = require("console.table");
const connection = require("./config/connection");

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
    })
    function enterNew(){
        console.log("entering")
        inquirer
        .prompt([{
            type: "list",
            name: "enterWhat",
            message: "What Would you like to enter?",
            choices: ["Role", "Department", "Employee"]
        }]).then(function(res){
            if (res.enterWhat === "Role"){
                enterRole();
            } else if (res.enterWhat === "Department"){
                enterDepartment();
            } else{
                enterEmployee();
            }
        })
    }

function enterRole(){
        console.log("Entering Role")
    }

function enterDepartment(){
    console.log("Entering Department")
}

function enterEmployee(){
    console.log("Entering Employee")
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