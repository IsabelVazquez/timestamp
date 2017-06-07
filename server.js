const express = require('express');
const app = express();
const moment = require('moment');


app.get('/:query', function (req, res) {
  var string = req.params.query;
  res.send(JSON.stringify({
    "unix" : string,
    "natural" : string
  }));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})