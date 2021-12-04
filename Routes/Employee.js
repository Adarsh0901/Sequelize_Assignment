const express = require('express')
const router = express();
const db = require('../config/database');
const { sequelize } = require('../models/Employee');
const Employee = require('../models/Employee');
const Reward = require('../models/Reward');
const {Op} = require('sequelize');

Employee.hasMany(Reward);

// db.sync().then((result) => {console.log(result);}).catch((err) => {console.log(err);})

router.get('/', async(req,res) => {
    try {
        const data = await Employee.findAll();
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Display all the values of the “First_Name” column using the alias “Employee Name”
router.get('/question1', async(req,res) => {
    try {
        const data = await Employee.findAll({
            attributes:[['first_name','Employee Name']]
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get all “Last_Name” in lowercase.
router.get('/question2', async(req,res) => {
    try {
        const data = await Employee.findAll({
            attributes:[[sequelize.fn('Lower', sequelize.col('last_name')),'Last name']]
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get unique “DEPARTMENT”.
router.get('/question3', async(req,res) => {
    try {
        const data = await Employee.findAll({
            attributes:[[sequelize.fn('Distinct', sequelize.col('department')),'Department']]
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get the employee’s first name after replacing ‘o’ with ‘#’.
router.get('/question4', async(req,res) => {
    try {
        const data = await Employee.findAll({
            attributes:[[sequelize.fn('Replace', sequelize.col('first_name'),'o','#'),'Department']]
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get all employees in ascending order by first name and descending order by salary.
router.get('/question5', async(req,res) => {
    try {
        const data = await Employee.findAll({
            order:[['first_name','ASC'],['salary','DESC']]
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get employees whose first name is neither “Bob” nor “Alex”.
router.get('/question6', async(req,res) => {
    try {
        const data = await Employee.findAll({
            where: {[Op.and]:[{'first_name': {[Op.ne]:'bob'}},{'first_name': {[Op.ne]:'Alex'}}]}
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get all the details about employees whose joining year is “2019”.
router.get('/question7', async(req,res) => {
    try {
        const data = await Employee.findAll({
            where: [sequelize.where(sequelize.fn('Year',sequelize.col('joining_date')), '2019')]
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get all the details of the employees who joined before March 1, 2019
router.get('/question8', async(req,res) => {
    try {
        const data = await Employee.findAll({
            where: [sequelize.where(sequelize.fn('Month',sequelize.col('joining_date')),{[Op.lt]: '03'})]
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get the employee’s department and total salary, grouped by department.
router.get('/question10', async(req,res) => {
    try {
        const data = await Employee.findAll({
            attributes: ['department',[sequelize.fn('sum',sequelize.col('salary')),'Salary']],
            group: 'Department'
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get the average salary by department in ascending order of salary.
router.get('/question11', async(req,res) => {
    try {
        const data = await Employee.findAll({
            attributes: [[sequelize.fn('avg',sequelize.col('salary')),'Salary'],'Department'],
            group: 'Department',
            order: [[sequelize.fn('avg',sequelize.col('salary')),'ASC']]
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get the maximum salary by department in ascending order of salary.
router.get('/question12', async(req,res) => {
    try {
        const data = await Employee.findAll({
            attributes: ['department',[sequelize.fn('max',sequelize.col('salary')),'Salary']],
            group: 'Department',
            order: [[sequelize.fn('max',sequelize.col('salary')),'ASC']]
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get the department and total salary grouped by the department, where the total salary is greater than 1,000,000, and sorted in descending order of the total salary.
router.get('/question13', async(req,res) => {
    try {
        const data = await Employee.findAll({
            attributes: ['department',[sequelize.fn('sum',sequelize.col('salary')),'Salary']],
            group: 'Department',
            having: [sequelize.where(sequelize.fn('sum',sequelize.col('salary')),{[Op.gt]: '1000000'})],
            order: [[sequelize.fn('sum',sequelize.col('salary')),'DESC']]
        });
        res.send(data);
    } catch (err) {
        res.send("err");
    }
});

//Get the IDs of employees who did not receive rewards without using subqueries?
router.get('/question14', async(req,res) => {
    try {
        const data = await Employee.findAll({
            attributes: ['id'],
            include : [{model: Reward}],
            where: {'$Rewards.date_reward$': null}
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

//Get the first name, the reward amount for employees even if they did not receive any rewards, and set a reward amount equal to 0 for the employees who did not receive rewards.
router.get('/question15', async(req,res) => {
    try {
        const data = await Employee.findAll({
            attributes: ['first_name'],
            include : [{model: Reward, attributes: [[sequelize.fn('COALESCE',sequelize.col('amount'),'null'),'amount']]}],
        });
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;