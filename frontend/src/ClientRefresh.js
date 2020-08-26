import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from './providers/SocketProvider';
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
  const socket = useContext(SocketContext);

  useEffect(() => {
    const appRequiresRefresh = () => setNeedsRefresh(true);
    socket.on("majorUpdate", appRequiresRefresh);
    return () => socket.off("majorUpdate", appRequiresRefresh);
  }, [socket]);

  useEffect(() => {
    const changeLinksToRefresh = () => {window.updateRequired = true}
    socket.on("minorUpdate", changeLinksToRefresh);
    return () => socket.off("minorUpdate", changeLinksToRefresh);
  }, [socket]);

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
