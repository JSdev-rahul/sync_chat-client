import React, { createContext, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("User from state:", user); // Debugging user object

    socketRef.current = io("http://localhost:3001", {
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
