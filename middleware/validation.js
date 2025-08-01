const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Registration validation
const validateRegistration = [
  body('fullname')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  handleValidationErrors
];

// Login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Profile update validation
const validateProfileUpdate = [
  body('fullname')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL'),
  
  handleValidationErrors
];

// Password reset validation
const validatePasswordReset = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  handleValidationErrors
];

// Tenant creation validation
const validateTenantCreation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Tenant name must be between 2 and 100 characters'),
  
  body('company.name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('domain')
    .optional()
    .trim()
    .isFQDN()
    .withMessage('Please provide a valid domain name'),
  
  body('subdomain')
    .optional()
    .trim()
    .isLength({ min: 3, max: 63 })
    .matches(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/)
    .withMessage('Subdomain must be 3-63 characters and contain only lowercase letters, numbers, and hyphens'),
  
  handleValidationErrors
];

// Settings update validation
const validateSettingsUpdate = [
  body('settings')
    .isObject()
    .withMessage('Settings must be an object'),
  
  body('settings.theme.primaryColor')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Primary color must be a valid hex color'),
  
  body('settings.theme.secondaryColor')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Secondary color must be a valid hex color'),
  
  body('settings.limits.users')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('User limit must be between 1 and 1000'),
  
  body('settings.limits.storage')
    .optional()
    .isInt({ min: 100, max: 100000 })
    .withMessage('Storage limit must be between 100 and 100000 MB'),
  
  handleValidationErrors
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  validatePasswordReset,
  validateTenantCreation,
  validateSettingsUpdate,
  handleValidationErrors
}; 