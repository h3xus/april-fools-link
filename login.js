var path = require('path');
var userName = process.env['USERPROFILE'].split(path.sep)[2];
var loginId = path.join("domainName", userName);
console.log('\033[2J');
console.log(userName);