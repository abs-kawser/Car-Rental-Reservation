// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({ path: path.join(process.cwd(), ".env") });
import dotenv from "dotenv"
dotenv.config()
export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  db_url:process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_token: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_token: process.env.JWT_REFRESH_SECRET,

};
