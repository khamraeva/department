const jasmine = require('jasmine');

describe("Department salary", function() {
	let salaryWithBonus;
	const employees = [];
	const { Designer, Manager, Developer } = require('../../lib/type');

	describe("Designer with less expirience", function() {
		beforeEach(function() {
	    const petya = new Designer('petya', 'ivanov', 500, 1, null, 0.1);
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
	    const vasya = new Designer('vasya', 'petrov', 500, 3, null, 0.5);
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
			const george = new Designer('george', 'sidorov', 500, 10, null, 1);
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
			const john = new Developer('john', 'johnson', 1000, 6);
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
			const steve = new Developer('steve', 'stevenson', 500, 1);
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
			valya = new Manager('valya', 'sharaeva', 500, 6, null, employees);
			salaryWithBonus = valya.getSalaryWithBonus();
		});

		it("should return correct salary with bonus", function() {
			expect(typeof salaryWithBonus).toEqual('number');
			expect(salaryWithBonus).toEqual(700);
		});

		describe("Manager with bigger team", function() {
			beforeEach(function() {
				const stanly = new Developer('stanly', 'lee', 600, 4);
				const joe = new Developer('joe', 'carry', 1000, 7);
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
