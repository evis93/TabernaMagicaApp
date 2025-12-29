// styles/LoginStyles.js
import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
      web: {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
    }),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textBrand,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonDisabled: {
    backgroundColor: colors.lightGray,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  testUsers: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  testTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  testUser: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 4,
  },
});