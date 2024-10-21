import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(); // Connect to the server
    setSocket(socketIo);

    // Cleanup the socket connection when the component unmounts
    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
