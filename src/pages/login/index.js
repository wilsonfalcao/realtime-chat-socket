//Componentes e Libs
import React from "react";
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from "react-redux";

//Estilos e componentesx
import {styles} from "./style";

//Camada de serviço
import {expoAuthenticationGoogle} from "../../model/services/authRequest";

export default function Login ({navigation}){
    
    const googleAutentication = expoAuthenticationGoogle();
    const userGoogle  = useSelector(state => state.UseRedux);

    googleAutentication.listeningLogIn();

    return(

        <View style={styles.container}>
            {userGoogle &&

                <View style={{
                    flexDirection:"column",
                    height:130,
                    justifyContent:"space-between",
                }}>
                    <Icon.Button
                        name={"whatsapp"} 
                        backgroundColor={"green"}
                        onPress={()=>{
                            navigation.navigate("main");
                        }}
                        style={{justifyContent:"center",alignItems:"center"}}
                    >
                        <Text style={styles.buttonFont}>Ir para o chat</Text>
                    </Icon.Button>

                    <Icon.Button
                        name={"android"}
                        onPress={async ()=>{
                            await googleAutentication.logOut();
                        }}
                        backgroundColor={"red"}
                        style={{justifyContent:"center",alignItems:"center"}}
                    >
                        <Text style={styles.buttonFont}>Logout</Text>
                    </Icon.Button> 
                </View>
            
            }
            {!userGoogle &&

                <Icon.Button name="google" backgroundColor="rgb(243,114,0)"
                    onPress={ async ()=>{
                        
                        await googleAutentication.signIn();
                        
                    }}
                >
                    <Text style={{fontSize: 15 }}>
                    Login com Google
                    </Text>
                </Icon.Button>
            }
        </View>

    );
}