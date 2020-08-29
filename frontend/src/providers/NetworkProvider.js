import React, { createContext, useState, useEffect } from "react";

export const NetworkContext = createContext();

    const style = {
      position: "absolute",
      top: 10,
      right: 10,
      padding: "1em",
      zIndex: 2000,
      backgroundColor: "pink",
      borderRadius: 5,
      textAlign: "center",
    };

const NetworkProvider = (props) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const handleConnectionChange = () => {
      if (navigator.onLine) {
        const webPing = window.setInterval(() => {
          fetch("//google.com", { mode: "no-cors" })
            .then(() => {
              setIsConnected(true);
              clearInterval(webPing);
            })
            .catch(() => setIsConnected(false));
        }, 2000);
      } else {
        return setIsConnected(false);
      }
    };
    handleConnectionChange();
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);
    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);
  return (
    <NetworkContext.Provider value={isConnected}>
    {isConnected ? null :  <div style={style}><div>Currently Offline</div></div>}
      {props.children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;

// Lots of code inspired by this article: https://www.codementor.io/@nedson/a-guide-to-handling-internet-disconnection-in-react-applications-rs7u9zpwn
