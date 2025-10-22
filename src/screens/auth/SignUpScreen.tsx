import { StyleSheet, Text, Image , View} from "react-native";
import React, { useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("")
  const navigation = useNavigation()

  return (
    
    <AppSaveView style={styles.container}>
      <View style={styles.circleLightBottom} />
            <View style={styles.circleDarkBottom} />
            <View style={styles.circleDarkTop} />
      
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInput placeholder="User Name" onChangeText={setUserName}/>
      <AppTextInput placeholder="Email" onChangeText={setEmail} />
      <AppTextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
      />
      <AppButton title="Create New Account" />
      <AppButton
        title="Go To Sign In"
        style={styles.signInButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignInScreen")}
      />
    </AppSaveView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: s(150),
    width: s(150),
    marginBottom: vs(30),
  },
  appName: {
    fontSize: s(16),
    marginBottom: vs(15),
  },
  signInButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
  circleLightBottom: {
    position: 'absolute',
    bottom: -vs(100),
    right: -s(80),
    width: s(250),
    height: s(250),
    borderRadius: s(125),
    backgroundColor: 'rgba(185, 235, 195, 0.35)', 
  },
  circleDarkBottom: {
    position: 'absolute',
    bottom: -vs(50),
    right: -s(30),
    width: s(180),
    height: s(180),
    borderRadius: s(90),
    backgroundColor: 'rgba(57, 170, 110, 0.45)', 
  },

circleDarkTop: {
  position: 'absolute',
  top: -vs(30),
  left: -s(20),
  width: s(90),          
  height: s(90),
  borderRadius: s(45),
  backgroundColor: 'rgba(57, 170, 110, 0.45)',
},
});
