require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");

let log = require("./controllers/logController");
let user = require("./controllers/userController");

sequelize.sync();

app.use(express.json());

app.use("/api", user); //first slash of endpoint

app.use(require("./middleware/validate-session"));
app.use("/api", log);

app.listen(3000, function () {
  console.log("app is listening on port 3000");
});
