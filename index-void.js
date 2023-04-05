// Bring in environment secrets through dotenv
require('dotenv/config')

// Use the request module to make HTTP requests from Node
const request = require('request')

// Run the express app
const express = require('express')
const app = express()
let access_token = "";
let scopes = "";

app.get('/', (req, res) => {

        // Request an access token using the account id associated with your app

        let url = 'https://zoom.us/oauth/token?grant_type=account_credentials&account_id=' + process.env.account_id;
        
        request.post(url, (error, response, body) => {
           
            // Parse response to JSON
            body = JSON.parse(body);
            access_token = body.access_token;
            scopes = body.scope

            // Logs your access token and scopes in console
            console.log(`access_token: ${access_token}`);
            console.log(`scope: ${scopes}`)

            if (body.access_token) {
                // We can now use the access token to authenticate API calls
                // Send a request to get your user information using the userID of the user. You can also use email instead if the userID.
                request.get('https://api.zoom.us/v2/users/' + process.env.user_id, (error, response, body) => {
                        console.log(`User Id is ${process.env.user_id}`)
                    if (error) {
                        console.log('API Response Error: ', error)
                    } else {
                        body = JSON.parse(body);
                        // Display response in console
                        //console.log('API call ', body);
                        // Display Websocket in browser
                        res.send(`
                        <html>

                        <head>
                            <title>websocket</title>
                        </head>
                        
                        <body>
                        <script>
                        <!-- open the websocket connection -->
                            var exampleSocket = new WebSocket("wss://ws.zoom.us/ws?subscriptionId=${process.env.subscription_id}&access_token=" + '${access_token}');
                        
                            exampleSocket.onopen = function (event) {
                                log("Connection...");
                                // Send the command module = heartbeat to keep the connection alive every 30 seconds
                                var msg = {
                                    module: "heartbeat"
                                };
                                // Send the msg object as a JSON-formatted string.
                                exampleSocket.send(JSON.stringify(msg));
                            };
                        
                        
                            exampleSocket.onmessage = function (event) {
                                // Do we need to print this in the console?????
                                console.log(JSON.stringify(event.data));
                                log(event.data)     
                            }
                        
                            exampleSocket.onclose = function(event){
                                // Do we need to print this in the console?????
                                console.log(JSON.stringify(event));
                                console.log(event);
                
                            }
                        
                            var t = setInterval(function(){ 
                                var msg = {
                                    module: "heartbeat"
                                };
                                exampleSocket.send(JSON.stringify(msg));
                                log(JSON.stringify(msg));
                            }, 25000);

                        
                            function log(text){
                                var txt = document.createTextNode(text);
                                var p = document.createElement("p");
                                p.appendChild(txt);
                                // Do we need to print this in the console?????
                                console.log(txt)
                                document.body.appendChild(p);
                            }
                        </script>
                        </body>
                        </html>
                        `);
                    }
                }).auth(null, null, true, body.access_token);

            } else {
                // Handle errors, something's gone wrong!
            }

        }).auth(process.env.clientID, process.env.clientSecret);

        return;
    
   })
app.listen(4000, () => console.log(`Zoom Hello World app listening at PORT: 4000`))