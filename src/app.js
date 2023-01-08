const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const { MONGO_URL } = process.env;

mongoose.connect("mongodb+srv://Vivek13kr:yuCfX4tparU9AEjz@cluster0.mqmmarg.mongodb.net/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((res)=> console.log("connected")).catch((err) => console.log("eror: ", err));

const port = process.env.PORT || 3100;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
