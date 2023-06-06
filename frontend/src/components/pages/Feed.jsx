import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    fetch("http://localhost:8080/feed/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data.posts);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Container>
      <Box>
        {posts.map((post) => {
          return (
            <Link to={`/posts/${post._id}`}>
              <Box
                sx={{
                  display: "flex",
                  borderBottom: "1px solid #A6A6A6",
                  margin: "1rem 0",
                  paddingBottom: "1rem",
                  justifyContent: "flex-start",
                }}
              >
                <Box sx={{ marginRight: "1.5rem", height:"200px", width:"350px" }}>
                  <img style={{objectFit: "cover", width: "100%", height:"100%"}} src={`http://localhost:8080/${post.image}`} />
                </Box>
                <Box sx={{}}>
                  <Typography variant="subtitle2" color={"#A6A6A6"}>
                    {post.creator}
                  </Typography>
                  <Typography variant="caption" color={"#A6A6A6"}>
                    {post.date}
                  </Typography>

                  <Typography
                    variant="h6"
                    fontWeight={"600"}
                    fontFamily={"inherit"}
                  >
                    {post.title}
                  </Typography>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Container>
  );
};

export default Feed;
