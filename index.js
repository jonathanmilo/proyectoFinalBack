const express= require("express")
const fs=require("fs")
const handlebars= require("express-handlebars")
const port= 8080
const app=express()
var body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
app.engine("hbs",handlebars({extname:"hbs",  defaulsLayaout:"index.hbs", layaoutDir: __dirname+"/views",partialsDir:"views/parciales"}))

app.set("view engine","hbs")
app.set("views","./views")
app.listen(port,()=>{console.log(`arrancó en puerto :${port}`)});

;
var databa=[]
/* async function LeerBaseDeDatos(){
    try{const contenido= await fs.promise.readFile("./back/database.JSON","utf-8",(error,contenido)=>{
        if(error){console.log(`no se pudo leer la base de datos,${error}`)}
        else{ return contenido}
    });return contenido}
    catch(error){console.log(`no se pudo encontrar base de datos ${error}`)}} */
 function database(){  fs.readFile('./back/database.json','utf-8',(error,contenido)=>{
        if(error){return error}
        else{let data=contenido; return data}
    })
 }
    database()
//LeerBaseDeDatos()
    //let data=database;
//console.log(contenido)

function buscarProductoPorID(a,b){ 
    for(let i =0;i<a.length;i++){
            for(let z=0;z<data[i].productos.length;z++){
                let encontrado=data[`${i}`].productos[`${z}`].idP
         if( encontrado==b ){return data[i].productos[z]}
        }
        
    }
}
let busqueda= buscarProductoPorID(database,12)
//console.log(database)

//entrada a la pág, con  formulario de entrada
app.get("/",(req,resp)=>{
    resp.render("index",{sugestedChamps: database, cliente:false})
})
// respuesta al formulario de entrada

app.route("/api/productos")
    .get(function(req,resp){
        let parametros=JSON.parse(req.body)
        console.log(req.doby) 
        console.log(req.query)
        resp.send(parametros)
    })
    .post(function(req,resp){
        let parametros= req.body
        resp.send(parametros)
    })


app.route("/api/carrito")
     .get(function(req,resp){
        let parametros=req.query
        //console.log(parametros)
       console.log(parametros)
          switch(parametros.tipo_de_usuario_carrito){
              case "administrador":resp.render("index",{sugestedChamps:database,administrador:true});break;
              case "cliente":resp.render("index",{sugestedChamps:database, cliente:true});break;
              
              default:resp.send(JSON.stringify(req.query))
          } 
    }) 
    

    
    .post(function(req,resp){
        let parametros=req.body
      console.log(parametros)
      //  console.log( JSON.parse(parametros.Usuario_Carrito_nombre))
        switch(parametros.tipo_de_usuario_carrito){
            case "administrador":resp.render("carrito",{sugestedChamps:database,administrador:true});break;
            case "cliente":resp.render("carrito",{sugestedChamps:database, cliente:true});break;
            default:resp.send(req.body)
        } 
    })
app.get("/api/carrito/:id",(req,resp)=>{
    let parametros=req.params.id
    console.log(parametros)
   console.log(   buscarProductoPorID(data,parametros))
   
  // resp.render( "index",{respuestaParametro:busqueda,cliente:true})

})


/* 
app.post('/api/productos',(req,resp)=>{

    const num=req.body
   // console.log(num)
    const usuario= req.body.tipo_de_usuario
    
    console.log(usuario)
   switch(usuario){
       case"cliente":resp.render("index",{sugestedChamps:database,cliente:true});break
        case "administrador":resp.render("index",{sugestedChamps:database,administrador:true});break
    
   }
   
}) */