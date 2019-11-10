const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const app = express();
const { Designer, Manager, Developer, Department } = require('./lib/department');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const employees = [];
const managers = [];

app.get('/api/v1/employees', (req, res, next) => {
  res.send(employees);
});

app.post('/api/v1/employees', (req, res, next) => {
	let employee;
	if (req.body.type === 'designer') {
		employee = new Designer(req.body);
	} else if (req.body.type === 'developer') {
		employee = new Developer(req.body);
	} else {
		return res.status(400).end();
	}
	employees.push(employee);
	employee.id = employees.length - 1;
	res.send(employee);
});

app.get('/api/v1/employees/:id', (req, res, next) => {
  const id = req.params.id;
  const employee = employees.find(e => e.id == id);
  if (!employee) {
    return res.status(404).end();
  }
  employee.salary = employee.getSalaryWithBonus();
  res.send(employee);
});

app.get('/api/v1/managers', (req, res, next) => {
  const managersWithoutTeams = managers.map(m => {
    return {
      ...m,
      teamMembers: undefined,
    };
  });
  res.send(managersWithoutTeams);
});

app.post('/api/v1/managers', (req, res, next) => {
	let manager = new Manager(req.body);
  req.body.type === 'manager';
	if (!manager) {
		return res.status(404).end();
	}
	managers.push(manager);
	manager.id = managers.length - 1;
  manager.salary = manager.getSalaryWithBonus();
	res.send(manager);
});

app.get('/api/v1/managers/:id', (req, res, next) => {
  const id = req.params.id;
  const manager = managers.find(e => e.id == id);
  if (!manager) {
    return res.status(404).end();
  }
  const managerWithoutTeam = {
    ...manager,
    teamMembers: undefined,
  };
  res.send(managerWithoutTeam);
});

app.get('/api/v1/managers/:id/team', (req, res, next) => {
  const managerId = req.params.id;
  const manager = managers.find(e => e.id == managerId);
  if (!manager) {
    return res.status(404).end();
  }
  res.send(manager.teamMembers);
});

app.post('/api/v1/managers/:id/team', (req, res, next) => {
  const employeeId = req.body.employee_id;
  const managerId = req.params.id;
  const manager = managers.find(e => e.id == managerId);
  const team = manager.addTeamMember(employees[employeeId]);
	res.send(manager.teamMembers);
});

app.listen(port);
console.log(`listening on port ${port}`);
