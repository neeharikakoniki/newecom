
import { StyleSheet, Image, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { showMessage } from "react-native-flash-message";
import { signUpWithEmail } from "../../services/auth";

type SignUpForm = {
  userName: string;
  email: string;
  password: string;
  confirm: string;
};

const schema = yup.object({
  userName: yup.string().min(2, "Too short").required("User name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm password"),
});

const SignUpScreen = () => {
  const navigation = useNavigation<any>();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    defaultValues: { userName: "", email: "", password: "", confirm: "" },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (values: SignUpForm) => {
    try {
      await signUpWithEmail({
        email: values.email,
        password: values.password,
        userName: values.userName,
      });
      showMessage({ message: "Account created! Please sign in.", type: "success" });
      navigation.navigate("SignInScreen");
    } catch (e: any) {
      const msg =
        e?.code === "auth/email-already-in-use"
          ? "Email is already in use"
          : e?.message || "Sign up failed";
      showMessage({ message: msg, type: "danger" });
    }
  };

  return (
    <AppSaveView style={styles.container}>
      <View style={styles.circleLightBottom} />
      <View style={styles.circleDarkBottom} />
      <View style={styles.circleDarkTop} />

      <Image source={IMAGES.appLogo} style={styles.logo} />

      <Controller
        control={control}
        name="userName"
        render={({ field: { value, onChange } }) => (
          <>
            <AppTextInput placeholder="User Name" value={value} onChangeText={onChange} />
            {errors.userName && <AppText style={styles.err}>{errors.userName.message}</AppText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <>
            <AppTextInput
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
            />
            {errors.email && <AppText style={styles.err}>{errors.email.message}</AppText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <>
            <AppTextInput
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              isPassword
            />
            {errors.password && <AppText style={styles.err}>{errors.password.message}</AppText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="confirm"
        render={({ field: { value, onChange } }) => (
          <>
            <AppTextInput
              placeholder="Confirm Password"
              value={value}
              onChangeText={onChange}
              isPassword
            />
            {errors.confirm && <AppText style={styles.err}>{errors.confirm.message}</AppText>}
          </>
        )}
      />

      <AppButton
        title={isSubmitting ? "Creating..." : "Create New Account"}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />
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
  container: { alignItems: "center", paddingHorizontal: sharedPaddingHorizontal },
  logo: { height: s(150), width: s(150), marginBottom: vs(30) },
  signInButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
  err: {
    color: "#d32f2f",
    fontSize: s(12),
    marginTop: vs(-6),
    alignSelf: "flex-start",
  },
  circleLightBottom: {
    position: "absolute",
    bottom: -vs(100),
    right: -s(80),
    width: s(250),
    height: s(250),
    borderRadius: s(125),
    backgroundColor: "rgba(185,235,195,0.35)",
  },
  circleDarkBottom: {
    position: "absolute",
    bottom: -vs(50),
    right: -s(30),
    width: s(180),
    height: s(180),
    borderRadius: s(90),
    backgroundColor: "rgba(57,170,110,0.45)",
  },
  circleDarkTop: {
    position: "absolute",
    top: -vs(30),
    left: -s(20),
    width: s(90),
    height: s(90),
    borderRadius: s(45),
    backgroundColor: "rgba(57,170,110,0.45)",
  },
});
