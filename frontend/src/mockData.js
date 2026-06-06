export const INITIAL_VENDORS = [
    { id: "VND-881", name: "Apex Industrial Supplies", category: "Hardware", gst: "24AAAAA1111A1Z1", status: "Active", rating: 4.8 },
    { id: "VND-442", name: "Matrix Logistics & Tech", category: "IT Infrastructure", gst: "24BBBBB2222B2Z2", status: "Active", rating: 4.2 },
    { id: "VND-115", name: "Gujarat Enterprise Group", category: "Raw Materials", gst: "24CCCCC3333C3Z3", status: "On Hold", rating: 3.9 }
  ];
  
  export const INITIAL_RFQS = [
    { id: "RFQ-2026-01", title: "Server Rack Upgrades", item: "Dell PowerEdge Enclosures", qty: 5, deadline: "2026-06-15", status: "Active" },
    { id: "RFQ-2026-02", title: "Copper Rod Provisioning", item: "8mm Industrial Copper", qty: 1200, deadline: "2026-06-20", status: "Pending Approval" }
  ];
  
  export const INITIAL_QUOTATIONS = [
    { id: "QT-901", rfqId: "RFQ-2026-01", vendor: "Apex Industrial Supplies", pricePerUnit: 12000, total: 60000, timeline: "5 Days", rating: 4.8 },
    { id: "QT-902", rfqId: "RFQ-2026-01", vendor: "Matrix Logistics & Tech", pricePerUnit: 11500, total: 57500, timeline: "9 Days", rating: 4.2 }
  ];