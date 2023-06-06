import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../authState";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          fontWeight={"700"}
          fontFamily={"inherit"}
          color="#121212"
        >
          BlogSpot
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ margin: "0 1rem" }}>
          <NavLink to="/create">Create</NavLink>
        </Box>
        <Box sx={{ margin: "0 1rem", color: "inherit" }}>
          <NavLink to="/posts">Browse</NavLink>
        </Box>
      </Box>
      <Box>
        {!isLoggedIn ? (
          <Button
            sx={{color:"#272727", fontWeight: "600", border: "1px solid #272727", borderRadius: "10px"}}
            onClick={() => {
              navigate("/auth");
            }}
          >
            Sign In
          </Button>
        ) : (
          <Button
          sx={{color:"#272727", fontWeight: "600", border: "1px solid #272727", borderRadius: "10px"}}
            onClick={() => {
              dispatch(authActions.logout());
            }}
          >
            Log Out
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
