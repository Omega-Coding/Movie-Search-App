var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
var PORT = process.env.PORT || 3000;


//Routes

app.get('/', function(req, res){
	res.render('search');
});

app.get('/results', function(req, res){
	//Search URL
	var title = (req.query.title).replace(/ /g, "+");
	var apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=793712055a84b83ce568eafcd712f272&query=";
	var url = apiUrl + title;
	
	//Backdrop Image url
	var base_url = "http://image.tmdb.org/t/p/";
	var size = "w185";

	//HTTP request to API
	request(url, function(err, response, body){
		if(err){
			console.log(err);
		} else if(res.statusCode === 200){
			var body = JSON.parse(body);
			var img_url = base_url + size; /*body.results[0]["backdrop_path"]*/
			/*console.log(img_url);*/
			res.render("results", {body: body, img_url: img_url});
		}
	});
});

app.get('/results/:id', function(req, res){
	var api = "?api_key=793712055a84b83ce568eafcd712f272";
	var url = "https://api.themoviedb.org/3/movie/"+req.params.id+api;
	
	request(url, function(err, response, body){
		if(err) {
			console.log(err);
		} else if(res.statusCode === 200) {
			var data = JSON.parse(body);
			var img_url = "http://image.tmdb.org/t/p/w342" + data["poster_path"];
			res.render("details", {movie: data, img_url: img_url});
		}
	});
});

app.listen(PORT, function(){
	console.log("Movie Search app has started.");
});