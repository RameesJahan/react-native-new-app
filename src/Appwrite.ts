import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('66783b62000514c0f25d'); // Your project ID


const account = new Account(client);

const Appwrite = {
  client,
  account,
  ID
}

export default Appwrite
