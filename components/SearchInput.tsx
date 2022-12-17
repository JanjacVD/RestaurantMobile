import { Dispatch, SetStateAction } from "react";
import { TextInput, View } from "react-native";
import SearchIcon from "../assets/SearchIcon";

export default function SearchInput({value, setValue}: SearchInputProps){
    return(
        <View style={{width:'90%',marginTop:20, marginBottom:10,position:'relative'}}>
        <TextInput placeholder="Traži..." value={value} style={{fontSize:20,paddingLeft:20,borderColor:'#000', borderWidth:1, borderRadius:12,width:'100%', paddingVertical:10}} onChangeText={text => setValue(text.toLowerCase())}/>
        <SearchIcon style={{position:'absolute',right:10,top:5}}/>
   </View>
    )
}
interface SearchInputProps{
    value: string;
    setValue: Dispatch<SetStateAction<string>>
}