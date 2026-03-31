export async function signIn(provider: string, data?: any) {
  console.log("Mock: Sign In", { provider, data });
  return { success: true };
}

export async function signOut() {
  console.log("Mock: Sign Out");
  return { success: true };
}

export async function logout() {
  console.log("Mock: Logout");
  return { success: true };
}

export async function loginWithCredentials(formData: FormData) {
  const email = formData.get("email");
  console.log("Mock: Login with credentials", { email });
  return { success: true };
}

export async function loginWithGoogle() {
  console.log("Mock: Login with Google");
  return { success: true };
}

export async function loginWithMicrosoft() {
  console.log("Mock: Login with Microsoft");
  return { success: true };
}

export async function updatePassword(data: any) {
  console.log("Mock: Password Updated", data);
  return { success: true };
}
