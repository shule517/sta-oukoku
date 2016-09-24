var express = require('express'), app = express();
var path = express.static(__dirname + '/dist');
var port = 3000;
app.use(path);
app.listen(port);
console.log('server starting:' + port);
