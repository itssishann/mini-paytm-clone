const express = require("express")
const app = express();
const cors = require("cors")
const mainRouter = require("./router/indexRouter")
const DBCon = require("./db")
require('dotenv').config();
app.use(cors());

app.use(express.json())
 DBCon()
const PORT =  process.env.PORT;
app.use("/v1/",mainRouter)
app.listen(PORT,()=>{
    console.log(`Started -> localhost:${PORT}`);
})