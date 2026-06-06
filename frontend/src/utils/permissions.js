export const ROLES = {
    OFFICER: 'Procurement Officer',
    VENDOR: 'Vendor',
    MANAGER: 'Manager / Approver',
    ADMIN: 'Admin'
  };
  
  export const PERMISSIONS = {
    // Navigation Page Visibility Permissions Matrix
    pages: {
      dashboard:  [ROLES.OFFICER, ROLES.MANAGER, ROLES.ADMIN],
      vendors:    [ROLES.OFFICER, ROLES.ADMIN],
      rfqs:       [ROLES.OFFICER, ROLES.ADMIN],
      quotations: [ROLES.OFFICER, ROLES.VENDOR, ROLES.ADMIN],
      approvals:  [ROLES.MANAGER, ROLES.ADMIN],
      orders:     [ROLES.OFFICER, ROLES.VENDOR, ROLES.MANAGER, ROLES.ADMIN],
      invoices:   [ROLES.OFFICER, ROLES.MANAGER, ROLES.ADMIN],
      reports:    [ROLES.ADMIN],
      activity:   [ROLES.ADMIN]
    },
    // Button-Level Interaction Actions Matrix
    actions: {
      CREATE_RFQ:     [ROLES.OFFICER, ROLES.ADMIN],
      SUBMIT_BID:     [ROLES.VENDOR],
      APPROVE_REJECT: [ROLES.MANAGER, ROLES.ADMIN],
      MARK_AS_PAID:   [ROLES.OFFICER, ROLES.ADMIN],
      MANAGE_VENDORS: [ROLES.ADMIN]
    }
  };
  
  /**
   * Global evaluation helper matching storage vectors
   */
  export function hasPermission(role, element, dynamicType = 'pages') {
    if (role === ROLES.ADMIN) return true; // Global "All View" permission rule override
    return PERMISSIONS[dynamicType]?.[element]?.includes(role) || false;
  }