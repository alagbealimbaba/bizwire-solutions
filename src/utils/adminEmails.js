export const adminEmails = [
  (import.meta.env.VITE_ADMIN_EMAIL || "").toLowerCase(),
].filter(Boolean);

export const isAdminEmail = (email) =>
  !!email && adminEmails.includes(email.toLowerCase());
