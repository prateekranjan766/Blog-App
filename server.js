const express = require("express");
const connectDB = require("./config/db");
const app = express();

//connecting database
connectDB();

//Initializing Middlewares
app.use(express.json({ extended: false }));

//Handling routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/blogs", require("./routes/blogs"));

//Assigning Port
const port = process.env.PORT || 5000;

//Starting Server
app.listen(port, () => console.log(`Server started at port ${port}...`));
