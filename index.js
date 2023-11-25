const express = require("express");

const app = express();
const port = 3000;

const User = require("./BACK/data/user");
const UserPost = require("./BACK/data/post");

const dbConnect = require("./BACK/baza.js");

app.listen(port, () => {
    console.log(`Systems online on port ${port}`);
});

//connect to db
dbConnect();

//use json data
app.use(express.json());

//access files public
app.use('/uploads', express.static("uploads"))

const cors = require("cors");
app.use(cors());

const user = require("./BACK/functions/userFunctions");
const userPost = require("./BACK/functions/postFunctions")
const upload = require("./MIDDLEWARE/upload.js")

app.get("/api/users",user.get);

app.post("/api/user/valueSearch", user.findByValue);
app.post("/api/user",user.post);
app.post("/api/user/login", user.login);

app.post("/api/user/deleteUser", user.deleteById);
app.put("/api/user", user.userUpdate);

app.get("/api/userPosts", userPost.get);

app.post("/api/userPost", upload.single('postImage'), userPost.post);
app.post("/api/userPost/deletePost", userPost.deleteById);
app.post("/api/userPost/valueSearch", userPost.findByValue);
app.post("/api/userPost/deletePost", userPost.deleteById);
app.put("/api/userPost", userPost.postUpdate)