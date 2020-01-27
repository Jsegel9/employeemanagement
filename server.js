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
            choices: ["Enter New","View", "Update"] 
        }
    ]).then(function(res){
        console.log(res)
    })