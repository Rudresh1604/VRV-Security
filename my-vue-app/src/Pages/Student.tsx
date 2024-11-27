import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../components/Provider/ToastProvider";
import { Spinner } from "flowbite-react";
import { validateToken } from "../utils/tokenValidation";

type DecodedToken = {
  role: string;
  userId: string;
};

interface ResponseFormat {
  data: string;
}

const Student: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      fetchData();
    } else {
      toast("Please login to access the dashboard.");
    }
    // Dependency array ensures this runs only on mount
  }, []);

  const fetchData = async () => {
    try {
      const response: any = await axios.get<ResponseFormat>("/users/");
      toast(response.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast(error.response?.data || "Error fetching data.");
      navigate("/login");
    } finally {
      setLoading(false); // Ensure loading stops regardless of success or failure
    }
  };

  return (
    <div className="text-center">
      {loading ? (
        <Spinner className="w-24 h-24" />
      ) : (
        <p>
          Welcome to the student dashboard, <strong>{role}</strong>. Your ID is{" "}
          <strong>{userId}</strong>.
        </p>
      )}
    </div>
  );
};

export default Student;
