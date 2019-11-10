class Department {
	constructor(public managers: Manager[]) {
		this.managers = managers;
	}
	addManager(manager: Manager): void {
		this.managers.push(manager);
	}
	giveSalary(): void {
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

	constructor (
		public firstName: string,
		public lastName: string,
		public salary: number,
		public experience: number,
		public manager: Manager
	) {
	}

	getSalaryWithBonus(): number {
		if (this.experience > 2) {
			return this.salary + 200;
		} else if (this.experience > 5) {
			return this.salary * 1.2 + 500;
		} else {
			return this.salary;
		}
	}

	toString(): string {
		return `${this.firstName} ${this.lastName}, manager: ${this.manager.lastName}, experience: ${this.experience}`;
	}

	addManager(manager: Manager): void {
		this.manager = manager;
	}
}

class Designer extends Employee {
	public readonly type: string = 'designer';

	constructor(
		public firstName: string,
		public lastName: string,
		public salary: number,
		public experience: number,
		public manager: Manager,
		public effCoeff: number
	) {
		super(firstName, lastName, salary, experience, manager);
	}
	getSalaryWithBonus(): number {
		const basicSalary = super.getSalaryWithBonus();
		return basicSalary * this.effCoeff;
	}
}

class Developer extends Employee {
	public readonly type: string = 'developer';

	constructor(
		public firstName: string,
		public lastName: string,
		public salary: number,
		public experience: number,
		public manager: Manager
	) {
		super(firstName, lastName, salary, experience, manager);
	}
}

class Manager extends Employee {
	constructor(
		public firstName: string,
		public lastName: string,
		public salary: number,
		public experience: number,
		public manager: Manager,
		public teamMembers: Employee[]
	) {
		super(firstName, lastName, salary, experience, manager);
	}

	addTeamMember(teamMember: Employee): void {
		this.teamMembers.push(teamMember);
	}

	getSalaryWithBonus(): number {
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
export = { Developer, Designer, Manager, Department };
