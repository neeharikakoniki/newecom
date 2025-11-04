import { StyleSheet, View } from 'react-native';
import React from 'react';
import { AppColors } from '../../styles/colors';
import { s, vs } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 

const HomeHeader = () => {
  return (
    <LinearGradient
      colors={[AppColors.primary, '#4AC29A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      
      <Ionicons
        name="cart-sharp" 
        size={s(32)} 
        color="#fff"
        style={styles.icon}
      />
    </LinearGradient>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    height: vs(50), 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    marginTop: vs(15), 
  },
});
