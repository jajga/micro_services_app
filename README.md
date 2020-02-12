# Micro Service Upload

### Quick start 

```bash
# clone  repo
$ git clone https://github.com/jajga/micro_services_app.git

# change directory to your app
$ cd micro_services_app

# change db details in
$ cd micro_services_app/models/db.js

# run docker compose
$ docker-compose up -d

# Verify by checking with postman 
localhost:3000/api/add_attachment/844XXXXXXXX
body :
form-data type : file
key - fileUpload 
```
