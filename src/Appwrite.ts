import { Client, Account, ID } from "appwrite";
import { AppConfig } from "../app.config";

const client = new Client()
    .setEndpoint(AppConfig.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(AppConfig.APPWRITE_PROJECT_ID); // Your project ID


const account = new Account(client);

const Appwrite = {
  client,
  account,
  ID
}

export default Appwrite
