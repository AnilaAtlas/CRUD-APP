import mongoose from "mongoose";
import 'dotenv/config';

const url=`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.h4m4o.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DATABASE_NAME}`

mongoose.connect(url)
export default mongoose
