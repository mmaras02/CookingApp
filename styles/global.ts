import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    TitleText:{
        color: 'rgba(5, 41, 29, 0.83)',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5,
    },
    text: {
        fontSize: 18,
        color: 'rgba(5, 41, 29, 0.83)',
        marginRight: 5,
        fontWeight: 500
      },
      image: {
        width: 170,
        height: 220,
        resizeMode: 'cover',
        borderRadius: 5,
        elevation: 8,
      },
})

export default globalStyles;
/*orange: #f2a76d
green: #7f9481
neutral: #f6f6f6*/