import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function RequireAuth({ children }) {
  const { auth, setIsModalOpen } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!auth.token || !auth) {
      setIsModalOpen(true);
      navigate("/");
    } else if (id && auth.user.id !== Number(id)) {
      navigate("/");
    }
  }, [auth, id, navigate, setIsModalOpen]);

  return children;
}

export default RequireAuth;
