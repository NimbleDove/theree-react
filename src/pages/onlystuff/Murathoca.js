import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this import
import { getFirestore } from "firebase/firestore";

const Murathoca = () => {
  const [showMainWrapper, setShowMainWrapper] = useState(true);
  const [securityCode, setSecurityCode] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyBVgbSIgv6R3s_C4B3HoPdn6u-0GIBZiW0",
      authDomain: "matematikv2-c22cd.firebaseapp.com",
      projectId: "matematikv2-c22cd",
      storageBucket: "matematikv2-c22cd.appspot.com",
      messagingSenderId: "807109224652",
      appId: "1:807109224652:web:3444af4f5cd6bce5b27a69",
    };
    const app = firebase.initializeApp(firebaseConfig);

    const fetchData = async () => {
      try {
        const snapshot = await app.firestore().collection("results").get();
        const resultsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(resultsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const checkCodeIsCorrect = (e) => {
    e.preventDefault(); // prevent the default form submission behavior

    if (!isNaN(parseInt(securityCode)) && parseInt(securityCode) === 7689) {
      Swal.fire({
        icon: "success",
        title: "Registration successful!",
        text: "Do you want to log in now?",
        showCancelButton: true,
        confirmButtonText: "Yes, log in!",
        cancelButtonText: "No, thanks",
      }).then((result) => {
        if (result.isConfirmed) {
          setShowMainWrapper(false);
          setIsVisible(!isVisible);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Security Code",
        text: "Please enter the correct security code.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firebase.firestore().collection("results").get();
        const resultsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(resultsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className="main-wrapper">
      <div
        className="wrapper"
        style={{ display: showMainWrapper ? "block" : "none" }}
      >
        <form onSubmit={checkCodeIsCorrect}>
          <h1>Welcome Murat Hocam</h1>
          <div className="input-box">
            <input
              type="text"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              placeholder="Please Enter The Security Code"
              required
            />
            <i className="bx bxs-user" />
          </div>

          <button type="submit" className="btn">
            Sisteme Devam Et
          </button>
          <div className="register-link"></div>
        </form>
      </div>
      <div
        className="onlyStuff"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div>
          {/* Render your results data here */}
          {results.map((result) => (
            <div key={result.id}>
              <p>Username: {result.username}</p>
              <p>Correct Answers: {result.correctAnswers}</p>
              <p>Subject: {result.subject}</p>
              <p>Success Rate: {result.successRate}%</p>
              <p>User Answers:</p>
              <ul>
                {Object.keys(result.userAnswers).map((key, index) => (
                  <li key={index}>{`${key}: ${result.userAnswers[key]}`}</li>
                ))}
              </ul>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Murathoca;
