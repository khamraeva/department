const jasmine = require('jasmine');

describe("Department salary", function() {
	let salaryWithBonus;
	const employees = [];
	const { Designer, Manager, Developer } = require('../../hwork');

	describe("Designer with less expirience", function() {
		beforeEach(function() {
	    const petya = new Designer({
				firstName: 'petya',
				lastName: 'ivanov',
				experience: 1,
				salary: 500,
				effCoeff: 0.1,
			});
			salaryWithBonus = petya.getSalaryWithBonus();
			employees.push(petya);
	  });

	  it("should return correct salary with coef", function() {
			expect(typeof salaryWithBonus).toEqual('number');
	    expect(salaryWithBonus).toEqual(50);
	  });
	});

	describe("Designer with middle expirience", function() {
		beforeEach(function() {
	    const vasya = new Designer({
				firstName: 'vasya',
				lastName: 'petrov',
				experience: 3,
				salary: 500,
				effCoeff: 0.5,
			});
			salaryWithBonus = vasya.getSalaryWithBonus();
			employees.push(vasya);
	  });

	  it("should return correct salary with coef", function() {
			expect(typeof salaryWithBonus).toEqual('number');
	    expect(salaryWithBonus).toEqual(350);
		 });
	});

	describe("Designer with huge expirience", function() {
		beforeEach(function() {
			const george = new Designer({
				firstName: 'george',
				lastName: 'sidorov',
				experience: 10,
				salary: 500,
				effCoeff: 1,
			});
			salaryWithBonus = george.getSalaryWithBonus();
			employees.push(george);
		});

		it("should return correct salary with coef", function() {
			expect(typeof salaryWithBonus).toEqual('number');
			expect(salaryWithBonus).toEqual(700);
		 });
	});

	describe("Developer with big expirience", function() {
		beforeEach(function() {
			const john = new Developer({
				firstName: 'john',
				lastName: 'johnson',
				experience: 6,
				salary: 1000,
			});
			salaryWithBonus = john.getSalaryWithBonus();
			employees.push(john);
		});

		it("should return correct salary", function() {
			expect(typeof salaryWithBonus).toEqual('number');
			expect(salaryWithBonus).toEqual(1200);
		 });
	});

	describe("Developer with less expirience", function() {
		beforeEach(function() {
			const steve = new Developer({
				firstName: 'steve',
				lastName: 'stevenson',
				experience: 1,
				salary: 500,
			});
			salaryWithBonus = steve.getSalaryWithBonus();
			employees.push(steve);
		});

		it("should return correct salary", function() {
			expect(typeof salaryWithBonus).toEqual('number');
			expect(salaryWithBonus).toEqual(500);
		});
	});

	describe("Manager with small team and big expirience", function() {
		let valya;
		beforeEach(function() {
			valya = new Manager({
				firstName: 'valya',
				lastName: 'sharaeva',
				experience: 6,
				salary: 500,
				teamMembers: employees,
			});
			salaryWithBonus = valya.getSalaryWithBonus();
		});

		it("should return correct salary with bonus", function() {
			expect(typeof salaryWithBonus).toEqual('number');
			expect(salaryWithBonus).toEqual(700);
		});

		describe("Manager with bigger team", function() {
			beforeEach(function() {
				const stanly = new Developer({
					firstName: 'stanly',
					lastName: 'lee',
					experience: 3,
					salary: 600,
				});
				const joe = new Developer({
					firstName: 'joe',
					lastName: 'carry',
					experience: 7,
					salary: 1000,
				});
				valya.addTeamMember(stanly);
				valya.addTeamMember(joe);
				salaryWithBonus = valya.getSalaryWithBonus();
			});

			it("should return correct salary with bonus", function() {
				expect(typeof salaryWithBonus).toEqual('number');
				expect(salaryWithBonus).toEqual(990);
			});
		});
	});
});
