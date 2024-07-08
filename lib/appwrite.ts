import { Client, Account } from 'react-native-appwrite';


export const config ={
    endpoint: "https://cloud.appwrite.io/v1",
    project: "com.naeem.aora",
    projectId:"668ae4ad001e96746e46",
    databaseId:"668b9f34003d8fed1fae",
    userCollectionId:"668b9f5e003907ccdab8",
    videoCollectionId:"668b9f7f000d1b33f5a9",
    storageId:"668ba5630033cc95a432",

}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint('http://localhost/v1') // Your Appwrite Endpoint
    .setProject('455x34dfkj')
    .setPlatform('com.example.myappwriteapp') // YOUR application ID
;

const account = new Account(client);

// Register User
account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });