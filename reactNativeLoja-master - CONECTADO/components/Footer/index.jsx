import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Roupas from '../Roupas'


export default function Footer() {
 return (
   <View>
       <Text style={styles.title}>VOCÊ TAMBEM PODE GOSTAR</Text>
       <View style={{flexDirection: 'row'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{marginHorizontal: 10}}>
                <Roupas img={require('../../assets/images/1.png')} cost="110,90">
                    Nike Air Max Dia   
                </Roupas>
            </View>
            <View style={{marginHorizontal: 10}}>
                <Roupas img={require('../../assets/images/5.png')} cost="360,90">
                    Nike Epic React Flyknit 2 
                </Roupas>
            </View>
            <View style={{marginHorizontal: 10}}>
                <Roupas img={require('../../assets/images/3.png')} cost="890">
                    Nike Squidward Tentacles   
                </Roupas>
            </View>
        </ScrollView> 
       </View>
   </View>
  );
}

const styles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontFamily: 'Anton_400Regular',
        marginVertical: '2%',
        paddingHorizontal: '2%',
    }
})