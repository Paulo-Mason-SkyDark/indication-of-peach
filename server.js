var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next){
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
 res.setHeader("Access-Control-Allow-Headers", "content-type");
 res.setHeader("Content-Type", "application/json");
 res.setHeader("Access-Control-Allow-Credentials", true);
 next();
});


app.listen(9090, function(){ console.log("Servidor web rodando na porta 9090") });

app.get('/api', function(req, res){
  fs.readFile('user.json', 'utf8', function(err, data){
    if(err){
      var response = {status: 'falha', resultado: err};
      res.json(response);
    } else {
      var obj = JSON.parse(data);
      var result = 'nunhum usuario foi encontrado';

      obj.usuarios.forEach(function(usuario){
        console.log("user", usuario);
        if(usuario != null){
          if(usuario.user_id === req.query.user_id){
            result = usuario;
          }
        }
      });

     console.log("user", usuario);
     console.log("user", obj);
     console.log("user", fs.readFile('user.json'));
      response = {status: 'sucesso', resultado: result};
      res.json(response);

    }
  });
});
