const express = require('express');
const bodyParser = require('body-parser');
const {
    request
} = require('express');
const https = require('https');
const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, respond) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/2160cb5a04";
    const options = {
        method: "POST",
        auth: "senna1:bcbe5f227afb3a756a1d2ae02074284d-us6"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            //console.log(JSON.parse(data));
            appStatusCode = Number(response.statusCode);
            console.log(appStatusCode);
            if(200 === appStatusCode) {
            respond.sendFile(__dirname + "/success.html")
            } else {
            respond.sendFile(__dirname + "/failure.html")
            }

        })
    })
    //request.write(jsonData);
    request.end();

    // https.get(url, options, function(response){
    //     console.log(response.statusCode);
    // })
});


app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(port, function () {
    console.log(" Server running on PORT: " + port);
});

// url https://us{NUMER AT END OF API KEY}.api.mailchimp.com/3.0/lists/{LIST ID}
// API KEY
// bcbe5f227afb3a756a1d2ae02074284d-us6

// List ID
// 2160cb5a04