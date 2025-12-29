// styles/ProductStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const colors = {
  primary: '#E87722',      // Naranja principal
  secondary: '#3B9BD6',    // Azul secundario
  dark: '#1B365D',         // Azul oscuro
  white: '#FFFFFF',
  background: '#F5F7FA',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  lightGray: '#E5E7EB',
  textLight: '#6B7280',
  textDark: '#1F2937',
};

export const productStyles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
  },
  
  // Barra de búsqueda
  searchContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    elevation: 2,
  },
  addButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },

  // Filtros de categorías
  categoriesContainer: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  categoryScroll: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  categoryButtonTextActive: {
    color: colors.white,
  },

  // Lista de productos
  productsList: {
    padding: 15,
  },
  productCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 12,
    color: colors.textLight,
    backgroundColor: colors.lightGray,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 10,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: 10,
    marginTop: 5,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  productStock: {
    fontSize: 14,
    color: colors.textLight,
  },
  productActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
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
  editButton: {
    backgroundColor: colors.secondary,
  },
  deleteButton: {
    backgroundColor: colors.danger,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Badge de disponibilidad
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 85,
    alignItems: 'center',
  },
  availableBadge: {
    backgroundColor: colors.success + '20',
    borderWidth: 1,
    borderColor: colors.success,
  },
  unavailableBadge: {
    backgroundColor: colors.danger + '20',
    borderWidth: 1,
    borderColor: colors.danger,
  },
  availabilityText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Modal de formulario
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.dark,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 20,
    color: colors.textDark,
  },
  modalBody: {
    padding: 20,
  },

  // Formulario
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  formInputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  formInputError: {
    borderColor: colors.danger,
  },
  formError: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 5,
  },
  formRow: {
    flexDirection: 'row',
    gap: 10,
  },
  formColumn: {
    flex: 1,
  },

  // Switch de disponibilidad
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
  },

  // Botones del formulario
  formButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  formButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  cancelButton: {
    backgroundColor: colors.lightGray,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  formButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: colors.textDark,
  },
  saveButtonText: {
    color: colors.white,
  },

  // Estado vacío
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
    fontSize: 18,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },

  // Confirmación de eliminación
  deleteModalContent: {
    backgroundColor: colors.white,
    margin: 20,
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deleteModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 15,
    textAlign: 'center',
  },
  deleteModalText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  deleteModalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  pickerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  pickerArrow: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
  },
  pickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pickerModalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    maxHeight: '70%',
    overflow: 'hidden',
  },
  pickerModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  pickerModalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerModalCloseText: {
    fontSize: 24,
    color: colors.text,
    lineHeight: 24,
  },
  pickerModalList: {
    padding: 8,
  },
  pickerModalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  pickerModalItemActive: {
    backgroundColor: colors.primary + '15',
  },
  pickerModalItemText: {
    fontSize: 16,
    color: colors.text,
  },
  pickerModalItemTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  pickerModalItemCheck: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
  // ============ ESTILOS DE ESTADO ONLINE/OFFLINE ============
  statusBar: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  pendingIndicator: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  pendingText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '600',
  },
  syncTime: {
    fontSize: 11,
    color: colors.textLight,
  },
  syncButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  syncButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export { colors };
