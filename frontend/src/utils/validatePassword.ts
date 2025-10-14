export function validatePassword(password: string) {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!password) return "Password is required";
  if (!regex.test(password))
    return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";

  return null; // valid
}
