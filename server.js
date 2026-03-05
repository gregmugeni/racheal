/*
=====================================================
RACHEL'S LOANS & COLLATERAL AUCTIONS SERVER
=====================================================
*/

const express = require("express");
const path = require("path");
const cron = require ("node-cron");
const axios = require ('axios');

const app = express();
const PORT = 3000;
const PING_URL = "https://loansandauctions.onrender.com";

// Schedule a job to run every 10 minutes
cron.schedule("*/10 * * * *", async () => {
    try {
        const response = await axios.get(PING_URL);
        console.log("App pinged successfully:", response.status);
    } catch (error) {
        console.error("Error pinging app:", error.message);
    }
});

console.log("Cron job scheduled to keep the app awake.");

/*
-----------------------------------------
MIDDLEWARE
-----------------------------------------
*/

// built-in json parser (no need for body-parser)
app.use(express.json());

/*
-----------------------------------------
SERVE FRONTEND FILES
-----------------------------------------
*/

app.use(express.static(path.join(__dirname, "public")));





/*
Explicit homepage route
This guarantees index.html loads
*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/*
-----------------------------------------
DATABASE (TEMP MOCK DATA)
-----------------------------------------
*/

let loanApplications = [];

let auctionItems = [
{
id:1,
name:"Toyota Wish 2008",
price:"12,000,000 UGX",
image:"https://images.unsplash.com/photo-1619767886558-efdc259cde1a"
},

{
id:2,
name:"55 Inch Samsung TV",
price:"1,200,000 UGX",
image:"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1"
},

{
id:3,
name:"Land Title - Wakiso",
price:"18,000,000 UGX",
image:"https://images.unsplash.com/photo-1560518883-ce09059eeffa"
}
];

/*
-----------------------------------------
GET AUCTION ITEMS
-----------------------------------------
*/

app.get("/api/auctions", (req,res)=>{
res.json(auctionItems);
});

/*
-----------------------------------------
LOAN APPLICATION API
-----------------------------------------
*/

app.post("/apply-loan",(req,res)=>{

const data = req.body;

loanApplications.push(data);

console.log("NEW LOAN APPLICATION:",data);

res.json({
message:"Application received. Rachel's team will contact you."
});

});

/*
-----------------------------------------
START SERVER
-----------------------------------------
*/

app.listen(PORT, ()=>{
console.log(`Rachel Loans server running on http://localhost:${PORT}`);
});