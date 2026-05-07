export const createToastHelpers = (toast) => ({
  success: (title, description, options = {}) =>
    toast({ title, description, status: "success", duration: 5000, isClosable: true, ...options }),
  error: (title, description, options = {}) =>
    toast({ title, description, status: "error", duration: 3000, isClosable: true, ...options }),
  warning: (title, description, options = {}) =>
    toast({ title, description, status: "warning", duration: 5000, isClosable: true, ...options }),
});
