var express = require("express");
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var connectionString =DATABASE_URL ||'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/blog';
var port = port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', "./views");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.get("/", function(req, res) {
    res.render("port");
});

app.get("/add", function(req, res) {
    pg.connect(DATABASE_URL, function(err, client, done) {
        client.query("select * from users", function(err, result) {
            res.render("add", {
                data: result.rows
            });
            console.log(result.rows);
            done();
            pg.end();
        })
    })
});

app.post("/users", function(req, res) {
    pg.connect(DATABASE_URL, function(err, client, done) {
        client.query(`insert into users (username) values('${req.body.username}')`, function(err, result) {
            res.redirect("/")
            console.log(`*****inserted '${req.body.username}'*****`);
            done();
            pg.end();
        })
    })
});

app.post("/blogposts", function(req, res) {
    pg.connect(DATABASE_URL, function(err, client, done) {
        client.query(`select * from users where username = '${req.body.name}'`, function(err, result) {
            console.log("supposed record: " + result.rows[0].id);
            var id = parseInt(result.rows[0].id);
            client.query(`insert into blogposts (title , body , user_id) values('${req.body.title}','${req.body.body}',${id})`, function(err, result) {
                res.redirect("/blogposts");
            })
            done();
            pg.end();
        })
    })
});

app.get("/blogposts", function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
        client.query(`select * from blogposts`, function(err, result) {
            res.render('posts', {
                data: result.rows
            });
            done();
            pg.end();
        })
    })
});
app.get("/blogposts/:id", function(req, res) {
    pg.connect(DATABASE_URL, function(err, client, done) {
        client.query(`select * from blogposts where id = ${req.params.id}`, function(err, result) {
            res.render('show', {
                data: result.rows[0].body
            });
            done();
            pg.end();
        })
    })
});


app.get("*", function(req, res) {
    res.redirect('/')
});

app.listen(port, function() {
    console.log("your app is listening on port 3000");
});
