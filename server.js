const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Erlauben Sie CORS für alle Routen
app.use(cors());

// simple route
app.get("/", (req, res) => {
  //res.json({ message: "Hallo Welt." });
});

// Einbinden der Routenmodule
require("./scripts/routes/routes")(app);
const todosRoutes = require("./scripts/routes/routes");
app.use("/api/todos", todosRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./scripts/models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
