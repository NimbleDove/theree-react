import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth , db} from "../../config/firebase"
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Register = () => {
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage["user"]) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Authentication
      const { email, password, username } = formData;
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user data to Firestore
      await addDoc(collection(db, "users"), {
        uid: authUser.user.uid,
        email,
        username,
      });

      // Save user data to local storage
      const userData = { uid: authUser.user.uid, email, username };
      localStorage.setItem("user", JSON.stringify(userData));

      // SweetAlert2 ile güzel bildirim göster
      await Swal.fire({
        icon: 'success',
        title: 'Registration successful!',
        text: 'Do you want to log in now?',
        showCancelButton: true,
        confirmButtonText: 'Yes, log in!',
        cancelButtonText: 'No, thanks',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              onChange={(e) =>
                setFormData((current) => ({
                  ...current,
                  username: e.target.value,
                }))
              }
              type="text"
              placeholder="Username"
              required
            />
            <i className="bx bxs-user" />
          </div>
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
            Register
          </button>
          <div className="register-link">
            <p>
              Already have an account? <a href="login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
