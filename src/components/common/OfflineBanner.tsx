import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppSelector, useAppDispatch } from "../../store";
import { setBannerHeight } from "../../store/slices/networkSlice";

const OfflineBanner = () => {
  const isConnected = useAppSelector((s) => s.network.isConnected);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();


  const onLayout = useCallback((event: any) => {
    const { height } = event.nativeEvent.layout;
    dispatch(setBannerHeight(height));
  }, [dispatch]);

  if (isConnected) return null;

  return (
    <View
      onLayout={onLayout}
      style={[styles.banner, { paddingTop: insets.top || 10 }]}
    >
      <Text style={styles.text}>
        You are offline. Some features may not work.
      </Text>
    </View>
  );
};

export default OfflineBanner;

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    zIndex: 100,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
