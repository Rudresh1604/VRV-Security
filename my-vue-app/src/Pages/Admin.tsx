import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useToast } from "../components/Provider/ToastProvider";
import { Spinner } from "flowbite-react";

type DecodedToken = {
  role: string;
  userId: string;
};

interface RepsonseFormat {
  data: string;
}

const Admin: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();
  useEffect(() => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (!token) {
      alert("Please Login");
      navigate("/login");
    } else {
      setLoading(true);
      let decoded = jwtDecode<DecodedToken>(token);
      const { userId, role } = decoded;
      setUserId(userId);
      setRole(role);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [role]);
  const getData = async () => {
    try {
      setLoading(true);
      console.log(userId);
      console.log(role);
      const response: any = await axios.get<RepsonseFormat>("/users/admin");
      console.log(response);
      toast(response.data);
      // setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast(error.response.data);
      // setLoading(false);
      navigate("/student");
    }
  };
  return (
    <div>
      {loading ? (
        <Spinner className="w-[40%] h-12 text-center" />
      ) : (
        `Welcome to admin dashboard your role is ${role}`
      )}
    </div>
  );
};

export default Admin;
