# Error Handling Guide

## Common Errors and Solutions

### 1. 404 (Not Found) - favicon.ico
**Error**: `Failed to load resource: the server responded with a status of 404 (Not Found)`

**Cause**: Browser automatically tries to load a favicon, but none exists.

**Solution**: ✅ **FIXED**
- Added `favicon.svg` to the `public` directory
- Added favicon reference in `index.html`

### 2. 500 (Internal Server Error)
**Error**: `Failed to load resource: the server responded with a status of 500 (Internal Server Error)`

**Cause**: Frontend trying to connect to backend API, but backend server is not running or has errors.

**Solutions**: ✅ **FIXED**
- Created `mockApi.js` that automatically detects if backend is available
- Falls back to mock data when backend is unavailable
- Updated `FeatureDemo.jsx` to use safe API calls
- Added comprehensive Error Boundary to catch any unhandled errors

## Backend Setup (Optional)
If you want to run a real backend server:

1. **Check if backend is running**:
   - Your app expects backend at `http://localhost:3001/api`
   - Make sure your backend server is running on port 3001

2. **Start your backend server**:
   ```bash
   # Navigate to your backend directory
   cd path/to/your/backend
   
   # Install dependencies
   npm install
   
   # Start the server
   npm start
   ```

3. **Update API configuration** (if needed):
   - Edit `src/api/index.js` to change the `BASE_URL` if your backend runs on a different port

## Development Tips

1. **Check Network Tab**: Open browser DevTools → Network tab to see which requests are failing
2. **Check Console**: Look for error messages in the browser console
3. **Error Boundary**: The app now has an error boundary that will show a user-friendly error page instead of crashing
4. **Mock Data**: When backend is unavailable, the app automatically uses mock data for demonstration

## Error Boundary Features
- Catches JavaScript errors anywhere in the component tree
- Shows user-friendly error message
- Provides "Refresh Page" and "Try Again" buttons
- Shows detailed error information in development mode
- Prevents the entire app from crashing due to single component errors

Your DAMS (Doctor Appointment Management System) frontend should now work smoothly even without a backend server!
