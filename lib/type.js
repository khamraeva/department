"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Department = /** @class */ (function () {
    function Department(managers) {
        this.managers = managers;
        this.managers = managers;
    }
    Department.prototype.addManager = function (manager) {
        this.managers.push(manager);
    };
    Department.prototype.giveSalary = function () {
        for (var i = 0; i < this.managers.length; i++) {
            var manager = this.managers[i];
            for (var j = 0; j < manager.teamMembers.length; j++) {
                var employee = manager.teamMembers[j];
                console.log(employee.firstName + " " + employee.lastName + ": got salary: " + employee.getSalaryWithBonus());
            }
        }
    };
    return Department;
}());
var Employee = /** @class */ (function () {
    function Employee(firstName, lastName, salary, experience, manager) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.experience = experience;
        this.manager = manager;
    }
    Employee.prototype.getSalaryWithBonus = function () {
        if (this.experience > 2) {
            return this.salary + 200;
        }
        else if (this.experience > 5) {
            return this.salary * 1.2 + 500;
        }
        else {
            return this.salary;
        }
    };
    Employee.prototype.toString = function () {
        return this.firstName + " " + this.lastName + ", manager: " + this.manager.lastName + ", experience: " + this.experience;
    };
    Employee.prototype.addManager = function (manager) {
        this.manager = manager;
    };
    return Employee;
}());
var Designer = /** @class */ (function (_super) {
    __extends(Designer, _super);
    function Designer(firstName, lastName, salary, experience, manager, effCoeff) {
        var _this = _super.call(this, firstName, lastName, salary, experience, manager) || this;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.salary = salary;
        _this.experience = experience;
        _this.manager = manager;
        _this.effCoeff = effCoeff;
        _this.type = 'designer';
        return _this;
    }
    Designer.prototype.getSalaryWithBonus = function () {
        var basicSalary = _super.prototype.getSalaryWithBonus.call(this);
        return basicSalary * this.effCoeff;
    };
    return Designer;
}(Employee));
var Developer = /** @class */ (function (_super) {
    __extends(Developer, _super);
    function Developer(firstName, lastName, salary, experience, manager) {
        var _this = _super.call(this, firstName, lastName, salary, experience, manager) || this;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.salary = salary;
        _this.experience = experience;
        _this.manager = manager;
        _this.type = 'developer';
        return _this;
    }
    return Developer;
}(Employee));
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(firstName, lastName, salary, experience, manager, teamMembers) {
        var _this = _super.call(this, firstName, lastName, salary, experience, manager) || this;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.salary = salary;
        _this.experience = experience;
        _this.manager = manager;
        _this.teamMembers = teamMembers;
        return _this;
    }
    Manager.prototype.addTeamMember = function (teamMember) {
        this.teamMembers.push(teamMember);
    };
    Manager.prototype.getSalaryWithBonus = function () {
        var basicSalary = _super.prototype.getSalaryWithBonus.call(this);
        var salaryWithBonus = basicSalary;
        if (this.teamMembers.length > 5) {
            salaryWithBonus += 200;
        }
        else if (this.teamMembers.length > 10) {
            salaryWithBonus += 300;
        }
        var devs = 0;
        for (var i = 0; i < this.teamMembers.length; i++) {
            if (this.teamMembers[i] instanceof Developer) {
                devs += 1;
            }
        }
        if (devs > (this.teamMembers.length / 2)) {
            salaryWithBonus = Math.round(salaryWithBonus * 1.1);
        }
        return salaryWithBonus;
    };
    return Manager;
}(Employee));
module.exports = { Developer: Developer, Designer: Designer, Manager: Manager, Department: Department };
