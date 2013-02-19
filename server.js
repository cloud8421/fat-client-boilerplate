var connect = require('connect');
var port = process.env.PORT || 5000;

connect.createServer(
  connect.static('dist')
).listen(port, function () {
  console.log('Static server started on port ' + port);
});
