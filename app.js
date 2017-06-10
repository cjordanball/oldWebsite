const express = require('express');
const path = require('path');
const webpack = require('webpack');
var favicon = require('serve-favicon');
var expressControllers = require ('express-controller');
var byteController = require('./api/controllers/byteController');
require('events').EventEmitter.prototype._maxListeners = 100;

const app = express();

const static_path = path.join(__dirname, 'public');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(static_path));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('home');
})
app.get('/about', function(req, res){
    res.render('intro');
})
app.get('/bytebites', function(req, res){
    res.render('bytes');
})
app.get('/byte/:numStr', function(req, res) {
    var data = byteController.prepProblem(req.params.numStr);
    res.render('byteByte', data)
})
app.get('/sudoku', function(req, res) {
    res.sendFile('sudoku.html', {
        root: static_path
    });
})
app.get('/temp', function(req, res) {
    res.render('Joyous Noise');
})
app.get('/regex', function(req, res){
    res.render('regexoutline.ejs')
})
app.get('/closure', function(req, res){
    res.render('JSClosures.ejs')
})


app.listen(process.env.PORT || 3000, function (err) {
    if (err) console.log('Error: ', err);
    console.log('Listening at localhost:3000');
});
