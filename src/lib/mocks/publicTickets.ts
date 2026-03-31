export async function submitPublicTicket(data: any) {
  console.log("Mock: Public ticket submitted", data);
  return { success: true, ticketNumber: 1234 };
}
