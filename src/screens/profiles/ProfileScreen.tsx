import React, { useState } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { s, vs, ms } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import AppSaveView from '../../components/views/AppSaveView';
import AppText from '../../components/texts/AppText';
import AppButton from '../../components/buttons/AppButton';
import { useAppSelector } from '../../store';
import { signOutUser } from '../../services/auth';
import { AppColors } from '../../styles/colors';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const ProfileScreen = () => {
  const user = useAppSelector((s) => s.auth.user);
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const initials = user?.displayName
    ? user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user?.email?.charAt(0)?.toUpperCase() ?? '?';

  const handleLanguageSelect = (code: string) => {
    i18n.changeLanguage(code);
    setShowModal(false);
  };

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
          {t('profile')}
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
                  <Ionicons
                    name="person-outline"
                    size={s(18)}
                    color={AppColors.primary}
                  />
                  <AppText style={styles.label}>{t('name')}</AppText>
                </View>
                <AppText style={styles.value}>{user.displayName ?? '—'}</AppText>

                <View style={[styles.row, { marginTop: vs(10) }]}>
                  <Ionicons
                    name="mail-outline"
                    size={s(18)}
                    color={AppColors.primary}
                  />
                  <AppText style={styles.label}>{t('email')}</AppText>
                </View>
                <AppText style={styles.value}>{user.email ?? '—'}</AppText>
              </View>
            </View>

            {/* Buttons */}
            <AppButton
              title={t('logout')}
              onPress={signOutUser}
              style={styles.signOutBtn}
              backgroundColor="#e53935"
            />

            <AppButton
              title={t('changeLanguage')}
              onPress={() => setShowModal(true)}
              style={styles.langBtn}
              backgroundColor={AppColors.primary}
            />
          </>
        ) : (
          <View style={styles.center}>
            <AppText>{t('notSignedIn')}</AppText>
          </View>
        )}
      </View>

      {/* Language Modal */}
      <Modal
        transparent
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <AppText variant="bold" style={styles.modalTitle}>
              {t('chooseLanguage')}
            </AppText>

            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={styles.languageOption}
                onPress={() => handleLanguageSelect(lang.code)}
              >
                <AppText style={styles.languageText}>{lang.label}</AppText>
              </TouchableOpacity>
            ))}

            <AppButton
              title={t('cancel')}
              onPress={() => setShowModal(false)}
              style={styles.cancelBtn}
              backgroundColor="#ccc"
              textColor={AppColors.black}
            />
          </View>
        </View>
      </Modal>
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
  signOutBtn: {
    marginTop: vs(30),
    alignSelf: 'center',
    width: s(160),
    height: vs(42),
    borderRadius: s(25),
    elevation: 2,
  },
  langBtn: {
    marginTop: vs(12),
    alignSelf: 'center',
    width: s(180),
    height: vs(42),
    borderRadius: s(25),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: s(15),
    paddingVertical: vs(20),
    paddingHorizontal: s(16),
    alignItems: 'center',
    elevation: 4,
  },
  modalTitle: {
    fontSize: ms(18),
    marginBottom: vs(12),
  },
  languageOption: {
    paddingVertical: vs(8),
  },
  languageText: {
    fontSize: ms(16),
  },
  cancelBtn: {
    marginTop: vs(10),
    width: s(140),
    height: vs(36),
    borderRadius: s(18),
  },
});
