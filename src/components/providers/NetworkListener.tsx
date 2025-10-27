import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useAppDispatch } from "../../store";
import { setNetworkStatus } from "../../store/slices/networkSlice";

const NetworkListener = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setNetworkStatus(!!state.isConnected));
    });
    return () => unsubscribe(); 
  }, [dispatch]);

  return <>{children}</>;
};

export default NetworkListener;
