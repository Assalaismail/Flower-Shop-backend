const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const connection = require("./configure/db.js");
const bodyparser = require("body-parser");

const { errorHandler } = require("./middleware/errormiddleware");
const conn = mongoose.connection;

const userRoutes = require("./routes/user.js");
const itemRouter = require("./routes/items");
const catRouter = require("./routes/categories");
const contactusRoutes = require("./routes/contact");







connection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));




app.use("/item", itemRouter);
app.use("/category", catRouter);
app.use("/contactus", contactusRoutes);
app.use("/user", userRoutes);





const port = process.env.PORT || 8000;

app.use(errorHandler); //error handler for default stack response
app.listen(port, () => console.log(`server listening on port ${port}`));
