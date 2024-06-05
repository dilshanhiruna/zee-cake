import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type UserData = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "";
};

const useUserData = (): UserData => {
  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token) as any;
      setUserData({
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        password: "",
        role: decodedToken.role,
      });
    }
  }, []);

  return userData;
};

export default useUserData;
