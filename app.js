//imports
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const urlencodeParser = bodyParser.urlencoded({extended:false});

//conecção com o banco de dados MYSQL
const sql = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'DSAcurso',
    port:3306
});
sql.query("use api_pcr");

//template engine
app.engine('handlebars',handlebars.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');



//Routes and templates
//arquivo index
app.get("/",function(req,res){
    res.render('index');
    // console.log(req.params.id);
});
//arquivo inserir
app.get("/inserir",function(req,res){res.render('inserir');});
app.post("/controllerForm",urlencodeParser,function(req,res){
    sql.query("insert into pessoas values(?,?)",[req.body.id,req.body.nome]);
    res.render("controllerForm",{nome:req.body.nome});
})

//link para arquivo css,js e img
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));

//Start server
app.listen(3000,function(req,res){
    console.log('Servidor está rodando');
});