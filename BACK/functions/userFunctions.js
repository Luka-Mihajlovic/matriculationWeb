const user = require("../data/user");


async function get(req, res)
{
    try{
        let users = await user.find();
        res.json({
            success: true,
            users: users
        });
    }
    catch(err){
        res.json({
            success: false,
            errorMessage: err.message
        });
    }
}

async function post(req, res)
{
    try{
        const newUser = new user({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            interests: req.body.interests,
        });

        const savedUser = await newUser.save();
        let ID = (savedUser._id);
        console.log(ID);
        res.json({
            success: true,
            user: newUser,
            uid: ID
        });

    }catch (err){
        res.json({
            success: false,
            errorMessage: err.message
        })
    }
}

async function login(req,res)
{
    try{
        const users= await user.find();
        let x = false;

        for(let i = 0; i<users.length;i++)
        {
            let e = users[i];
            if(req.body.email === e.email && req.body.password === e.password)
            {
                x=true;
                res.json({
                    success: true,      
                    username: e.username,              
                    id: e._id
                });
                break;
            }
        }
        if(!x)
        {
            res.json({
                success: false
            });
        }
    }
    catch(err){
        res.json({
            success: false,
            errorMessage: err.message
        });
    }
}

async function findByValue(req,res){
    try{
        let tg = req.body.target;

        let foundUser= await user.find({[tg] : req.body.value});

        if(foundUser.length != 0){
            res.json({
                fUser: foundUser,
                success: true,
                found: true
            })
        }else{
            res.json({
                success: true,
                found: false
            })
        }
    }
    catch(err){
        res.json({
            success: false,
            errorMessage: err.message
        });
    }
}

async function deleteById(req, res){
    try{
        await user.deleteOne({ _id : req.body.targetId});

        res.json({
            success: true,
            deleted: req.body.targetId 
        })
    }
    catch(err){
        res.json({
            success: false,
            errorMessage: err.message
        });
    }
}

async function userUpdate(req, res)
{
    try{
        let newUser = await(user.findById(req.body.id));
            
        newUser.password=req.body.newPassword;
        newUser.interests=req.body.newInterests;

        await newUser.save();

        res.json({
            success: true,
        });
    }
    catch(err){
        res.json({
            success: false,
            errorMessage: err.message
        });
    }
}

module.exports = new Object({
    "get":get,
    "post":post,
    "login":login,
    "findByValue":findByValue,
    "deleteById":deleteById,
    "userUpdate": userUpdate
});