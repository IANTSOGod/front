import { ReactNode, useState } from "react";
import { UserContext } from "../../lib/Context/AuthContext";
import { User } from "@/lib/Interfaces/UserInfo";

interface UserContextProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<User>();
  const defineUser = ({ user_id,email, mdp,fname,lname }: User) => {
    const actualUser = {
      user_id:user_id,
      email: email,
      mdp: mdp,
      fname:fname,
      lname:lname,
    } as User;
    setUser(actualUser);
  };

  return (
    <UserContext.Provider value={{ user, defineUser }}>
      {children}
    </UserContext.Provider>
  );
}
