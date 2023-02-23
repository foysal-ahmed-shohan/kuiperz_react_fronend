import axios from "axios";
import React, { useState } from "react";

export default function UserSignup() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [alternateContactNo, setAlternateContactNo] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      switch (step) {
        case 1:

          const response = await axios.post(
            "http://127.0.0.1:8000/api/signup/account",
            {
              email,
              username,
              password,
              confirm_password: confirmPassword,
            }
          );


          if (response.data.status === "success") {
            const userId = response.data.user_id;
            setErrorMessage("");
            setStep(2);
            setUserId(userId);
          } else {
            setErrorMessage(response.data.message);
          }
          break;

        case 2:
          const personalResponse = await axios.post(
            "http://127.0.0.1:8000/api/signup/personal",
            {
              first_name: firstName,
              last_name: lastName,
              contact_no: contactNo,
              alternate_contact_no: alternateContactNo,
              user_id: userId
            }
          );

          if (personalResponse.data.status === "success") {
            setErrorMessage("");
            setStep(3);
          } else {
            setErrorMessage(personalResponse.data.message);
          }
          break;

        case 3:

          const formData = new FormData();
          formData.append("image1", image1);
          formData.append("image2", image2);
          formData.append("user_id", userId);

          const imageResponse = await axios.post(
            "http://127.0.0.1:8000/api/signup/image",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (imageResponse.data.status === "success") {
            setErrorMessage("");
            setStep(4);
          } else {
            setErrorMessage(imageResponse.data.message);
          }
          break;

        case 4:
          const finishResponse = await axios.post(
            "http://127.0.0.1:8000/api/signup/finish"
          );

          if (finishResponse.data.status === "success") {
            setErrorMessage("");
            window.location.href = "/";
          } else {
            setErrorMessage(finishResponse.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1>User Signup</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h2>Step 1: Account</h2>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <br />
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <br />
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            <br />
            <button type="submit">Next</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>Step 2: Personal </h2>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
            <br />
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
            <br />
            <label>Contact Number:</label>
            <input
              type="text"
              value={contactNo}
              onChange={(event) => setContactNo(event.target.value)}
              required
            />
            <br />
            <label>Alternate Contact Number:</label>
            <input
              type="text"
              value={alternateContactNo}
              onChange={(event) => setAlternateContactNo(event.target.value)}
            />
            <br />
            <button type="button" onClick={() => setStep(step - 1)}>
              Back
            </button>
            <button type="submit">Next</button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2>Step 3: Images</h2>
            <label>Image 1:</label>
            <input
              type="file"
              onChange={(event) => setImage1(event.target.files[0])}
            />
            <br />
            <label>Image 2:</label>
            <input
              type="file"
              onChange={(event) => setImage2(event.target.files[0])}
            />
            <br />
            <button type="button" onClick={() => setStep(step - 1)}>
              Back
            </button>
            <button type="submit">Finish</button>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2>Finish</h2>
            <p>Your account has been created successfully.</p>
          </div>
        )}
      </form>
    </div>
  );
}
