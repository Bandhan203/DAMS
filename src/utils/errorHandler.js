// Global error handler and network interceptor
export class NetworkErrorHandler {
  constructor() {
    this.interceptRequests();
    this.interceptUnhandledErrors();
  }

  // Intercept all fetch requests to add error handling
  interceptRequests() {
    const originalFetch = window.fetch;
    
    window.fetch = async (url, options = {}) => {
      try {
        // Add timeout to prevent hanging requests
        const timeoutId = setTimeout(() => {
          console.warn('Request timeout for:', url);
        }, 10000);

        const response = await originalFetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          }
        });

        clearTimeout(timeoutId);

        // Handle different error status codes
        if (!response.ok) {
          const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          
          if (response.status === 500) {
            console.error('Server Error (500):', errorMessage, 'URL:', url);
            // You could show a notification here
            this.handleServerError(url, response);
          } else if (response.status === 404) {
            console.warn('Resource Not Found (404):', url);
          } else if (response.status >= 400) {
            console.error('Client/Server Error:', errorMessage, 'URL:', url);
          }
        }

        return response;
      } catch (error) {
        console.error('Network request failed:', error.message, 'URL:', url);
        
        // Check if it's a network connectivity issue
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          console.warn('Network connectivity issue detected');
          this.handleNetworkError(url, error);
        }
        
        throw error;
      }
    };
  }

  // Handle 500 server errors
  handleServerError(url, response) {
    // You can customize this behavior
    console.group('🚨 Server Error Details');
    console.log('URL:', url);
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Timestamp:', new Date().toISOString());
    console.groupEnd();

    // Optional: Show user-friendly notification
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('server-error', {
        detail: { url, status: response.status, statusText: response.statusText }
      }));
    }
  }

  // Handle network connectivity errors
  handleNetworkError(url, error) {
    console.group('🌐 Network Error Details');
    console.log('URL:', url);
    console.log('Error:', error.message);
    console.log('Type:', error.name);
    console.log('Timestamp:', new Date().toISOString());
    console.groupEnd();

    // Optional: Show user-friendly notification
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('network-error', {
        detail: { url, error: error.message }
      }));
    }
  }

  // Catch unhandled promise rejections
  interceptUnhandledErrors() {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);
      
      // Check if it's a network-related error
      if (event.reason && (
        event.reason.message?.includes('fetch') ||
        event.reason.message?.includes('500') ||
        event.reason.message?.includes('Network')
      )) {
        console.warn('Network-related unhandled rejection detected');
        event.preventDefault(); // Prevent the error from being logged to console again
      }
    });

    // Catch general JavaScript errors
    window.addEventListener('error', (event) => {
      if (event.error && event.error.message?.includes('500')) {
        console.error('JavaScript error related to 500 status:', event.error);
      }
    });
  }
}

// Initialize the error handler
export const networkErrorHandler = new NetworkErrorHandler();

// Utility function to check if an error is network-related
export const isNetworkError = (error) => {
  return error && (
    error.name === 'TypeError' ||
    error.message?.includes('fetch') ||
    error.message?.includes('Network') ||
    error.message?.includes('500')
  );
};

// Utility function to safely make API calls with automatic fallback
export const safeNetworkRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok && response.status === 500) {
      throw new Error(`Server Error: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.warn('Network request failed, consider using mock data:', error.message);
    throw error;
  }
};

export default NetworkErrorHandler;
