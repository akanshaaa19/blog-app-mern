import { Box, Container, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Post = () => {
  const postId = useParams().postId;
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/feed/${postId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPost(data.post);
      });
  }, []);
  return (
    <Container  sx={{paddingBottom: "3rem"}}>
        <Box sx={{position: "absolute", color: "white", padding: "1rem"}}>
            <Link to="/posts"><ArrowBackIosIcon /></Link>
        </Box>
      <Box sx={{height:"250px", marginBottom: "2rem"}}>
        <img
          style={{objectFit: "cover", width: "100%", height:"100%"}}
          src={`http://localhost:8080/${post.image}`}
        />
      </Box>
      <Box>
        <Box marginBottom={"1.5rem"} >
          <Typography variant="h5" fontWeight={"bold"} fontFamily={"inherit"}>
            {post.title}
          </Typography>
          <Typography variant="subtitle">{post.creator}</Typography>
        </Box>
        <Typography variant="body1" textAlign={"justify"} >
          {post.content}
        </Typography>
      </Box>
    </Container>
  );
};

export default Post;
