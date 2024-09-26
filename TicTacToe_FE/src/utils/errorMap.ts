const mapErrorMessage = (errorMessage: string) => {
    if (errorMessage.includes("duplicate key value violates unique constraint")) {
      if (errorMessage.includes("users_email_key")) {
        return "Email already exists.";
      }
      if (errorMessage.includes("users_username_key")) {
        return "Username already exists.";
      }
    }
  
    if (errorMessage.includes("timeout")) {
      return "Request timed out. Please try again.";
    }
  
    return "An unknown error occurred. Please try again.";
  };

  export default mapErrorMessage;