import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { where, query, getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in user using Firebase Authentication
      const { email, password } = formData;
      await signInWithEmailAndPassword(auth, email, password);

      // Retrieve user data from Firestore
      const usersQuery = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(usersQuery);
      const user = querySnapshot.docs[0].data();

      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (error) {
      console.error("Unable to login with given credentials.", error);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              onChange={(e) =>
                setFormData((current) => ({
                  ...current,
                  email: e.target.value,
                }))
              }
              type="email"
              placeholder="Email"
              required
            />
            <i className="bx bxs-user" />
          </div>
          <div className="input-box">
            <input
              onChange={(e) =>
                setFormData((current) => ({
                  ...current,
                  password: e.target.value,
                }))
              }
              type="password"
              placeholder="Password"
              required
            />
            <i className="bx bxs-lock-alt" />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
