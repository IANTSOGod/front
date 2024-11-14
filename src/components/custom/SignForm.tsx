import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import VerifyPassword from "@/lib/services/verifyPassword.service";
import { useNavigate } from "react-router-dom";
import CreateUser from "@/lib/services/userCreate.service";
import { User } from "@/lib/Interfaces/UserInfo";

export default function SignForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [data, setData] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name != "mdp") {
      setData({ ...data, [e.target.name]: e.target.value });
    } else {
      const result = VerifyPassword(e.target.value);
      if (result != "Strong password") {
        setError(result);
      } else {
        setData({ ...data, [e.target.name]: e.target.value });
        setError("");
      }
    }
    console.log(data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = await CreateUser(data as User);
    if (message) {
      navigate("/", { state: message });
    } else {
      setError("Une erreur est survenue");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-gray-400 rounded-xl mt-[50px] mx-auto grid row-1 gap-y-[20px] md:w-[600px] sm:w-[300px] pt-[100px] align-center"
    >
      <Label className="mx-auto mb-[30px] text-2xl">Sign up</Label>
      <Label className="ml-10">First Name</Label>
      <Input
        placeholder="Enter your first name"
        className="w-5/6 ml-10"
        name="fname"
        onChange={handleChange}
        required
      ></Input>
      <Label className="ml-10">Last Name</Label>
      <Input
        placeholder="Enter your last name"
        className="w-5/6 ml-10"
        name="lname"
        onChange={handleChange}
        required
      ></Input>
      <Label className="ml-10">Email</Label>
      <Input
        placeholder="Enter your email"
        type="email"
        className="w-5/6 ml-10"
        name="email"
        onChange={handleChange}
        required
      ></Input>
      <Label className="ml-10">Password</Label>
      <Input
        placeholder="Enter a password"
        className={`w-5/6 ml-10 ${error != "" ? "border-red-500" : ""}`}
        name="mdp"
        onChange={handleChange}
        required
      ></Input>
      {error != "" ? (
        <>
          <Label className="text-md text-red-500 ml-10">{error}</Label>
        </>
      ) : (
        <></>
      )}
      <div className="mx-auto flex gap-x-10 mb-[100px] mt-[20px]">
        <Button className="w-[150px]" type="submit">
          Create account
        </Button>
        <Button
          className="w-[150px]"
          variant={"outline"}
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
