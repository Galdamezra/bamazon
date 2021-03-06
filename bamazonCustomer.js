// 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
//
// 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
//
// 6. The app should then prompt users with two messages.
//
//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.
//
// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
//
//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
//
// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});


function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    else {
      for (var i = 0; i < results.length; i++) {
        console.log("=====================================");
        console.log("Item Number: " + results[i].item_id);
        console.log("Product Name: " + results[i].product_name);
        console.log("Price: " + results[i].price);
        console.log("=====================================");
      }
    }
    productlist();
  });
};

function productlist() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What would you like to buy? (Specify Item#)"
        },
        {
          name: "purchase",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        //determine if there sufficient stock, if not, return insufficient
        if (chosenItem.stock_quantity > parseInt(answer.purchase)) {
          //if stock is greater than purchase, update DB and let the user know order is placed
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: answer.purchase
              },
              {
                item_id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Purchase made!");
              start();
            }
          );
        }
        else {
          //stock was not enough, apologize
          console.log("Sorry, there is not enough in stock. Try again");
          start();
        }
      });
    });
  }
// // function which prompts the user for what action they should take
// function start() {
//   //query database for all product choices
//   connection.query("SELECT * FROM products", function(err, results) {
//     if (err) throw err;
//   }
//     else {
//       for (var i = 0; i < results.length; i++) {
//       console.log("Item Name: " + results[i].item_id)}
//     }
//   )};


    // once you have the items, prompt the user for which they'd like to bid on

  //       // determine if bid was high enough
  //       if (chosenItem.highest_bid < parseInt(answer.bid)) {
  //         // bid was high enough, so update db, let the user know, and start over
  //         connection.query(
  //           "UPDATE auctions SET ? WHERE ?",
  //           [
  //             {
  //               highest_bid: answer.bid
  //             },
  //             {
  //               id: chosenItem.id
  //             }
  //           ],
  //           function(error) {
  //             if (error) throw err;
  //             console.log("Bid placed successfully!");
  //             start();
  //           }
  //         );
  //       }
  //       else {
  //         // bid wasn't high enough, so apologize and start over
  //         console.log("Your bid was too low. Try again...");
  //         start();
  //       }
  // });
//
// // function to handle posting new items up for auction
// function postAuction() {
//   // prompt for info about the item being put up for auction
//   inquirer
//     .prompt([
//       {
//         name: "forsale",
//         type: "input",
//         message: "What is the item you would like to submit?"
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?"
//       },
//       {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           item_name: answer.item,
//           category: answer.category,
//           starting_bid: answer.startingBid,
//           highest_bid: answer.startingBid
//         },
//         function(err) {
//           if (err) throw err;
//           console.log("Your auction was created successfully!");
//           // re-prompt the user for if they want to bid or post
//           start();
//         }
//       );
//     });
// }
