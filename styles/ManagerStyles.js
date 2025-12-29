// styles/ManagerStyles.js
import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

export const managerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      },
    }),
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFEBCC',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: colors.white,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
  },
  tabTextActive: {
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  comingSoonText: {
    fontSize: 80,
    marginBottom: 20,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  comingSoonSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 5,
  },

  // Sales Section
  salesContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: colors.textLight,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 10,
  },
  salesContent: {
    padding: 15,
  },

  // Summary Card
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginVertical: 8,
    paddingVertical: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: colors.textLight,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  summaryValueMain: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  summaryValueCommission: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.success,
  },

  // Waiter Sales Section
  waiterSalesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  waiterCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      },
    }),
  },
  waiterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  waiterName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.text,
  },
  waiterSalesCount: {
    fontSize: 13,
    color: colors.textLight,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  waiterDetails: {
    gap: 8,
  },
  waiterDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waiterDetailLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  waiterDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  waiterCommission: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success,
  },

  // Clear History Button
  clearHistoryButton: {
    backgroundColor: colors.error,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  clearHistoryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});