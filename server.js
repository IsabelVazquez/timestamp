const express = require('express');
const app = express();
const moment = require('moment');
var port = process.env.PORT;

//TBD: improve regex
var regex = new RegExp(/([0-9]){10}/);

//if there is no query, there should just be the homepage
app.route('/').get(function(req, res) {
      res.sendFile(process.cwd() + '/index.html');
});


app.get('/:query', function (req, res) {
  var string = req.params.query;
  
  if (regex.test(string) === true) {
    var time = moment.unix(string).format("MMMM DD, YYYY")
    return res.send(JSON.stringify({
      "unix" : string,
      "natural" : time
    }));
  }
  
  if (moment(string, "MMMM DD, YYYY").isValid() === true) {
    return res.send(JSON.stringify({
      // TBD: improve unix
      "unix" : moment(string, "MMMM DD, YYYY").unix(),
      "natural" : string
    }));
  }
  
  else {
    return res.send(JSON.stringify({
      "unix" : null,
      "natural" : null
    }));
  }
});

app.listen(port);
console.log("Server is listening on port " + port);
