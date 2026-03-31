

export async function getInventoryItems() {
  return [
    { id: "inv-1", sku: "SCR-001", name: "Replacement Screen", category: "Parts", quantity: 15, minStock: 5, price: 45.00 },
    { id: "inv-2", sku: "BAT-050", name: "High-Capacity Battery", category: "Parts", quantity: 8, minStock: 3, price: 29.99 },
    { id: "inv-3", sku: "LTP-DELL", name: "Dell XPS 13", category: "Assets", quantity: 5, minStock: 1, price: 1200.00, isAsset: true },
  ];
}

export async function createInventoryItem(data: any) {
  console.log("Mock: Inventory item created", data);
  return { id: Math.random().toString(), ...data };
}

export async function updateInventoryItem(id: string, data: any) {
  console.log("Mock: Inventory item updated", { id, data });
  return { id, ...data };
}

export async function deleteInventoryItem(id: string) {
  console.log("Mock: Inventory item deleted", id);
}
