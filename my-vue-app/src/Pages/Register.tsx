import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Card } from "flowbite-react";
import axios from "axios";
import { useToast } from "../components/Provider/ToastProvider";

interface LoginResponse {
  message: string;
  data: any;
}

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(email);

      if (!name || !email || !password || !role || !confirmPassword) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("");
        toast("All fields are required !");
      }

      if (confirmPassword !== password) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("");
        toast("Confirm not matched !");
      }
      const response = await axios.post<LoginResponse>("/users/register", {
        email: email,
        password: password,
        name: name,
        role: role,
      });
      const { message, data } = response.data;
      console.log(data);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      toast(message);
    } catch (error: any) {
      console.log(error);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      toast(error.message);
    }
  };

  return (
    <Card className="flex flex-col gap-3">
      <h1 className="text-center ">Register Page</h1>
      <span className="border-b-2 w-[30%] border-black"></span>
      <div className="flex justify-center border-black items-center">
        <form
          className="flex max-w-md flex-col gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              value={name}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              value={email}
              placeholder="name@flowbite.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Your Role" />
            </div>
            <TextInput
              id="role"
              value={role}
              type="text"
              onChange={(e) => setRole(e.target.value)}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput
              id="password2"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput
              id="repeat-password"
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              shadow
            />
          </div>

          <Button type="submit">Register</Button>
        </form>
      </div>
    </Card>
  );
};

export default Register;
