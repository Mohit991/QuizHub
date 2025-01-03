import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/api";
import { AppContext } from "../../context/AppContext";
import CustomSpinner from "../../components/CustomSpinner"; // Import CustomSpinner

const SignIn = () => {
  const { setUserName, setUserId, setUserEmail, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignIn = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const { token, user } = await signIn(email, password);

      localStorage.setItem("token", token);
      setToken(token);
      setUserId(user.id);
      setUserName(user.name);
      setUserEmail(user.email);

      navigate("/"); // Redirect to HomePage
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "86vh",
        padding: "20px",
        backgroundColor: "transparent",
        
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#004c70",
          
        }}
      >
        Sign In
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "transparent",
          border: "1px solid #004c70",
          padding: "20px",
          borderRadius: "8px",
          color: "#39ff14",
          
          boxShadow: "0px 2px 8px rgba(57, 255, 20, 0.1)",
        }}
      >
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            style: { color: "#004c70",  fontSize: "16px" },
          }}
          InputProps={{
            style: {
              color: "#004c70",
              backgroundColor: "transparent",
              border: "1px solid #004c70",
              
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            style: { color: "#004c70",  fontSize: "16px" },
          }}
          InputProps={{
            style: {
              color: "#004c70",
              backgroundColor: "#050801",
              border: "1px solid #004c70",
              
            },
          }}
        />

        {error && (
          <Typography
            color="error"
            sx={{
              marginTop: "10px",
              color: "#ff6347",
              
            }}
          >
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: "20px",
            backgroundColor: "#004c70",
            color: "#050801",
            
            "&:hover": {
              backgroundColor: "#00688c",
            },
          }}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <CustomSpinner /> : "Sign In"}
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
