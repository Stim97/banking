"use server"

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email, password}: signInProps) => {
    try {
       const {account} = await createAdminClient();

       const res = await account.createEmailPasswordSession(email, password)
        return parseStringify(res)
    } catch (error) {
        console.log(error);

    }
}

export const signUp = async (userData: SignUpParams) => {
    const {email, password, firstName, lastName} = userData

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        return parseStringify(newUserAccount)

    } catch (error) {
        console.log(error);

    }
}


export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return parseStringify(user)
    } catch (error) {
        return null;
    }
}

export async function logoutAccount(){
    try {
        const {account} = await createAdminClient();
        cookies().delete('appwrite-session')
        await account.deleteSession('current')
    } catch (error) {
        console.log(error);
        
    }
}
  