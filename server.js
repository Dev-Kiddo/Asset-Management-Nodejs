import app from "./index.js";
import connectDB from "./config/configDB.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 9000;

const server = async function () {
  try {
    const connect = await connectDB();
    if (connect.connection.host) {
      console.log(`${connect.connection.host} is connected`);

      app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
      });
    }
  } catch (error) {
    console.log("Err in Server", error);
  }
};

server();
