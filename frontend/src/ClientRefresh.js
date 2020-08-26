import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { apiURL } from './util/apiURL'

const style = {
  position: "absolute",
  top: 10,
  right: 10,
  padding: "1em",
  zIndex: 100,
  backgroundColor: "pink",
  borderRadius: 5,
  textAlign: "center",
};

export default (props) => {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const API = apiURL();
  const socket = socketIOClient(API);

  useEffect(() => {
    const appRequiresRefresh = () => setNeedsRefresh(true);
    socket.on("majorUpdate", appRequiresRefresh);
    return () => socket.off("majorUpdate", appRequiresRefresh);
  }, [socket, API]);

  const reloadApp = (e) => {
    e.preventDefault();
    window.location.reload(true);
  };

  if (needsRefresh) {
    return (
      <div style={style}>
        <div>There has been an update.</div>
        <div>
          <a href="#" onClick={reloadApp}>
            Please Click To Reload
          </a>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
