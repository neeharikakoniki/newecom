import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { s, vs, ms } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import AppSaveView from '../../components/views/AppSaveView';
import AppText from '../../components/texts/AppText';
import AppButton from '../../components/buttons/AppButton';
import { useAppSelector } from '../../store';
import { signOutUser } from '../../services/auth';
import { AppColors } from '../../styles/colors';

const ProfileScreen = () => {
  const user = useAppSelector((s) => s.auth.user);
  const initials = user?.displayName
    ? user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user?.email?.charAt(0)?.toUpperCase() ?? '?';

  return (
    <AppSaveView>

      <LinearGradient
        colors={[AppColors.primary, '#4AC29A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Ionicons name="person-circle-outline" size={s(60)} color="#fff" />
        <AppText variant="bold" style={styles.headerTitle}>
          {user?.displayName || 'My Profile'}
        </AppText>
      </LinearGradient>

      <View style={styles.container}>
        {user ? (
          <>
            {/* Profile Card */}
            <View style={styles.profileCard}>
              <View style={styles.avatarWrapper}>
                <View style={styles.avatar}>
                  <AppText variant="bold" style={styles.avatarText}>
                    {initials}
                  </AppText>
                </View>
              </View>

              <View style={styles.info}>
                <View style={styles.row}>
                  <Ionicons name="person-outline" size={s(18)} color={AppColors.primary} />
                  <AppText style={styles.label}>Name</AppText>
                </View>
                <AppText style={styles.value}>{user.displayName ?? '—'}</AppText>

                <View style={[styles.row, { marginTop: vs(10) }]}>
                  <Ionicons name="mail-outline" size={s(18)} color={AppColors.primary} />
                  <AppText style={styles.label}>Email</AppText>
                </View>
                <AppText style={styles.value}>{user.email ?? '—'}</AppText>

            
              </View>
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
  header: {
    height: vs(140),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: s(25),
    borderBottomRightRadius: s(25),
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: ms(20),
    marginTop: vs(6),
  },
  container: {
    flex: 1,
    padding: s(16),
    marginTop: vs(-40), 
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: s(15),
    paddingVertical: vs(20),
    paddingHorizontal: s(16),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: vs(15),
  },
  avatar: {
    width: s(80),
    height: s(80),
    borderRadius: s(40),
    backgroundColor: 'rgba(57,170,110,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: ms(26),
    color: AppColors.primary,
  },
  info: {
    marginTop: vs(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
  },
  label: {
    fontSize: s(15),
    color: '#555',
  },
  value: {
    fontSize: s(15),
    color: AppColors.black,
    marginLeft: s(24),
    marginTop: vs(2),
  },
  uid: {
    color: '#888',
    fontSize: s(12),
  },
  signOutBtn: {
    marginTop: vs(30),
    alignSelf: 'center',
    width: s(160),
    height: vs(42),
    borderRadius: s(25),
    elevation: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
