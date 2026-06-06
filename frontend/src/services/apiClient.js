const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Universal error interceptor matching backend custom error shapes
 */
async function handleResponse(response) {
  if (!response.ok) {
    const errorDetails = await response.json().catch(() => ({}));
    throw new Error(errorDetails.error || `HTTP Server Exception: ${response.status}`);
  }
  return response.json();
}

/**
 * Request Header Factory appending Bearer Token authorization telemetry
 */
function getHeaders() {
  const token = localStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

export const apiClient = {
  // =========================================================
  // 🔐 SCREEN 1 & 2: AUTHENTICATION GATEWAYS
  // =========================================================
  auth: {
    login: async (email, password) => {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return handleResponse(response);
    },
    
    register: async (registrationData) => {
      // Expects: { firstName, lastName, email, phoneNumber, role, country, additionalInformation }
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
      });
      return handleResponse(response);
    }
  },

  // =========================================================
  // 📊 SCREEN 3: MAIN LANDING DASHBOARD
  // =========================================================
  dashboard: {
    getOverview: async () => {
      const response = await fetch(`${BASE_URL}/dashboard/overview`, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    }
  },

  // =========================================================
  // 👥 SCREEN 4: VENDOR GLOBAL DIRECTORY 
  // =========================================================
  vendors: {
    getAll: async (search = '', status = '') => {
      let url = `${BASE_URL}/vendors`;
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status) params.append('status', status);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    },
    
    create: async (vendorPayload) => {
      // Explicitly uses contract keys: name, category, gstNo, contactNo, status
      const response = await fetch(`${BASE_URL}/vendors`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(vendorPayload)
      });
      return handleResponse(response);
    }
  },

  // =========================================================
  // 📝 SCREEN 5: CREATE REQUEST FOR QUOTATION (RFQ)
  // =========================================================
  rfqs: {
    create: async (rfqPayload) => {
      // Expects payload: { title, category, deadline, description, lineItems, assignedVendors, isDraft }
      const response = await fetch(`${BASE_URL}/rfqs`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(rfqPayload)
      });
      return handleResponse(response);
    }
  },

  // =========================================================
  // 📥 SCREEN 6 & 7: QUOTATIONS & side-by-side COMPARISON
  // =========================================================
  quotations: {
    getRfqSummary: async (rfqId) => {
      const response = await fetch(`${BASE_URL}/quotations/rfq-summary/${rfqId}`, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    },

    submitBid: async (bidPayload) => {
      const response = await fetch(`${BASE_URL}/quotations/submit`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(bidPayload)
      });
      return handleResponse(response);
    },

    getComparisonMatrix: async (rfqId) => {
      const response = await fetch(`${BASE_URL}/comparison/${rfqId}`, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    },

    selectWinningVendor: async (selectionPayload) => {
      // Expects: { rfqId, selectedQuotationId, selectedVendorId }
      const response = await fetch(`${BASE_URL}/comparison/select`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(selectionPayload)
      });
      return handleResponse(response);
    }
  },

  // =========================================================
  // 📝 SCREEN 8: MANAGEMENT APPROVAL WORKFLOW
  // =========================================================
  approvals: {
    getDetails: async (approvalId) => {
      const response = await fetch(`${BASE_URL}/approvals/${approvalId}`, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    },

    processAction: async (approvalId, action, comments) => {
      // action must match "APPROVE" or "REJECT" strings
      const response = await fetch(`${BASE_URL}/approvals/${approvalId}/action`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ action, comments })
      });
      return handleResponse(response);
    }
  },

  // =========================================================
  // 🧾 SCREEN 9: PURCHASE ORDER & INVOICE MANAGEMENT
  // =========================================================
  documents: {
    getInvoice: async (invoiceId) => {
      const response = await fetch(`${BASE_URL}/documents/invoice/${invoiceId}`, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    },

    executeInvoiceAction: async (invoiceId, actionType) => {
      // actionType must match "MARK_AS_PAID" or "EMAIL_INVOICE"
      const response = await fetch(`${BASE_URL}/documents/invoice/${invoiceId}/action`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ action: actionType })
      });
      return handleResponse(response);
    }
  },

  // =========================================================
  // ⏱️ SCREEN 10: AUDIT LOGS TRAIL MATRIX
  // =========================================================
  auditLogs: {
    getLogs: async (filterType = '') => {
      let url = `${BASE_URL}/audit-logs`;
      if (filterType) url += `?filter=${filterType}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    }
  },

  // =========================================================
  // 📈 SCREEN 11: INTEL REPORTS & ANALYTICS
  // =========================================================
  analytics: {
    getSummary: async (monthParam = '') => {
      let url = `${BASE_URL}/analytics/summary`;
      if (monthParam) url += `?month=${monthParam}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    }
  }
};