const express = require("express");
const controller = require("../controller/employee.controller");

const employeeRoute = express.Router();

employeeRoute.route("/add_details").post(controller.addDetails);
employeeRoute.route("/all_emp").get(controller.getEmployee);
employeeRoute.route("/").post(controller.getEmployeeById)
employeeRoute
	.route("/deleteEmployee")
	.post(controller.deleteEmployeeById);
    employeeRoute.route("/update_Employee").put(controller.updateEmployeeById)

module.exports = employeeRoute;
