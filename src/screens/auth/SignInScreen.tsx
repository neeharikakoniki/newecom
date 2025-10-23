
import { StyleSheet, Image, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs, ms } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { showMessage } from "react-native-flash-message";
import { signInWithEmail } from "../../services/auth";

type SignInForm = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
});

const SignInScreen = () => {
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (values: SignInForm) => {
    try {
      await signInWithEmail({ email: values.email, password: values.password });
      // AuthListener will switch UI to MainAppBottomTabs automatically.
      showMessage({ message: "Signed in successfully", type: "success" });
    } catch (e: any) {
      const msg =
        e?.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : e?.message || "Sign in failed";
      showMessage({ message: msg, type: "danger" });
    }
  };

  return (
    <AppSaveView style={styles.container}>
      <View style={styles.circleLightBottom} />
      <View style={styles.circleDarkBottom} />
      <View style={styles.circleDarkTop} />

      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppText style={styles.appName}>Shopverse</AppText>

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

      <AppButton
        title={isSubmitting ? "Signing in..." : "Login"}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />

      <AppButton
        title="Sign Up"
        style={styles.registerButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignUpScreen")}
      />
    </AppSaveView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingHorizontal: sharedPaddingHorizontal },
  logo: { height: s(150), width: s(150), marginBottom: vs(30) },
  appName: {
    fontSize: ms(26),
    fontWeight: "800",
    color: "#2C5E1A",
    marginVertical: vs(15),
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.15)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    textTransform: "uppercase",
    textAlign: "center",
  },
  registerButton: {
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
