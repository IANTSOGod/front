import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import VerifyPassword from "@/lib/services/verifyPassword.service";
import { Separator } from "../ui/separator";
import Authentify from "@/lib/services/userAuth.service";
import { UserContext } from "@/lib/Context/AuthContext";
import { User } from "@/lib/Interfaces/UserInfo";

//const host=import.meta.env.VITE_HOST

export default function LogForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { defineUser } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState<string>("");

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
    if (error === "") {
      const message = await Authentify(data as User);
      if (message != null) {
        const Credentials = {
          user_id: message.user_id,
          email: message.email,
          mdp: message.email,
          fname: message.fname,
          lname: message.lname,
        } as User;
        defineUser(Credentials);
      }
    } else {
      console.log("ato ndray lery");
    }
  };
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-gray-400 rounded-xl mt-[50px] mx-auto md:w-[600px] sm:w-[300px]"
    >
      <Label className="text-2xl flex justify-center align-center mt-[100px] mb-[50px]">
        {location.state === null ? "Log in" : "Try login now"}
      </Label>
      <br></br>
      <Label className="mx-10">Email</Label>
      <Input
        className="w-5/6 mx-auto mb-[20px]"
        placeholder="Enter your email here"
        name="email"
        type="email"
        onChange={handleChange}
        required
      ></Input>
      <Label className="mx-10">Password</Label>
      <div className="mx-12 mb-[10px] flex w-[520px]">
        <Input
          placeholder="Enter your password here"
          type={show ? "text" : "password"}
          name="mdp"
          onChange={handleChange}
          className={`${error ? "border-red-500 " : "border-gray-300"}`}
          required
        ></Input>
        {show ? (
          <Eye
            className="relative left-[-50px] bottom-[-5px]"
            onClick={handleShow}
          ></Eye>
        ) : (
          <EyeOff
            className="relative left-[-50px] bottom-[-5px]"
            onClick={handleShow}
          ></EyeOff>
        )}
      </div>
      {error != "" ? (
        <>
          <Label className="text-md text-red-500 ml-12">{error}</Label>
          <br></br>
        </>
      ) : (
        <></>
      )}
      <Link to={"/forgotPass"}>
        <Label className="text-blue-500 text-md mx-12 ">
          Forgot password ?
        </Label>
      </Link>
      <Button className="mt-[50px] w-5/6 md:mx-12 mb-[30px]" type="submit">
        Log in
      </Button>
      <div className="flex align-center justify-center">
        <Separator className="w-2/6"></Separator>
        <Label className="relative text-md top-[-15px]">or</Label>
        <Separator className="w-2/6"></Separator>
      </div>
      <Button
        className="mt-[10px] mb-[20px] w-5/6 md:mx-12 bg-sky-500 text-white hover:bg-blue-800"
        onClick={() => {
          navigate("/signUp");
        }}
      >
        Sign up
      </Button>
      <Button
        className="mt-[10px] mb-[50px] w-5/6 md:mx-12"
        variant={"outline"}
      >
        <img src="./assets/google.png" className="w-[30px]"></img>
        <Label>Connect with google</Label>
      </Button>
    </form>
  );
}
