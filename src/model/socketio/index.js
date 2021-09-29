import {io} from "socket.io-client";

export const OpenConnection = ()=>{

    return io("https://2637-170-238-138-147.ngrok.io");

}
