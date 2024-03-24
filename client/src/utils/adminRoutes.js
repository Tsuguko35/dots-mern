import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { validateUser } from "../context";
import { NotificationContext } from "../context/context";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(NotificationContext);

  useEffect(() => {
    async function validate() {
      const isLoggedIn = window.localStorage.getItem("isLoggedIn");
      const token = window.localStorage.getItem("dotsUser");
      if (isLoggedIn) {
        try {
          const res = await validateUser({ token });
          if (res?.status === 200) {
            if (res.data?.role === "Admin") {
              setUser(res.data);
            } else {
              navigate("/Dashboard");
            }
          } else {
            navigate("/Login");
          }
        } catch (error) {
          console.error("Error validating user:", error);
          navigate("/Login");
        }
      } else {
        navigate("/Login");
        document.cookie = "token=; Max-Age=0; secure";
      }
    }

    validate();
  }, [navigate, setUser]);

  return children;
};

export default AdminRoute;
