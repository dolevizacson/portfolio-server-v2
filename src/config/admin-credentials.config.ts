export default (): { adminUserName: string; adminPassword: string } => ({
  adminUserName: process.env.ADMIN_USER_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
});
