// Helper functions for password operations
const passwordUtil = {
    evaluatePassword: (password, policy) => {
      const { minLength, maxLength, minLower, minUpper, minDigit, minSpecial } = policy;
  
      // Evaluate the password based on the provided policy
      let strength = 0;
      let vulnerabilities = [];
      let feedback = '';
  
      // Check password length
      if (password.length >= minLength && password.length <= maxLength) {
        strength += 20;
      } else {
        vulnerabilities.push('Password length should be between ' + minLength + ' and ' + maxLength + ' characters.');
      }
  
      // Check lowercase letters
      const lowercaseRegex = /[a-z]/;
      if (lowercaseRegex.test(password)) {
        strength += 20;
      } else {
        vulnerabilities.push('Password should contain at least ' + minLower + ' lowercase letter(s).');
      }
  
      // Check uppercase letters
      const uppercaseRegex = /[A-Z]/;
      if (uppercaseRegex.test(password)) {
        strength += 20;
      } else {
        vulnerabilities.push('Password should contain at least ' + minUpper + ' uppercase letter(s).');
      }
  
      // Check digits
      const digitRegex = /[0-9]/;
      if (digitRegex.test(password)) {
        strength += 20;
      } else {
        vulnerabilities.push('Password should contain at least ' + minDigit + ' digit(s).');
      }
  
      // Check special characters
      const specialRegex = /[^a-zA-Z0-9]/;
      if (specialRegex.test(password)) {
        strength += 20;
      } else {
        vulnerabilities.push('Password should contain at least ' + minSpecial + ' special character(s).');
      }
  
      // Provide feedback based on the password strength
      if (strength === 100) {
        feedback = 'The password meets the strength requirements.';
      } else if (strength >= 80) {
        feedback = 'The password is strong, but can be improved.';
      } else if (strength >= 60) {
        feedback = 'The password is moderate, consider adding more complexity.';
      } else {
        feedback = 'The password is weak, please choose a stronger password.';
      }
  
      // Return the evaluation result as an object
      return {
        strength: strength + '%',
        vulnerabilities: vulnerabilities,
        feedback: feedback
      };
    },
  
    suggestPassword: (policy) => {
      const { minLength, maxLength, minLower, minUpper, minDigit, minSpecial } = policy;
  
      // Generate a random password that adheres to the provided policy
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const digitChars = '0123456789';
      const specialChars = '!@#$%^&*()';
      let suggestedPassword = '';
  
      // Generate lowercase letters
      for (let i = 0; i < minLower; i++) {
        suggestedPassword += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
      }
  
      // Generate uppercase letters
      for (let i = 0; i < minUpper; i++) {
        suggestedPassword += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
      }
  
      // Generate digits
      for (let i = 0; i < minDigit; i++) {
        suggestedPassword += digitChars.charAt(Math.floor(Math.random() * digitChars.length));
      }
  
      // Generate special characters
      for (let i = 0; i < minSpecial; i++) {
        suggestedPassword += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
      }
  
      // Generate remaining characters
      const remainingLength = Math.max(minLength - suggestedPassword.length, 0);
      const allChars = lowercaseChars + uppercaseChars + digitChars + specialChars;
      for (let i = 0; i < remainingLength; i++) {
        suggestedPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
      }
  
      // Shuffle the suggested password
      const passwordArray = suggestedPassword.split('');
      for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
      }
  
      // Return the suggested password
      return passwordArray.join('');
    },
  
    validatePasswordPolicy: (password, policy) => {
      const { minLength, maxLength, minLower, minUpper, minDigit, minSpecial } = policy;
  
      // Check if the password adheres to the provided policy
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const digitRegexApologies = /[0-9]/;
      const specialRegex = /[^a-zA-Z0-9]/;
  
      // Password length
      if (password.length < minLength || password.length > maxLength) {
        return false;
      }
  
      // Lowercase letters
      if (!lowercaseRegex.test(password) || getCharacterCount(password, lowercaseRegex) < minLower) {
        return false;
      }
  
      // Uppercase letters
      if (!uppercaseRegex.test(password) || getCharacterCount(password, uppercaseRegex) < minUpper) {
        return false;
      }
  
      // Digits
      if (!digitRegex.test(password) || getCharacterCount(password, digitRegex) < minDigit) {
        return false;
      }
  
      // Special characters
      if (!specialRegex.test(password) || getCharacterCount(password, specialRegex) < minSpecial) {
        return false;
      }
  
      return true;
    }
  };
  
  // Helper function to count the occurrences of a character in a string
  function getCharacterCount(string, regex) {
    return (string.match(regex) || []).length;
  }
  
  module.exports = passwordUtil;