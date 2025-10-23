
import { StyleSheet, TextInput, TextStyle, View, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AppTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric";
  style?: TextStyle | TextStyle[];
 
  isPassword?: boolean;

  secureTextEntry?: boolean;
}

const AppTextInput: FC<AppTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  style,
  isPassword = false,
  secureTextEntry,
}) => {
  const [hidden, setHidden] = useState<boolean>(isPassword ? true : !!secureTextEntry);

  const isSecure = isPassword ? hidden : !!secureTextEntry;

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={[styles.input, style, isPassword && { paddingRight: s(44) }]}
        secureTextEntry={isSecure}
      
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete={isPassword ? "off" : undefined}
   
        textContentType={isPassword ? "none" : undefined}
      />

      {isPassword && (
        <TouchableOpacity
          onPress={() => setHidden((p) => !p)}
          style={styles.eye}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name={hidden ? "eye-off-outline" : "eye-outline"}
            size={s(20)}
            color="#6b7280"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  wrapper: { width: "100%" },
  input: {
    height: vs(40),
    borderRadius: s(25),
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    paddingHorizontal: s(15),
    fontSize: s(16),
    backgroundColor: AppColors.white,
    width: "100%",
    marginBottom: vs(10),
  },
  eye: {
    position: "absolute",
    right: s(12),
    height: vs(40),
    justifyContent: "center",
  },
});
