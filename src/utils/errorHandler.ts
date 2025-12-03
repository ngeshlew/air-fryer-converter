/**
 * Global Error Handler
 * Captures and logs unhandled errors and promise rejections
 */

// Handle unhandled errors
window.addEventListener('error', (event) => {
  console.error('[Global Error Handler] Unhandled error:', event.error);
  console.error('Error details:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('[Global Error Handler] Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent default console error
});

// Log that error handler is initialized
console.log('[Error Handler] Global error handler initialized');

export {};

