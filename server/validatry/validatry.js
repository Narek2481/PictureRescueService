const containsValidNameOrLastName = input => {
    return input.length >= 2 && /[A-Z]/.test(input) && /[a-z]/.test(input);
}
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
const validatePassword = password => {
    if (password.length < 8) {
        console.log("Password must be at least 8 characters long.");
        return "Password must be at least 8 characters long."
    }
    return "ok";
}

export {containsValidNameOrLastName ,validateEmail ,validatePassword};