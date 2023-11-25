const { array } = require("../../MIDDLEWARE/upload");
const userPost = require("../data/post");


async function get(req, res)
{
    try{
        let userPosts = await userPost.find();
        res.json({
            success: true,
            userPosts: userPosts
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
        const newPost = new userPost({
            uploadedBy: req.body.uploader,
            eventName: req.body.eventName,
            eventDateTime: req.body.eventDateTime,
            eventDescription: req.body.eventDescription,
            eventType: req.body.eventType,
            eventPrice: req.body.eventPrice,
            isFree: req.body.isFree,
            lat: req.body.lat,
            lon: req.body.lon,
            reserves: []
        });

        if(req.file){
            newPost.postImage = req.file.path
        }

        const savedPost = await newPost.save();
        let ID = (savedPost._id);
        console.log(ID);
        res.json({
            success: true,
            nPost: newPost,
            pid: ID
        });

    }catch (err){
        res.json({
            success: false,
            errorMessage: err.message
        })
    }
}

async function postUpdate(req, res)
{
    try{
        let newPost = await(userPost.findById(req.body.id));
            
        newPost.reserves = req.body.nReserves;

        await newPost.save();

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

async function deleteById(req, res){
    try{
        await userPost.deleteOne({ _id : req.body.targetId});

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

async function findByValue(req,res){
    try{
        let tg = req.body.target;

        let foundPost = await userPost.find({[tg] : req.body.value});

        if(foundPost.length != 0){
            res.json({
                fPost: foundPost,
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

// const fs = require('fs'); 
// const cors = require("cors");

// async function fsDelete(req,res){
//     fs.unlink(req.imgName, (err => {
//         if (err){
//             res.json({
//                 success: false,
//                 errorMessage: err.message
//             });
//         }
//         else {
//           console.log("\nDeleted file: example_file.txt");
//           res.json({
//             success: true
//         });
//         }
//       }));
// }

async function deleteById(req, res){
    try{
        await userPost.deleteOne({ _id : req.body.targetId});  
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


module.exports = new Object({
    "get":get,
    "deleteById":deleteById,
    "post":post,
    "findByValue":findByValue,
    "deleteById": deleteById,
    "postUpdate": postUpdate
});