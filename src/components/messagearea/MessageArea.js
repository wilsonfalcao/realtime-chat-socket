import React,{useEffect} from "react";
import {View, FlatList} from "react-native";
import {useSelector} from "react-redux";

//Estilos e Componentes 
import {styles} from "./style";
import {ViewFromMessage,ViewToMessage} from "../flatListAreaMessage/FlatListMessage";

//Camada model e serviços
import {messageService} from "../../model/services/messageSocket";

export default function MessageArea(){

    const message = useSelector(state=>state.MessageRedux);
    const UseForm = useSelector(state=>state.UseRedux);
    const ServiceMessages = messageService();

    useEffect(()=>{
        ServiceMessages.OnlisteningMessage();
    },[]);

    const FlatListMessage = ({item}) => {

        if(item.from == UseForm.email){
            return(
                <ViewFromMessage item={item} />
            );
        }
    
        return(
            <ViewToMessage item={item} />
        );
    }
    
    return(
        <View style={styles.areaMessage}>
            <FlatList
                data={message}
                inverted={-1}
                renderItem={FlatListMessage}
                contentContainerStyle={styles.flatListContainer}
                keyExtractor={(_,index)=>index.toString()}
            />
        </View>
    );
}