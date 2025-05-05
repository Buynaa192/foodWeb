import { connect } from "mongoose";

export const connectToDatabase = async () => {
  await connect(
    "mongodb+srv://admin:shak0923@cluster1.npctmfu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  );

  console.log("connected to database");
};
