var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));


//Routes

app.get('/', function(req, res){
	res.render('search');
});

app.get('/results', function(req, res){
	var title = (req.query.title).replace(/ /g, "+");
	var apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=793712055a84b83ce568eafcd712f272&query=";
	var url = apiUrl + title;
	/*console.log(url);*/
	request(url, function(err, response, body){
		if(err){
			console.log(err);
		} else if(res.statusCode === 200){
			var body = JSON.parse(body);
			res.render("results", {body: body});
		}
	});
});

app.get('/results/:id', function(req, res){
	res.send("Result for an individual movie");
});

app.listen(3000, function(){
	console.log("Movie Search app has started.");
});