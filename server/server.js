require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const handlebars = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./config/connection");
const routes = require("./routes");
const helpers = require("./helpers/");

const PORT = process.env.PORT || 3301;

const app = express();

const sessionOptions = {
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
}

const handlebarsOptions = { helpers: helpers };
const hbs = handlebars.create(handlebarsOptions)

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars")

app.use(cors());
app.use(session(sessionOptions))
app.use(express.json({extended:true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../", "public")))
app.use(routes);

const init = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => 
      console.info(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Couldn't connect to database.")
    console.log(error)
  }
};

init();