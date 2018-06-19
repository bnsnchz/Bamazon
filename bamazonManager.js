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
    startManager();
})

startManager = () =>{
    inquirer.prompt([
        {
            type:"list",
            name:"menu",
            message:"Select an Option: ",
            choices:["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then((answer)=>{
        if(answer.menu === "View Products for Sale"){
            connection.query("SELECT id, product_name, price, inventory FROM products",(err,res1)=>{
                if(err) throw err;
                for(var i =0; i<res1.length; i++){
                    console.log("Product ID: " + res1[i].id,"Name: "+res1[i].product_name, "Price: "+res1[i].price, "Inventory "+res1[i].inventory);
                    console.log("------------------------------------");
                }
                
                startManager();
            });
        }
        if(answer.menu === "View Low Inventory"){
            connection.query("SELECT id, product_name, inventory FROM products WHERE inventory < 5",(err,res2)=>{
                if(err) throw err;
                for(var i = 0; i < res2.length; i++){
                    console.log(res2[i].id, res2[i].product_name, res2[i].inventory);
                    console.log("------------------------------------");
                }
                startManager();
            })
        }
        if(answer.menu === "Add to Inventory"){
            inquirer.prompt([
                {
                    type:"input",
                    name:"stockMenu",
                    message:"Which Item are you adding stock to?"
                }
            ]).then((answer2)=>{
                inquirer.prompt([
                    {
                        type:"input",
                        name:"adding",
                        message:"How many would you like to add?"
                    }
                ]).then((answer3)=>{
                    connection.query("UPDATE products SET inventory = inventory + "+(answer3.adding)+" WHERE id=?", [answer2.stockMenu],(err)=>{
                        if(err) throw err;
                        console.log("Inventory Updated.");
                        console.log("------------------------------------");
                        startManager();
                    })
                })
            })
        }
        if(answer.menu === "Add New Product"){
            inquirer.prompt([
                {
                    type:"input",
                    name:"name",
                    message:"What is the name of the product?"
                },
                {
                    type:"input",
                    name:"department",
                    message:"What department does it belong to?"
                },
                {
                    type:"input",
                    name:"price",
                    message:"How much does it cost?"
                },
                {
                    type:"input",
                    name:"stock",
                    message:"How many are you adding?"
                }
            ]).then((answer4)=>{
                connection.query("INSERT INTO products SET ?",
                {
                    product_name: answer4.name,
                    department_name: answer4.department,
                    price: answer4.price,
                    inventory: answer4.stock
                },(err)=>{
                    if(err) throw err;
                    console.log("Product added.");
                    console.log("------------------------------------")
                    startManager();
                })
             })
        }
    })
}