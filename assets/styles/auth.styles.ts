import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";
import { Platform } from 'react-native'



const PLATFORM = Platform.OS

export const AuthStyles = (colors:ColorScheme)=>{
 const createStyle = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:50
    },
    safeArea:{
        flex:1,
    },
    logoContainer:{
        flexDirection:'column',
        alignItems:"center",
        alignContent:"center",
        borderRadius: "100%",
        borderWidth:10,
        borderColor:colors.primary,
        padding:15,
        flexGrow:0,
        alignSelf:'center',
    },
    logoText:{
        fontSize:30,
        color:colors.primary,
        textAlign:'center',
        fontWeight:500,
        marginTop:10
    },
    subLogoText:{
        fontSize:20,
        color:colors.primary,
        textAlign:'center',
        marginTop:5,
        fontWeight:400
    },
    logo:{
        height: 10,
        width:10
    },
    inputContainer:{
        flexDirection:'column',
        paddingHorizontal:10,
        marginBottom:20,
        marginTop:40,
        gap:10

    },
    inputField:{
        backgroundColor:colors.primary,
        opacity:0.5,
        height:50,
        borderRadius:20,
        padding:5,
        flexDirection:'row',
        alignItems:'center'
    },
    btn:{
        display: 'flex', 
        flexDirection: 'row', 
        gap: 3,
        height:50,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
    btnText:{
        color:"#ffff"
    }
    

})

return createStyle
}
