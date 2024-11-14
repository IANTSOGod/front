export default function VerifyPassword(password: string) {
  const numberPattern = /\d/;
  const specialCharacterPattern = /[^a-zA-Z0-9 ]/;
  const uppercasePattern = /[A-Z]/;
  if (password.length < 8) {
    return "Password must be 8 letters long";
  } else {
    const verify =
      numberPattern.test(password) &&
      specialCharacterPattern.test(password) &&
      uppercasePattern.test(password);
    if (verify) {
      return "Strong password";
    } else {
      return "Add uppercase letters,numbers and special chars";
    }
  }
}
