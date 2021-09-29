import {OpenConnection} from "../socketio";
import {useDispatch} from "react-redux";

const InitializeSocket = OpenConnection();

export const messageService = (CallBack) =>{

    InitializeSocket.on("chat-message",CallBack);

}

export const SenData =()=>{

    const ChatMessage = (MessageText) =>{
        InitializeSocket.emit("chat-message",MessageText);
    }

    return {
        ChatMessage,
    }
    
}