# Zoom Server-to-Server OAuth with Websockets

Use of this sample app is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html)

This is a sample app using a Server-to-Server OAuth app Account ID, Client ID and Client Secrete to create OAuth token, used to call the Zoom API and receive Webhsocket events

Follow allong with relevant Zoom Server-to-Server OAuth documentation as we set this up:

1. [Create a Server-to-Server Oauth app](https://marketplace.zoom.us/docs/guides/build/server-to-server-oauth-app)


## Setup app locally
Clone and install the app and it's dependencies. We'll be using [Express](https://www.npmjs.com/package/express) for a basic Node.js server, [dotenv](https://www.npmjs.com/package/dotenv) for our credentials, [requests](https://www.npmjs.com/package/requests) to make HTTP requests and [nodemon](https://www.npmjs.com/package/nodemon) for easier development refreshing. 

```bash
git clone https://github.com/just-zoomit/zoom-websockets
```

```bash
cd server-to-server-app && npm install 
```

Run server:

```bash
npm run start
``` 

### Setup dotenv
Create a .env file in which to store you access credentials (accountID, clientID and clientSecret)

```bash
touch .env
```

Copy the following into this file, which we'll add your own values to:

```
account_id=
clientID=
clientSecret=
user_id=
subscription_id=

```

> Remember: Never share or store your client credentials publicly. Your `.env` is included in the `.gitignore` file to ensure these files won't be included in a git workflow.

### Create an OAuth App on the Zoom App Marketplace

Sign in to the Zoom App Marketplace and [Create a Server-to-Server OAuth App](https://marketplace.zoom.us/develop/create?source=devdocs). 

Creating this app will generate your Account Credentials (Account ID, Client ID and Client Secret) needed to get an access token.

Copy these credentials and add them to your `.env` file.

Example:

```
account_id=YOUR_ACCOUNT_ID
clientID=YOUR_CLINET_ID
clientSecret=YOUR_CLINET_SECERET
user_id=me
subscription_id=YOUR_SUBSCRIPTION_ID
```

### Fill out app information.

To activate the app, we'll need to add some quick info on the app. Add in the following: 

1. *Short Description*
2. *Company Name*
3. *Developer Name*
4. *Developer Contact*

### Add Scopes 

OAuth is used to guarantee that an app only has access to the data you authorize. If an app does not have the required scope, the generated token will be invalid and you it wont be able to call the API. 

To request data, we'll need to add a Scope to our app. The only data we need is for a user's profile information. Click **+ Add Scopes** and add *"View all user information"* (`user:read:admin`). Click **Done** and continue on to the Activation page. Click **Activate your app**.

### Add Websocket Events

Enable the Event Subscriptions in your app [Event Subscriptions](https://marketplace.zoom.us/docs/guides/tools-resources/webhooks#event-subscriptions)

Add an Event Subscription and select Websockets as Method type, make sure to add the events "meeting has been created" and "meeting has been created" and "meeting has been deleted". Once that's done, an endpoint URL will get generated for you and we are going to use it to open the Websocket connection for our sample app (Line 54 in our index.js file). Click save and go to the Activation Tab to finally activate your app.

## Using your app
With our app running on `[localhost:4000/websocket](http://localhost:4000/websocket)`, you will see the Websocket Conection open and you will be expecting to receive the payload for the events you have subscribed to and see them printed in the browser.


## Next steps
Follow our documentation on Server-to-Server OAuth with Zoom for more information on building an app on the Zoom App Marketplace.

Happy coding!

## Need help?
If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.
