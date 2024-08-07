import React, { createContext, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const SOCKET_BASE_URL=import.meta.env.VITE_SOCKET_BASE_URL
  console.log("SOCKET_BASE_URL",SOCKET_BASE_URL);
  const socketRef = useRef();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("User from state:", user); // Debugging user object

    socketRef.current = io(SOCKET_BASE_URL, {
      query: { userId: user?._id },
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to server with socket ID:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socketRef}>
      {console.log("Providing socket:", socketRef)}
      {children}
    </SocketContext.Provider>
  );
};
