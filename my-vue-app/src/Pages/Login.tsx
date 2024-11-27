import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Card } from "flowbite-react";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { useToast } from "../components/Provider/ToastProvider";
import { validateToken } from "../utils/tokenValidation"; // Import token validation

interface RegisterResponse {
  message: string;
  data: { token: string };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [islogin, setLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
      navigate("/student"); // Redirect only if the token is valid
    } else {
      setLogin(false);
    }
  }, [islogin]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast("All fields are required!");
      return;
    }

    try {
      const response = await axios.post<RegisterResponse>("/users/login", {
        email,
        password,
        role,
      });

      const { message, data } = response.data;

      // Save token and redirect
      localStorage.setItem("token", data.token);
      toast(message);
      role === "admin" ? navigate("/admin") : navigate("/student");
    } catch (error: any) {
      console.error("Login error:", error);
      toast(error.response?.data || "An error occurred during login.");
    }
  };

  return (
    <Card className="flex flex-col gap-3">
      <h1 className="text-center">Login Page</h1>
      <span className="border-b-2 w-[30%] border-black"></span>
      <div className="flex justify-center border-black items-center">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" value="Your email" />
            <TextInput
              id="email"
              type="email"
              value={email}
              placeholder="name@flowbite.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              shadow
            />
          </div>
          <div>
            <Label htmlFor="role" value="Your Role" />
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
            <Label htmlFor="password" value="Your password" />
            <TextInput
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              shadow
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </Card>
  );
};

export default Login;
