// parse CLIENT_SECRET and CLIENT_ID and API_KEY from .env
import { config } from "dotenv";
config();
//throw error if CLIENT_ID, CLIENT_SECRET or API_KEY is not set
if (!process.env.CLIENT_ID || !process.env.TOKEN || !process.env.API_KEY) {
  throw new Error("CLIENT_ID , CLIENT_SECRET or API_KEY is not set");
}

const { CLIENT_ID, TOKEN, API_KEY } = process.env;

export const env: IEnv = {
  CLIENT_ID,
  TOKEN,
  API_KEY,
};

interface IEnv {
  CLIENT_ID: string;
  TOKEN: string;
  API_KEY: string;
}
