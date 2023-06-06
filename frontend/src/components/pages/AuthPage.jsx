import { Box, Button, Container, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../authState";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState("true");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const submitHandeler = (e) => {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
    };

    const url = `http://localhost:8080/users/${isLogin ? "login" : "signup"}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }).then((result) => {
      if (result.status == 200) {
        return result.json().then((data) => {
          dispatch(authActions.auth({ token: data.token, id: data.id }));
          navigate('/posts')
        });
      } else {
        return result.json().then((data) => setError(data.message));
      }
    });
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
      >
        <Typography
          variant="h5"
          fontFamily={"inherit"}
          fontWeight={"bold"}
          marginBottom="0.5rem"
        >
          {isLogin ? "Log in to your account" : "Create a new acccount"}
        </Typography>
        <form
          onSubmit={submitHandeler}
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {error && (
            <p style={{ width: "100%", textAlign: "center", color: "red" }}>
              {error}
            </p>
          )}
          {!isLogin && (
            <TextField
              type="text"
              label="Name"
              id="standard-basic"
              variant="standard"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}
          <TextField
            type="email"
            label="Email"
            id="standard-basic"
            variant="standard"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            type="password"
            label="Password"
            id="standard-basic"
            variant="standard"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {!isLogin && (
            <TextField
              type="password"
              label="Confirm Password"
              id="standard-basic"
              variant="standard"
              margin="1rem 0"
            />
          )}
          <Button
            type="submit"
            sx={{
              margin: "1rem 0",
              bgcolor: "#121212",
              color: "#fff",
              ":hover": { bgcolor: "#121212de" },
            }}
          >
            {isLogin ? "Log in" : "Sign In"}
          </Button>
          <Button
            sx={{
              margin: "0 0 1rem 0",
              border: "1px solid #121212",
              color: "#121212",
              ":hover": { bgcolor: "#E6E8E8" },
            }}
          >
            <GoogleIcon sx={{ fontSize: "1rem", margin: "0 1rem" }} />
            {isLogin ? "Log in" : "Sign In"} with Google
          </Button>
          <Typography variant="subtitle1">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                fontFamily: "inherit",
                textDecoration: "underline",
              }}
              onClick={() => {
                setIsLogin(!isLogin);
              }}
            >
              {isLogin ? "Sign up" : "Log In"}
            </span>
          </Typography>
          {/* {errorM && <p style={{color:"red"}}>{errorM}</p>} */}
        </form>
      </Box>
    </Container>
  );
};

export default Auth;
