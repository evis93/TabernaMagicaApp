// styles/WaiterStyles.js
import { StyleSheet } from 'react-native';

const colors = {
  primary: '#8B5CF6',
  secondary: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#F3F4F6',
  white: '#FFFFFF',
  black: '#1F2937',
  gray: '#6B7280',
  lightGray: '#D1D5DB',
  border: '#E5E7EB',
};

export const waiterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },

  // Tabs
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
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 15,
    color: colors.gray,
    fontWeight: '500',
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },

  // Content
  content: {
    flex: 1,
    padding: 15,
  },

  // Mesas Header
  mesasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  mesasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  addTableButton: {
    backgroundColor: colors.success,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addTableButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },

  // Table Cards
  tablesList: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  tableCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginVertical: 6,
    borderWidth: 2,
    borderColor: colors.border,
    minHeight: 100,
  },
  tableCardOpen: {
    borderColor: colors.success,
    backgroundColor: '#F0FDF4',
  },
  tableCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F5F3FF',
  },
  tableHeader: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  tableNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  tableStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  tableStatusOpen: {
    backgroundColor: colors.success,
  },
  tableStatusClosed: {
    backgroundColor: colors.lightGray,
  },
  tableStatusText: {
    fontSize: 11,
    color: colors.white,
    fontWeight: '600',
  },
  tableInfo: {
    marginTop: 8,
  },
  tableInfoText: {
    fontSize: 13,
    color: colors.gray,
    marginBottom: 4,
  },
  tableTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success,
  },

  // Expand/Collapse indicator
  expandIndicator: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },

  // Expanded Products List in Table Card
  expandedProductsList: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  expandedProductItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: colors.background,
    borderRadius: 6,
    marginBottom: 6,
  },
  expandedProductInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandedProductName: {
    fontSize: 13,
    color: colors.black,
    fontWeight: '500',
    flex: 1,
  },
  expandedProductQuantity: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: '600',
    backgroundColor: colors.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  expandedProductPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.success,
    minWidth: 50,
    textAlign: 'right',
  },
  expandedRemoveButton: {
    backgroundColor: colors.error,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  expandedRemoveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
  },

  // Table Card Footer (Totales y Cerrar Mesa)
  tableCardFooter: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  tableCardTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  tableCardTotalLabel: {
    fontSize: 13,
    color: colors.gray,
  },
  tableCardTotalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  tableCardTotalRowFinal: {
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tableCardTotalLabelFinal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  tableCardTotalValueFinal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.success,
  },
  closeTableButtonInCard: {
    backgroundColor: colors.error,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  closeTableButtonInCardText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },

  // Table Detail
  tableDetail: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
  },
  tableDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableDetailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
  },
  addProductButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addProductButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },

  // Table Products List
  tableProductsList: {
    flex: 1,
    marginBottom: 15,
  },
  tableProductItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableProductInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableProductName: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '500',
    flex: 1,
  },
  tableProductQuantity: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 8,
    fontWeight: '600',
  },
  tableProductRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableProductPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginRight: 12,
  },
  removeButton: {
    backgroundColor: colors.error,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Table Footer with Totals
  tableDetailFooter: {
    borderTopWidth: 2,
    borderTopColor: colors.border,
    paddingTop: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 15,
    color: colors.gray,
  },
  totalValue: {
    fontSize: 15,
    color: colors.black,
    fontWeight: '600',
  },
  totalRowFinal: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabelFinal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  totalValueFinal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.success,
  },
  closeTableButton: {
    backgroundColor: colors.error,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  closeTableButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Empty States
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.gray,
  },
  emptyProducts: {
    padding: 40,
    alignItems: 'center',
  },
  emptyProductsText: {
    fontSize: 15,
    color: colors.gray,
    textAlign: 'center',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 32,
    color: colors.gray,
    fontWeight: '300',
  },

  // Products List in Modal and Menu
  productsList: {
    padding: 15,
  },
  productItem: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productItemInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  productItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    flex: 1,
  },
  productItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 10,
  },
  addToTableButton: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addToTableButtonText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },

  // Menu Header
  menuHeader: {
    padding: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  selectedTableBadge: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
  },

  // Search Container
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clearButton: {
    marginLeft: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 24,
    color: colors.gray,
    fontWeight: '300',
  },
});

export { colors };
