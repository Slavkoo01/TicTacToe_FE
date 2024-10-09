const mapErrorMessage = (errorMessage: string) => {
    if (errorMessage.includes("duplicate key value violates unique constraint")) {
      if (errorMessage.includes("email")) {
        return "Email already exists.";
      }
      if (errorMessage.includes("username")) {
        return "Username already exists.";
      }
    }
  
    if (errorMessage.includes("timeout")) {
      return "Request timed out. Please try again.";
    }
  
    if (errorMessage.includes(" Invalid username or password")) {
      return "Invalid username or password";
    }
  
    return "An unknown error occurred. Please try again.";
  };

  export default mapErrorMessage;