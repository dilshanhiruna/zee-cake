import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type UserData = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "";
  address: string;
  phone: string;
  province: string;
};

const useUserData = (): UserData => {
  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    address: "",
    phone: "",
    province: "",
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
        address: decodedToken.address,
        phone: decodedToken.phone,
        province: decodedToken.province,
      });
    }
  }, []);

  return userData;
};

export default useUserData;
