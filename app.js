//* Dependencies
const
    http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser');
 
const sqlite3 = require('sqlite3').verbose();

//* Middleware
const app = express();
app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//! Database SQL
const db = new sqlite3.Database(':memory:');
db.serialize(function () {
 db.run("CREATE TABLE user (username TEXT, password TEXT, title TEXT)");
 db.run("INSERT INTO user VALUES ('privilegedUser', 'privilegedUser1', 'Administrator')");
});

//* ROOT
app.get('/', (req, res) => {
    res.sendFile('index.html')
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let query = "SELECT title FROM user where username = '" + username + "' and password = '" + password + "'";

    console.log("username: " + username);
	console.log("password: " + password);
    console.log('query: ' + query);
    
    
})

app.listen(3000)