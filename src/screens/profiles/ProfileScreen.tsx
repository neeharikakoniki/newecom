
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';

import AppSaveView from '../../components/views/AppSaveView';
import HomeHeader from '../../components/headers/HomeHeader';
import AppText from '../../components/texts/AppText';
import AppButton from '../../components/buttons/AppButton';

import { useAppSelector } from '../../store';
import { signOutUser } from '../../services/auth';


const ProfileScreen = () => {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <AppSaveView>
      <HomeHeader />
      <View style={styles.container}>
        {user ? (
          <>
            <AppText variant="bold" style={styles.title}>Profile</AppText>
            <View style={styles.card}>
              <AppText variant="bold">Name</AppText>
              <AppText style={styles.value}>{user.displayName ?? '—'}</AppText>

              <AppText variant="bold" style={{ marginTop: vs(8) }}>Email</AppText>
              <AppText style={styles.value}>{user.email ?? '—'}</AppText>

              <AppText variant="bold" style={{ marginTop: vs(8) }}>User ID</AppText>
              <AppText style={styles.value} numberOfLines={1}>{user.uid}</AppText>
            </View>

            <AppButton
              title="Sign Out"
              onPress={signOutUser}
              style={styles.signOutBtn}
              backgroundColor="#e53935"
            />
          </>
        ) : (
          <View style={styles.center}>
            <AppText>You’re not signed in.</AppText>
          </View>
        )}
      </View>
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: s(16) },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { marginBottom: vs(12), alignSelf: 'center' },
  card: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#fff',
    borderRadius: s(12),
    padding: s(12),
  },
  value: { marginTop: vs(4) },
  signOutBtn: {
    marginTop: vs(20),
    alignSelf: 'center',
    width: s(160),
    height: vs(40),
    borderRadius: s(12),
  },
});
