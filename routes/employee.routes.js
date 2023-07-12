const express = require("express");
const controller = require("../controller/employee.controller");

const employeeRoute = express.Router();

employeeRoute.route("/add_details").post(controller.addDetails);
employeeRoute.route("/all_emp").get(controller.getEmployee);
employeeRoute.route("/").get(controller.getEmployeeById)

module.exports = employeeRoute;
