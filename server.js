const express = require('express');
const app = express();
const moment = require('moment');
var regex = new RegExp(/^[0-9]+$/);

app.get('/:query', function (req, res) {
  var string = req.params.query;

  if (regex.test(string) === true) {
    var time = moment.unix(string).format("MMMM DD, YYYY")
    res.send(JSON.stringify({
    "unix" : string,
    "natural" : time
    }));
  }
  
  if (moment(string, "MMMM DD, YYYY").isValid() === true) {
    res.send(JSON.stringify({
      "unix" : moment(string, "MMMM DD, YYYY").unix(),
      "natural" : string
    }));  
  }
  
  else {
    res.send(JSON.stringify({
      "unix" : null,
      "natural" : null
    })); 
  }
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})