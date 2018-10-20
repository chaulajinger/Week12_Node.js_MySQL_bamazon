// Required npm packages 
var mysql = require("mysql");
var inquirer = require("inquirer");
//var dbConfig = require("./dbConfig.js")
require = ('console.table');


var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Chaula2018",   // Enter your password
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected', connection.threadId);
  //console.log("connected as id " + connection.threadId + "\n");
  displayProducts();
  //start();
});

// 
function displayTable (res) {
  var tableArray = [];
  for (var i = 0; i < res.length; i++) {
    // Push on object
    tableArray.push({
        'Item_ID': res[i].item_id,
        'Product': res[i].Product_Name,
        'Department_Name': res[i].Department_Name,
        'Price': '$' + res[i].Stock_Quantity
    });
  }
  console.table(tableArray);
}

// * --  Display All of the Items available for sale. This initial display, should include the ids, names, and Prices of products for sale --
var displayProducts = function () {
  var query = 'SELECT * FROM products'
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Item_ID: " + res[i].item_id + " || Product: " + res[i].Product_Name + " || Department_Name: " + res[i].Department_Name + " || Price: " + res[i].Price + " || Stock_Quantity: " + res[i].Stock_Quantity);
    }
    shoppingCart();
  })
};
// * -- Users should then be prompted with two messages:
//        -- The first message should ask them the ID of the product they would like to buy    --
//        -- The second message should ask them how many of the product they would like to buy --
var shoppingCart = function () {
  inquirer.prompt([{
    name: "ProductID",
    type: "input",
    message: "What is the ID of the product you would like to buy?",
    //Validate: checks weather or not the user typed a response
    validate: function (value) {
      if (isNaN(value) == false) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    name: "Quantity",
    type: "input",
    message: "How many would you like to buy?",
    validate: function (value) {
      if (isNaN(value) == false) {
        return true;
      } else {
        return false;
      }
    }
  }]).then(function (answer) {

    // * -- Once the customer has placed the order: Your application should...
    // * Check if your store has enough quantity of the product to meet the customer's request.
    //   If not, you should respond to the user by saying: "Insufficient quantity" and prevent the order from going through.
    // * If your store DOES have enough of the product to meet the customer's request, you should fulfill their order.
    //   This means that you should show them the total cost of their puchase. Then update the SQL database to reflect the remaining quantity. --
    var query = 'SELECT * FROM Products WHERE item_id=' + answer.Quantity;
    connection.query(query, function (err, res) {
      if (answer.Quantity <= res) {
        for (var i = 0; i < res.length; i++) {
          console.log("We currently have " + res[i].Stock_Quantity + " " + res[i].Product_Name + ".");
          console.log("Thank you for your patronage! Your order of " + res[i].Stock_Quantity + " " + res[i].Product_Name + " is now being processed.");
        }
      } else {
        console.log("Not enough of this product in stock.");
      }
      displayProducts();
    })
  })
};