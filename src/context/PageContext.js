import { createContext, useContext } from 'react';

export const FriendListRequestContext = createContext();
export const ChatContainerContext = createContext();
export const ChatInterfaceContext = createContext();
export const AuthContext = createContext();

export const useChatContainerContext = () => useContext(ChatContainerContext);
export const useFriendListRequestContext = () => useContext(FriendListRequestContext);
export const useChatInterfaceContext = () => useContext(ChatInterfaceContext);
export const useAuthContext = () => useContext(AuthContext);
