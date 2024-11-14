import { createContext } from "react";
import { User } from "../Interfaces/UserInfo";

export const UserContext = createContext({
  user: {} as User | undefined,
  defineUser: ({ user_id, email, mdp, fname, lname }: User) => {
    console.log(email, mdp, fname, lname, user_id);
  },
});
