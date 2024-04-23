const express= require("express");
const path =require("path");
const app = express();


app.use(express.static(path.join(__dirname,'static')));


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/home.html'))
})
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/home.html'))
})
app.get("/details",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/details.html'))
})
app.get("/mytickets",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/mytickets.html'))
})
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/login.html'))
})
app.get("/orderstatus",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/orderstatus1.html'))
})
app.get("/orderbill",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/orderbill1.html'))
})
app.get("/payment",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/payment.html'))
})
app.get("/user",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/user.html'))
})
app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/signup.html'))
})
app.get("/olduser",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/olduser.html'))
})
app.get("/verification",(req,res)=>{
    res.sendFile(path.join(__dirname,'/HTML/verification1.html'))
})
app.use((req, res) => {
    res.status(404).send("<h1>404 - Not Found</h1>");
});



app.listen(3000,()=>{
    console.log(`Server running at http://127.0.0.1:3000/`);
});


