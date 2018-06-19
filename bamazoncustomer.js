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
    startCustomer();
})

startCustomer = () =>{
    connection.query("SELECT id, product_name, price FROM products",(err,res)=>{
        if(err) throw err;
        for(var i = 0; i < res.length; i++){
            console.log(res[i].id, res[i].product_name, res[i].price);
            console.log("------------------------------------");
        }
        });
        setTimeout(() => {
       inquirer.prompt([
           {
            type:"input",
            name:"menu",
            message:"Select the number of the product you would like to purchase: "
            }
    ]).then((answer1)=>{
        inquirer.prompt([
            {
             type:"input",
             name:"stock",
             message:"How many would you like?",
            }
            ]).then((answer2)=>{
                connection.query("SELECT * FROM products WHERE id=?",[answer1.menu],(err, res)=>{
                    if(answer2.stock > res[0].inventory){
                        console.log("Insufficient stock!!!!");
                        console.log("------------------------------------");
                        startCustomer();
                    }
                    else{
                    connection.query("UPDATE products SET inventory = inventory - "+(answer2.stock)+" WHERE id=?",[answer1.menu],(err)=>{
               if(err) throw err;
               console.log("Thank you for your buisness!");
               console.log("------------------------------------");
               startCustomer();
                    }) 
                }
                });

            })

        })
},1000);

}
