//imports
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();

//template engine
app.engine('handlebars',handlebars.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');


//Routes and templates
app.get("/:id?",function(req,res){
    res.render('index');
    // console.log(req.params.id);
});
//rota para o arquivo javascript
app.get("principal",function(req,res){
    res.sendFile(__dirname+'/js/principal.js');
});
//rota para o arquivo css
app.get("principal",function(req,res){
    res.sendFile(__dirname+'/css/style.css');
});
//Start server
app.listen(3000,function(req,res){
    console.log('Servidor está rodando');
});