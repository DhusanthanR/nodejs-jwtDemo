const express = require("express");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();

dotenv.config()
app.use(express.json())
const posts = [
  {
    name: "name1",
    title: "Post 1",
  },
  {
    name: "name2",
    title: "Post 1",
  },
  {
    name: "name3",
    title: "Post 1",
  }
];

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.name === req.user.name));
    console.log("called get "+req.user.name)
})

// app.post('/login', (req,res)=>{

//     const username = req.body.username

//     const user = {name:username}

//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

//     res.json({accesstoken : accessToken})
//     console.log("called login "+user.name)
// })

function  authenticateToken(req, res, next){

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })

}

app.listen(3000);
