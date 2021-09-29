import {OpenConnection} from "../socketio";
import {useDispatch} from "react-redux";

const InitializeSocket = OpenConnection();

export const messageService = () =>{

    const dispatch = useDispatch();

    function OnlisteningMessage(){
        InitializeSocket.on("chat-message",data=>{
            dispatch({
                type:"@message/GETMESSAGE",
                message:data,
            });
        });
    }

    return {
        OnlisteningMessage,
    }
    
}

export const SenData =()=>{

    const ChatMessage = (MessageText) =>{
        InitializeSocket.emit("chat-message",MessageText);
    }

    return {
        ChatMessage,
    }
    
}