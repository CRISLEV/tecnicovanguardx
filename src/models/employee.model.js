let employees = require('../data/employees.json')
const filename = 'employees.json'
const helper = require('../helpers/helper.js')
const axios = require("axios");
const res = require('express/lib/response');

initEmployees();

async function initEmployees() {
    try {
        const response = await axios("https://dummy.restapiexample.com/api/v1/employees");
        let employeesLst = response.data.data
        let baseList = [];
        let id = 1;
        for (let employee of employeesLst) {
            let newEmployee = {
                "id": id,
                "name": employee.employee_name,
                "salary": employee.employee_salary,
                "age": employee.employee_age,
                "date_time_created": helper.newDate(),
            };
            id++;
            baseList.push(newEmployee)
        }
        employees = baseList;
        helper.saveData(process.cwd() + "/src/data/" + filename, baseList)
        console.log("Setting default data");

    } catch (err) {
        initEmployees()
        console.log(err.message);
    }
}


function getEmployees() {
    return new Promise((resolve, reject) => {
        if (employees.length === 0) {
            reject({
                message: 'no employees found',
                status: 202
            })
        }

        resolve(employees)
    })
}

function getEmployee(id) {
    return new Promise((resolve, reject) => {
        helper.validateArray(employees, id)
            .then(employee => resolve(employee))
            .catch(err => reject(err))
    })
}

function insertEmployee(newEmployee) {
    return new Promise((resolve, reject) => {
        newEmployee.id = helper.getNewId(employees);
        newEmployee.date_time_created = helper.newDate();
        employees.push(newEmployee)

        helper.saveData(filename, employees)
        resolve(newEmployee)
    })
}

function updateEmployee(id, newEmployee) {
    return new Promise((resolve, reject) => {
        helper.validateArray(employees, id)
            .then(employee => {
                const index = employees.findIndex(p => p.id == employee.id)
                id = { id: employee.id }
                newEmployee.id = helper.getNewId(employees);
                newEmployee.date_time_created = helper.newDate();
                helper.saveData(filename, employees)
                resolve(employees[index])
            })
            .catch(err => reject(err))
    })
}

function deleteEmployee(id) {
    return new Promise((resolve, reject) => {
        helper.validateArray(employees, id)
            .then(() => {
                resolve()
            })
            .catch(err => {
                employees = employees.filter(p => p.id !== id)
                helper.saveData(filename, employees)
                reject();
            })
    })
}

module.exports = { insertEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee, initEmployees }