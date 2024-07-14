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
export const createUser = async(email:string, password:string, username:string)=> {
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
export async function signIn(email, password) {
    try {
        console.log(email+" "+password)
        const session = await account.createEmailPasswordSession(email, password);

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


// Get Current User
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Sign Out
export async function signOut() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        throw new Error(error);
    }
}




// Get all video Posts
export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        );
        // console.log(posts.documents)
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}


// Get latest created video posts
export async function getLatestPosts() {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        );
        // console.log(posts) // for show all data

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}


// Get video posts that matches search query
export async function searchPosts(query) {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search("title", query)]
        );

        if (!posts) throw new Error("Something went wrong");
// console.log(posts.documents)
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}
