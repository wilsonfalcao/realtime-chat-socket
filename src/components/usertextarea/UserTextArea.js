//Componentes e dependências do react
import React, {useState,useRef} from "react";
import {useSelector} from "react-redux";

//Estilos é componentes
import {styles} from "./style";
import {View, Platform, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

//Camada de serviços
//import {sendMessageToServer} from "../../model/services/messagingOp";
import {SenData} from "../../model/services/messageSocket";


export default function UserTextArea(){

    const [text, setText] = useState(null);
    const visibleIconButton = useRef(false);
    const userInform =  useSelector(state => state.UseRedux);
    const socketSendText = SenData();

    const messageCreate = (messageBody) =>{
        return {
            to:"server",
            from:userInform.email,
            date:Date.now(),
            body:messageBody,
            profile:userInform.photoUrl,
            msgid:0,
            state:false,
        };
    }

    return(
        <View style={styles.areaInputSendText}>
            <View style={styles.areaInputDirectionPadding}>
                <View style={styles.imageCircle40}>
                    <Image style={styles.imageRadius50}
                        source={{uri:userInform.photoUrl,}}
                    />
                </View>
                <View style={styles.areaInputStyles}>
                    <TextInput
                        multiline={true}
                        placeholder="Envie seu comentário..."
                        placeholderTextColor="rgb(255,255,255)" 
                        style={styles.inputStyle}
                        keyboardType={Platform.OS === "ios" ? "twitter" : "default"}
                        autoFocus={true}
                        multiline={true}
                        onChangeText={(text)=>{
                            setText(text);

                            if(text.length > 0){
                                
                                visibleIconButton.current.setNativeProps({style:{
                                    display:"flex",
                                }});
                            }

                            if(text.length < 1){
                                
                                visibleIconButton.current.setNativeProps({style:{
                                    display:"none",
                                }});
                            }

                        }}
                        value={text}
                    />
                    <TouchableOpacity onPress={()=>{
                        socketSendText.ChatMessage(messageCreate(text));
                        setText("");
                    }} 
                    ref={visibleIconButton} style={[styles.iconCircle,styles.displayNone]}>
                        <Icon name={"send"} size={19} color={"rgb(255,255,255)"}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}