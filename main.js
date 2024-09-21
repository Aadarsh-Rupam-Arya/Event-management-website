const express = require("express");
const path = require("path"); 
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3010;

// const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://aadarsharya10:3105Aadi%23@cluster0.q0ilc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const dbName = "Magic_Moments";

const collectionName = "users";



app.use(express.static(path.join(__dirname,'static')));
app.use(express.static(path.join(__dirname,'CSS')));


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
app.get("/new",(req,res)=>{
  res.sendFile(path.join(__dirname,'/HTML/new.html'))
})


app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "/HTML/profile.html"));
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/HTML/signup.html");
});

app.post("/verification", async (req, res) => {
  const { name, email, num } = req.body;

  res.redirect(`/password?name=${name}&email=${email}&num=${num}`);
});

app.get("/password", (req, res) => {
  res.sendFile(__dirname + "/HTML/password.html");
});

app.post("/saveUserDetails", async (req, res) => {
  const { name, email, num, password } = req.body;

  await saveUserDetails({ name, email, num, password });
  // res.sendFile(__dirname + "/NEW/password.html");
  res.redirect('/user');
});

async function saveUserDetails(userDetails) {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);

    const collection = db.collection(collectionName);

    await collection.insertOne(userDetails);
    console.log("User signup details saved successfully");
  } catch (error) {
    console.error("Error saving user signup details:", error);
  } finally {
    await client.close();
  }
}

// login page
{
  app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/HTML/login.html");
  });

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await verifyUser(email, password);

    if (user) {
      // res.redirect('/user');
      res.send('<script>alert("You are successfully Login."); window.location.href = "/user";</script>');

    } else {
      // res.redirect('/login');
       res.send('<script>alert("Invalid Email or Password! Please Try Again."); window.location.href = "/login";</script>');
    }
  });

  async function verifyUser(email, password) {
    const client = new MongoClient(uri);

    try {
      await client.connect();

      const db = client.db(dbName);

      const collection = db.collection(collectionName);

      const user = await collection.findOne({ email, password });

      return user;
    } catch (error) {
      console.error("Error verifying user:", error);
      return null;
    } finally {
      await client.close();
    }
  }
}

// text db

{
  app.get("/feedback", (req, res) => {
    res.sendFile(path.join(__dirname, "/HTML/feedback.html"));
  });
 

  app.post("/saveData", async (req, res) => {
    const { data } = req.body;
    await saveData({ data });
    res.send('<script>alert("Your feedback is submited."); window.location.href = "/mytickets";</script>');
  });

  async function saveData(dataDetails) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection("Feedbacks");
      await collection.insertOne(dataDetails);
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      await client.close();
    }
  }
}


app.use((req, res) => {
      res.status(404).send("<h1>404 - Not Found</h1>");
  });
  

app.listen(port, () => {
  console.log(`Server is listening at http://127.0.0.1:${port}`);
});
