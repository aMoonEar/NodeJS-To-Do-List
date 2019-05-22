const express = require('express');
const bodyParser = require('body-parser');
const npm = require('npm');

const app = new express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var task = ["Buy socks", "Practice node.js"];
var complete = ["Study javascript"];

app.post('/addtask', (req, res) => {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
})


app.post('/removetask', (req,res) => {

    var completeTask = req.body.check;
    console.log(typeof completeTask);
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask),1);
    } else if (typeof completeTask === "object") {
        for (var i=0; i <completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]),1);
        };
    };

    res.redirect("/");
})

app.get('/', (req, res) => {
    res.render('index', {task: task, complete: complete});
})

app.listen();
