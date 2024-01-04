// var User = require("../user.model");
var mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
import User from "../user.model";

mongoose.connect("mongodb://localhost:27017/hub");

// User.remove({}, function () {
//   console.log("Database Cleared");
// });


console.log(faker)

var count = 0;
var num_records = 1;

for (var i = 0; i < num_records; i++) {
  User.create(
    {
      first_name: faker.name.fullName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: "12121212",
    },
    function () {
      count++;
      if (count >= num_records) {
        mongoose.connection.close();
        console.log("Database Seeded");
      }
    }
  );
}
