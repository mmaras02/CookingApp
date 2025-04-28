import { StyleSheet } from 'react-native';
import COLORS from './colors';

const globalStyles = StyleSheet.create({
    TitleText:{
      color: COLORS.text,
      fontSize: 25,
      fontWeight: 'bold',
      fontFamily: 'Quicksand_700Bold',
    },
    text: {
      fontSize: 18,
      color: COLORS.text,
      marginRight: 5,
      fontWeight: 500,
      fontFamily: 'Quicksand_700Bold',
    },
    image: {
      width: 170,
      height: 220,
      resizeMode: 'cover',
      borderRadius: 5,
      elevation: 8,
    },
    button: {
      margin: 8,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: COLORS.light_green,
      padding: 12,
      borderRadius: 5,
    }
})

export default globalStyles;
/*orange: #f2a76d
green: #7f9481
neutral: #f6f6f6*/