# Club Website with Redux Persistence

This is a Next.js application with Redux state persistence. The Redux store is automatically rehydrated from the database after a page refresh.

## Features

- Redux state persistence across page refreshes
- Automatic rehydration of user data from db.json
- Integration with json-server for backend simulation

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the database server:
   ```bash
   npm run db
   ```

3. In a new terminal, start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How Redux Persistence Works

1. When a user fills out a form, the data is saved to both:
   - The Redux store
   - The db.json database via API calls

2. User identifiers (user ID and form ID) are stored in both sessionStorage and localStorage

3. On page load, the application automatically:
   - Checks for stored user identifiers
   - Fetches user data from db.json
   - Rehydrates the Redux store with the fetched data

## Available Scripts

- `npm run dev` - Starts the Next.js development server
- `npm run db` - Starts the json-server database
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint

## Implementation Details

The Redux persistence is implemented through:

1. `src/utils/reduxRehydration.js` - Utility functions for rehydrating the store
2. `src/store/actions/userAction.js` - Enhanced actions that save user identifiers
3. `src/store/PlayerSlice.js` - Added rehydrateState reducer
4. `src/app/providers.jsx` - Automatic rehydration on app initialization