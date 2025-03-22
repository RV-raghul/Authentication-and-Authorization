import mongoose from "mongoose";
import config from '../config/index.config.js'


main().catch(
    (err) => console.log("MongoDB Connection Failed",err)
)


async function main() {
    await mongoose.connect(config.MONGODB_URL)
    console.log("MongoDB Connected")
}


export default mongoose