# Helper Queue / Job Tracker

[Live Site](https://helper-queue.netlify.app/)

### What does it do? 
An application that has two portals. One for admin and one for students. Students are able to request help as well as cancel their requests.  Under the Student Queue tab, admins will be able to filter students by class, see the order of requests, as well as close requests as the admin goes to assist students. An admin should close the request at the start of helping a student so that other admins will not think that person is still waiting for assistance. 

The other main feature of the application is the job tracker feature. Students are able to add jobs they've applied to, keep a wishlist of jobs, as well as edit the jobs / job status. 
They jobs are fully filterable by the jobs current status and ordered by most recently updated. From the stats page a fellow is able to quickly identify some of the high level stats on how effective their job search has been so far. 

### How do I get a local version of this running? 

1. Clone This repo. 
2. Install Postgres on your computer and the shell commands [help](https://github.com/joinpursuit/Pursuit-Core-Web/blob/master/fundamentals/local_environment/README.md). 
3. Create a [firebase](firebase.google.com) account 
    * Create a new project. Give it whatever name you like.
    * You don't need to enable google analytics but you can just leave it checked. Accept all terms and conditions.
    * Once the project is created (it takes about 30 seconds), click continue.
    * Click the `</>` icon to create a new firebase web app. Give it whatever name you like. 
    * **DO NOT** set up firebase hosting
    * Configure your frontend to use the new firebase auth keys
    * You'll see a bunch of configuration code - copy paste only the `config` object into an `.env` file on the root of the frontend. Then rewrite the config to match this format:

    ```
    REACT_APP_APIKEY=982342lkjsdfksdh23SDhfsnk-CX8E
    REACT_APP_AUTHDOMAIN=whatever.firebaseapp.com
    REACT_APP_DATABASEURL=https://something.firebaseio.com
    REACT_APP_PROJECTID=whatever-auth
    REACT_APP_STORAGEBUCKET=pursuit-whatever.appspot.com
    REACT_APP_MESSAGINGSENDERID=3245322
    REACT_APP_APPID=xxxx:xxx:Xxxxx:Xxxxx
    ```

    For each key in the object, uppercase it and prefix it with `REACT_APP_`. Otherwise it will be ignored by create-react-app. Also change the `:` to `=` and get rid of the comma at the end of the line. 

    Basically, what was this line:

    ```js
    apiKey: "982342lkjsdfksdh23SKhfsnk-CX8E",
    ```

    Becomes this line:

    ```
    REACT_APP_APIKEY="982342lkjsdfksdh23SKhfsnk-CX8E"
    ```

    * Click `continue to console` when done copy-pasting and rewriting.
    * Setup email/password authentication 
    * Scroll down and click the `authentication` card
    * Click the `sign-in method` tab
    * Click `Email/Password` and enable just the first checkbox. If you click both, firebase will email every user that signs up and require them to verify their account, so skip that for now because it makes testing with fake emails harder.
    * Click Save

    * Click the gear next to `Project Overview` and click `Project Settings`
    * Go to the `Service Accounts` tab and generate a new private key
    * Download the private key to your computer
    * Create another `.env ` file in the root of your backend, and add the private key info to the the  `.env`.     
    ```
    TYPE = service_account
    PROJECT_ID = 
    PRIVATE_KEY_ID = 
    CLIENT_ID = 
    AUTH_URI = 
    TOKEN_URI = 
    AUTH_PROVIDER_X509_CERT_URL = 
    CLIENT_X509_CERT_URL = 
    CLIENT_EMAIL = 
    PRIVATE_KEY = 

    ```
    * Change the `databaseURL` string in the `admin.initializeApp` config object to the one in the admin sdk example code

3. Next you  will need to create your database. 
    * Make sure the code in the schema file is all commented in:
    ```
    DROP DATABASE IF EXISTS helper_queue;
    CREATE DATABASE helper_queue;

    \c helper_queue;
    ```
    * Run the command `psql -f relativePathToSchemaFile`
    * Repeat this process of making sure code is commented in, and running the command for all migrations in the migration folder. Migrations should be run in order. 
5. Inside the backend .env file you'll need to add the following:
    * DATABASE_URL = postgres://localhost:5432/helper_queue
    * PORT = 3001
6. run `npm install` while inside the backend. Then run `node app.js` 
7. run `npm install` while inside the frontend. Then run `npm start`. 
8. Debug any problems and then make pull requests to improve instructions. 

### How should I report a bug or a feature add? 
Please create a new issue in the repository. 

### I've added a feature or solved a bug, what should I do? 
Please submit a PR request to be reviewed. Please make sure that your feature has full test coverage before submitting the request. 

### Technologies Used 
* PostgeSQL
* Node 
* Express 
* React 
* Redux Toolkit 
* Firebase 
