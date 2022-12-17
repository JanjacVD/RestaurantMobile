import {View, StyleSheet} from "react-native";
import Container from "../components/Container";
import SquareButton from "../components/SquareButton";
import { RouterProps } from "../data/Interfaces";

export default function HomeScreen({navigation}: RouterProps) {
  return (
    <Container>
      <View style={Styles.containerCentered}>
          <View style={Styles.containerRow}>
              <SquareButton text="Jelovnik" action={() => navigation.navigate('Menu',{screen:'MenuHomeScreen', initial:false})}/>
              <SquareButton text="Rezervacije" action={() => navigation.navigate('Menu')}/>
          </View>
          <View style={Styles.containerRow}>
              <SquareButton text="Galerija" action={() => navigation.navigate('Menu')}/>
              <SquareButton text="Skener" action={() => navigation.navigate('Menu')}/>
          </View> 
          <View style={Styles.containerRow}>
              <SquareButton text="Postavke" action={() => navigation.navigate('Menu')}/>
              <SquareButton text="Osoblje" action={() => navigation.navigate('Menu')}/>
          </View>
      </View>
    </Container>
  );
}
const Styles = StyleSheet.create({
 
  containerCentered: {
    marginTop:'10%',
    paddingTop: "10%",
    height:'90%',
    borderRadius:9,
    width:'90%',
    display:'flex',
    flexDirection:'column'
  },
  containerRow: {
    display:'flex',
    flexDirection:'row',
    
  },
  textLarge: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
  },
  textMedium: {
    marginTop:10,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
    flexWrap:'nowrap'
  },
  button:{

  }
});
