//imports
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const urlencodeParser = bodyParser.urlencoded({extended:false});

//conecção com o banco de dados MYSQL
const sql = mysql.createPool({
    
    host:'us-cdbr-east-06.cleardb.net',
    user:'b83967e24f0613',
    password:'5ed36278',
    database:" heroku_edb8033e0c9551b"
});
let port = process.env.PORT || 3000;

//template engine
app.engine('handlebars',handlebars.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');



//Routes and templates
//arquivo index
app.get("/",function(req,res){
    res.render('index');
// });
// //arquivo inserir
// app.get("/inserir",function(req,res){res.render('inserir');});
// app.post("/controllerForm",urlencodeParser,function(req,res){
//     sql.getConnection(function(err,connection){
//         connection.query("INSERT INTO pessoas VALUES(?,?)",[req.body.id,req.body.nome]);
//         res.render("controllerForm",{nome:req.body.nome});
//     });
//     if(err){
//         res.render(err);
//     }
});
//arquivo select
app.get("/select/:id?",function(req,res){
    if(!req.params.id){
        sql.getConnection(function(err,connection){
            if(err) throw err;
            else {
                connection.query("SELECT * FROM pessoas;",function(error,results){
                    connection.release();
                    res.render('select',{data:results});  
                    if(error) throw error;
                });
            }
        });
    }//else{
    //     sql.getConnection(function(err,connection){
    //         sql.query("select * from pessoas where id=?",[req.params.id],function(err,results,fields){
    //             res.render('select',{data:results});
    //         });
    //     if(err){
    //         res.render(err);
    //     }
    //     });
    // }
}); 
// //arquivo deletar
// app.get("/deletar/:id",function(req,res){
//     sql.getConnection(function(err,connection){
//         connection.query("DELETE FROM pessoas WHERE id=?",[req.params.id]);    
//         res.render('deletar');
       
//     });
//     if(err){
//         res.render(err);
//     }
// });
// //arquivo update
// app.get("/update/:id",function(req,res){
//     sql.getConnection(function(err,connection){
//         connection.query("SELECT * FROM pessoas WHERE id=?",[req.params.id],function(err,results,fields){
//             res.render('update',{id:req.params.id,nome:results[0].nome});
//         });
//     });
     
// });
// app.post("/controllerUpdate",urlencodeParser,function(req,res){
//     sql.getConnection(function(err,connection){
//         connection.query("UPDATE pessoas SET nome=? WHERE id=?",[req.body.nome,req.body.id]);
//         res.render('controllerUpdate');
//     });  
// });
//link para arquivo css,js e img
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));

//Start server
app.listen(port,function(req,res){
    console.log('Servidor está rodando');
});