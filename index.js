// Bring in environment secrets through dotenv
require("dotenv/config");

// Use axios to make HTTP requests from Node
const axios = require("axios");
const path = require('path')
const fs = require("fs");


// Run the express app
const express = require("express");
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
let access_token = "";
let scopes = "";

async function getAccessToken() {
  try {
    const response = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.account_id}`,
      null,
      {
        auth: {
          username: process.env.clientID,
          password: process.env.clientSecret,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token: ", error.message);
    throw error;
  }
}

app.get("/websocket", async (req, res) => {
  try {
    const acc = await getAccessToken();
    
      // Read the HTML file
      fs.readFile("public/index.html", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
          return;
        }

        // Replace the access token in the HTML code
        data = data.replace("${access_token}", acc);

        // Send the HTML code as the response
        res.send(data);
      });
    
  } catch (error) {
    console.error("Error handling request: ", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(4000, () =>
  console.log(`Zoom Hello World app listening at PORT: 4000`)
);