// @ts-ignore
// @ts-nocheck
import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";
import {UserDataType} from "../type/AllDataType";

export const config ={
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.naeem.aora",
    projectId:"668ae4ad001e96746e46",
    databaseId:"668b9f34003d8fed1fae",
    userCollectionId:"668b9f5e003907ccdab8",
    videoCollectionId:"668b9f7f000d1b33f5a9",
    storageId:"668ba5630033cc95a432",

}




// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // YOUR application ID
;

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
// Register User
export const createUser = async({email, password, username}:UserDataType)=> {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;

    } catch (e) {
        console.log(e)
    }
}


// Sign In
export async function signIn(email:string, password:string) {
    try {
        const session = await account.createEmailSession(email, password);

        return session;
    } catch (error) {
        throw new Error(error);
    }
}
// Get Account
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}