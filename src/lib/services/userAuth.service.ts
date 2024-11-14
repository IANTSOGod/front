export interface UserCredentials {
  email: string;
  mdp: string;
}

const backendURL = import.meta.env.VITE_BACKEND_HOST;

export default async function Authentify({ email, mdp }: UserCredentials) {
  const userAuth = <UserCredentials>{
    email: email,
    mdp: mdp,
  };
  const response = await fetch(`${backendURL}/users/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userAuth),
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return null;
  }
}
