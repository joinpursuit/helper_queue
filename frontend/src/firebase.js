import app from "firebase/app";
import "firebase/auth";

const {
  REACT_APP_APIKEY,
  REACT_APP_AUTHDOMAIN,
  REACT_APP_DATABASEURL,
  REACT_APP_PROJECTID,
  REACT_APP_STORAGEBUCKET,
  REACT_APP_MESSAGINGSENDERID,
  REACT_APP_APPID,
} = process.env;

const {
  REACT_APP_APIKEY_DEV,
  REACT_APP_AUTHDOMAIN_DEV,
  REACT_APP_DATABASEURL_DEV,
  REACT_APP_PROJECTID_DEV,
  REACT_APP_STORAGEBUCKET_DEV,
  REACT_APP_MESSAGINGSENDERID_DEV,
  REACT_APP_APPID_DEV,
} = process.env;


const configProd = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  databaseURL: REACT_APP_DATABASEURL,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
  messagingSenderId: REACT_APP_MESSAGINGSENDERID,
  appId: REACT_APP_APPID,
};

const configDev = {
  apiKey: REACT_APP_APIKEY_DEV,
  authDomain: REACT_APP_AUTHDOMAIN_DEV,
  databaseURL: REACT_APP_DATABASEURL_DEV,
  projectId: REACT_APP_PROJECTID_DEV,
  storageBucket: REACT_APP_STORAGEBUCKET_DEV,
  messagingSenderId: REACT_APP_MESSAGINGSENDERID_DEV,
  appId: REACT_APP_APPID_DEV,
};

if(process.env.NODE_ENV === "production") {
  app.initializeApp(configProd);
} else {
  app.initializeApp(configDev);
}


export default app;