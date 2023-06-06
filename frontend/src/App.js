import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import "./App.css";
import NavBar from "./components/NavBar";
import Create from "./components/pages/Create";
import Feed from "./components/pages/Feed";
import Post from "./components/pages/Post";
import Auth from "./components/pages/AuthPage";
import { useSelector } from "react-redux";
import NotFound from "./components/pages/NotFound";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Container  sx={{position: "relative"}}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Feed />} />
          {isLoggedIn && <Route path="/create" element={<Create />} />}
          <Route path="/posts" element={<Feed />} />
          <Route path="/posts/:postId" element={<Post />} />
          {!isLoggedIn && <Route path="/auth" element={<Auth />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
