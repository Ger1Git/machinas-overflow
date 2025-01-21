import connectMongoDB from "../db/connectMongo";

export default defineNitroPlugin(() => {
  connectMongoDB();
});
