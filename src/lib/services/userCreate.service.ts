import { User } from "../Interfaces/UserInfo";

const backURL = import.meta.env.VITE_BACKEND_HOST;


export default async function CreateUser({ email, mdp, fname, lname }: User) {
  try {
    const newUser = <User>{
      email: email,
      mdp: mdp,
      fname: fname,
      lname: lname,
      verif: "0",
    };
    const response = await fetch(`${backURL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      //   const UserCreated = JSON.parse(response.json);
      //   console.log(UserCreated);
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
