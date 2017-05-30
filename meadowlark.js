/**
 * Created by huiminliu on 2017/5/30.
 */
var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();



// 设置handlebars视图引擎
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
   res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
   next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
   res.render('home');
});

app.get('/about', function(req, res){
    res.render('about', { fortune : fortune.getFortune(), pageTestScript : '/qa/tests-about.js'});
});

app.get('/tours/hood-river', function(req, res){
   res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req, res) {
   res.render('tours/request-group-rate');
});

// 404 catch-all handler(middleware)
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

// 500 internal server error(middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + ';press Ctrl-C to terminate.');
});