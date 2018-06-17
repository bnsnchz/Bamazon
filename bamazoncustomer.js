var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user:"root",
    password:"",
    database:"bamazon"
});

connection.connect((err)=>{
    if (err) throw err;
    start();
})

start = () =>{
    connection.query("SELECT id, product_name, price FROM products",(err,res)=>{
        if(err) throw err;
        for(var i = 0; i < res.length; i++){
            console.log(res[i].id, res[i].product_name, res[i].price);
        }
       });
}