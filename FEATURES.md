# Available Libraries and Features

## ✅ Now Available in Your Project

### 1. **UseBounce / useBounce** 
Custom hook for bounce animations
```javascript
import { useBounce, UseBounce } from './hooks/useBounce.js';

const { bounce, bounceStyle, bounceClass } = useBounce({
  scale: 1.2,
  duration: 400
});
```

### 2. **UseRedux / useRedux**
Typed Redux hooks for state management
```javascript
import { useRedux, UseRedux } from './store/hooks.js';

const { dispatch, selector } = useRedux();
const notifications = selector(state => state.ui.notifications);
```

### 3. **Api / api**
API utility functions for HTTP requests
```javascript
import { api, Api } from './api/index.js';

const response = await api.get('/patients');
const data = await Api.post('/doctors', doctorData);
```

### 4. **ApiSlice / APiSlice**
RTK Query API slice for data fetching
```javascript
import { useGetPatientsQuery, useCreatePatientMutation } from './store/apiSlice.js';

const { data: patients, isLoading } = useGetPatientsQuery();
const [createPatient] = useCreatePatientMutation();
```

## File Structure

```
src/
├── store/
│   ├── index.js          # Redux store configuration
│   ├── apiSlice.js       # RTK Query API slice
│   ├── authSlice.js      # Authentication state
│   ├── uiSlice.js        # UI state (notifications, modals)
│   └── hooks.js          # Redux hooks
├── hooks/
│   └── useBounce.js      # Bounce animation hook
├── api/
│   └── index.js          # API utilities
└── utils/
    └── index.js          # Convenient exports
```

## Usage Examples

### Bounce Animation
```javascript
// Method 1: Style-based
const { bounce, bounceStyle } = useBounce();
<button onClick={bounce} style={bounceStyle}>Click me</button>

// Method 2: Class-based
const { bounce, bounceClass } = useBounce();
<button onClick={bounce} className={bounceClass}>Click me</button>
```

### Redux State Management
```javascript
// Add notification
dispatch(addNotification({
  type: 'success',
  message: 'Operation completed!'
}));

// Toggle sidebar
dispatch(toggleSidebar());

// Set loading state
dispatch(setLoading({ key: 'patients', loading: true }));
```

### API Calls
```javascript
// Using api utility
try {
  const response = await api.get('/patients');
  console.log(response.data);
} catch (error) {
  console.error(error.message);
}

// Using RTK Query hooks
const { data, isLoading, error } = useGetPatientsQuery();
```

## Available Redux Slices

### Auth Slice
- `loginStart()`, `loginSuccess()`, `loginFailure()`
- `logout()`, `clearError()`, `setUser()`

### UI Slice
- `toggleSidebar()`, `setSidebarOpen()`
- `addNotification()`, `removeNotification()`
- `setLoading()`, `openModal()`, `closeModal()`

### API Slice
- Auto-generated hooks for all CRUD operations
- Patients, Doctors, Appointments, Medicines, Staff, Billing
- Authentication endpoints

## Configuration

### API Base URL
Update in `src/api/index.js`:
```javascript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001/api', // Change this
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};
```

### Redux Store
The store is automatically configured with:
- RTK Query middleware
- Redux DevTools support
- Persistence for auth tokens

## Integration

The Redux Provider is already set up in `main.jsx`:
```javascript
import { Provider } from 'react-redux';
import { store } from './store/index.js';

<Provider store={store}>
  <App />
</Provider>
```

You can now use all these features throughout your application!
