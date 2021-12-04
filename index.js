const express = require('express');
const PORT = process.env.PORT || 5000
const app = express();
const db = require('./config/database')



app.get('/', (req,res) => {res.send('Hello')});

app.use('/employee', require('./Routes/Employee'));


// authenticate whether databse connected or not
db.authenticate()
    .then(() => {console.log("Databse connected");})
    .catch(err => {console.log('err: '+ err);})

app.listen(PORT, console.log(`Server running on port ${PORT}`));