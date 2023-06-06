import {
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useRef, useState } from "react";

const Create = () => {
  const date = new Date();
  const dateSTring = date.toDateString().split(" ");
  const time = date.toLocaleTimeString().split(":");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitHandeler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('date', new Date().toLocaleDateString())
    formData.append('creator', )


    fetch("http://localhost:8080/feed/posts", {
      method: "POST",
      body: formData,
    });

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  return (
    <Container
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <form
        encType="multipart/form-data"
        style={{ width: "100%" }}
        onSubmit={submitHandeler}
      >
        <Typography
          variant="h5"
          fontWeight={"bold"}
          width={"100%"}
          marginBottom={2}
        >
          Create a post
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            sx={{ width: "100%", margin: "1rem 0" }}
            id="outlined"
            label="Title"
            name="title"
            // value={title}
            // onChange={(e) => {
            //   setTitle(e.target.value);
            // }}
          />
          <TextField
            multiline
            sx={{ width: "100%", margin: "1rem 0" }}
            id="outlined-multiline-static"
            label="Content"
            name="content"
            rows={10}
            // value={content}
            // onChange={(e) => {
            //   setContent(e.target.value);
            // }}
          />
          <div className="file-input-wrapper">
            <input type="file" className="file-nput" name="image" />
            <label htmlFor="myFileInput" className="file-input-label">
              <AddPhotoAlternateIcon color="#e2e2e2" />
              Choose a file
            </label>
          </div>
          {/* <Input
            sx={{
              // width: "100%",
              // border: "1px solid #d7d7d7",
              // bgcolor: "#e7e7e7",
            }}
            type="file"
          /> */}
        </Box>
        <Box
          sx={{
            padding: "0.8rem 0",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </Container>
  );
};

export default Create;
