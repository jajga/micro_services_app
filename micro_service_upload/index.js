const express = require('express');
const fetch = require('node-fetch');
const bluebird = require('bluebird');
const cors = require('cors');
const bodyParser = require('body-parser');

var multer  = require('multer');
var upload = multer({ dest: 'upload/'});
const fs = require('fs');
var type = upload.single('recfile');
var Task = require('./models/appModel.js');


const app = express();
app.use(cors());
app.use(bodyParser.json());


fetch.Promise = bluebird;

const port = 3000;



const addFileToDb = (req,res) => {
    const postData = {
        mobile:req.param('key'),
        create_date: new Date(),
        file_path:req.target_path
    }
    console.log('PostData attachment',postData);
    Task.createTask(postData, function(err, task) {

        if (err)
            res.status(400).send(err);
        res.json(task);
    })
}

app.post('/api/add_attachment/:key', upload.array('fileUpload', 12), function (req,res) {

    /** When using the "single"
     data come in "req.file" regardless of the attribute "name". **/
        //console.log('attachment :',req.files);
    var src , dest , filePaths = [],temp_filepaths = [];
    for(var i=0;i<req.files.length;i++){
        var tmp_path = req.files[i].path;

        /** The original name of the uploaded file
         stored in the variable "originalname". **/
        var target_path = 'uploads/' + req.files[i].originalname;
        req.target_path = target_path;
        req.tempfile_path = tmp_path;
        req.issueKey = req.params.key;
        filePaths.push(target_path)
        temp_filepaths.push(tmp_path)
        /** A better way to copy the uploaded file. **/
        src = fs.createReadStream(tmp_path);
        dest = fs.createWriteStream(target_path);
        src.pipe(dest);


    }
    req.filePaths = filePaths;
    req.temp_filepaths = temp_filepaths;
    // src.pipe(dest);

    src.on('end', function() {
        //console.log('Destination ----',dest);
        //addAttachment(req)
        //res.send(addAttachment(req))
        addFileToDb(req,res);
        //res.status(200).send({'rescode':1,'msg':'File uploaded successfully'})
    });
    src.on('error', function(err) {
        console.log('err',err);
        res.send({fileupload:'error'});
    });

    // src.on('error', function(err) { res.send({fileupload:'error'}); });

});




app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
})


//app.get('/api/file',addFile)


module.exports = app;