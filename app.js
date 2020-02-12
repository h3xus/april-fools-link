var express = require('express')
var bodyParser = require('body-parser');
var app = express();
const fetch = require('node-fetch');

const arr = [
    {
        "url":"https://en.wikipedia.org/wiki/Self-reconfiguring_modular_robot"
    },
    {
        "url": "https://www.machinedesign.com/mechanical-motion-systems/article/21835642/getting-noisy-encoders-under-control"
    }
]
var yok;
const targetUrl = 'https://www.machinedesign.com/mechanical-motion-systems/article/21835642/getting-noisy-encoders-under-control';

console.log('\033[2J');
var getJoke = function (req) {
    fetch('https://api.yomomma.info/')
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
            console.log(data);
            yok = data
        });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
};
getJoke();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
    getJoke();
    var name = 'hello';
    console.log(yok);
    res.render(__dirname + "/index", { name: yok.joke, target: targetUrl });
});

app.listen(3000);