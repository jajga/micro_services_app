const sql = require('./db.js');

//Task object constructor
const Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.createTask = function (newTask, result) {
    sql.query("INSERT INTO api_files set ?", newTask, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

module.exports= Task;