const express = require("express");

const app = express();
const port = 3000;

const User = require("./data/user")

const dbConnect = require("./baza.js");

app.listen(port, () => {
    console.log(`Systems online on port ${port}`);
});

//connect to db
dbConnect();

//use json data
app.use(express.json());

app.get("/", (req, res)=>{
    res.json({
        poruka: ":3",
    });
});

app.get("/api/users", async (req,res) => {
    try{
        const allUsers = await User.find();
        res.json({
            success: true,
            users: allUsers
        });
    }catch (err){
        res.json({
            success: false,
            errorMessage: err.message
        })
    }
});

app.post("/api/users", async (req, res) => {
    try{
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            interests: req.body.interests,
        });

        newUser.save();

        res.json({
            success: true,
            user: newUser
        })

    }catch (err){
        res.status(404).json({
            success: false,
            errorMessage: err.message
        })
    }
});


async function axTest(){
    console.log(await axios.get("/api/users"));
}