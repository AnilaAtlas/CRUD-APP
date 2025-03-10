
import express from 'express';
// import schema from "./Schema/index.mjs";
import mongoose from "./Database/index.mjs";
import userRoutes from "./Routes/userRoutes.mjs"

mongoose.connection.on("open",()=>{
  console.log("MongoDB connected");
})
mongoose.connection.on("error",()=>{
  console.log("Error in connecting MongoDB");
})

const app = express()
app.use(express.json())
const port = 3001;
app.use("/api", userRoutes)

app.use("/",(req, res, next) =>{
  console.log("Request URL:",req.url, "method: ", req.method);
  next();
})


 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
