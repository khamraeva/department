class Department {
	constructor({ managers = [] }) {
		this.managers = managers;
	}
	addManager(manager) {
		this.managers.push(manager);
	}
	giveSalary() {
		for (let i = 0; i < this.managers.length; i++) {
			const manager = this.managers[i];
			for (let j = 0; j < manager.teamMembers.length; j++) {
				const employee = manager.teamMembers[j];
				console.log(`${employee.firstName} ${employee.lastName}: got salary: ${employee.getSalaryWithBonus()}`);
			}
		}
	}
}
class Employee {
	constructor({ firstName, lastName, salary, experience, manager }) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.experience = experience;
		this.manager = manager;
		this.salary = salary;
	}
	getSalaryWithBonus() {
		if (this.experience > 2) {
			return this.salary + 200;
		} else if (this.experience > 5) {
			return this.salary * 1.2 + 500;
		} else {
			return this.salary;
		}
	}
	toString() {
		return `${this.firstName} ${this.lastName}, manager: ${this.manager.lastName}, experience: ${this.experience}`;
	}
	addManager(manager) {
		this.manager = manager;
	}
}

class Designer extends Employee {
	constructor(params) {
		super(params);
		const { effCoeff } = params;
		this.effCoeff = effCoeff;
	}
	getSalaryWithBonus() {
		const basicSalary = super.getSalaryWithBonus();
		return basicSalary * this.effCoeff;
	}
}
class Developer extends Employee {
	constructor(params) {
		super(params);
	}
}
class Manager extends Employee {
	constructor(params) {
		super(params);
		const { teamMembers = [] } = params;
		this.teamMembers = teamMembers;
	}
	addTeamMember(teamMember) {
		this.teamMembers.push(teamMember);
	}
	getSalaryWithBonus() {
		const basicSalary = super.getSalaryWithBonus();
		let salaryWithBonus = basicSalary;
		if (this.teamMembers.length > 5) {
			salaryWithBonus += 200;
		} else if (this.teamMembers.length > 10) {
			salaryWithBonus += 300;
		}
		let devs = 0;
		for (let i = 0; i < this.teamMembers.length; i++) {
			if (this.teamMembers[i] instanceof Developer) {
				devs += 1;
			}
		}
		if (devs > (this.teamMembers.length / 2)) {
			salaryWithBonus = Math.round(salaryWithBonus * 1.1);
		}
		return salaryWithBonus;
	}
}

module.exports = { Developer, Designer, Manager, Department };
