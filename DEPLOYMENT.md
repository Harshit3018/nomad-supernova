# Deployment Guide

## 1. Vercel (Frontend & Serverless Functions)

1. **Push to GitHub**: Commit your code to a GitHub repository.
2. **Import Project**: Go to Vercel Dashboard -> Add New -> Project -> Import from GitHub.
3. **Environment Variables**: Add the following in Vercel project settings:
   - `NEXT_PUBLIC_TMDB_API_KEY`: Your TMDB API Key.
4. **Deploy**: Click Deploy. Vercel will automatically detect Next.js and build it.

## 2. Firebase (Authentication & Optional Database)

1. **Create Project**: Go to Firebase Console -> Create Project.
2. **Enable Auth**: Build -> Authentication -> Get Started -> Enable Email/Password.
3. **Get Config**: Project Settings -> General -> Look for "Your apps" -> Web App -> SDK Setup and Configuration.
4. **Update Code**: Update `src/lib/firebase.ts` (if you add it) with these keys.
   *Note: For this demo version, authentication logic is mocked or handles simplified flows. To fully integrate Firebase:*
   - `npm install firebase`
   - Create `src/lib/firebase.ts` and initialize app.
   - Update `Login` and `Signup` pages to use `signInWithEmailAndPassword` and `createUserWithEmailAndPassword`.

## 3. Database (MongoDB / Firestore)

Currently, the app uses a mocked "availability database" in `src/lib/utils.ts`.
To restart with a real database:
1. **MongoDB Atlas**: Create a cluster.
2. **Connect**: Use `mongoose` or `mongodb` driver in API routes or Server Actions.
3. **Schema**:
   ```javascript
   const MovieSchema = new Schema({
     tmdbId: String,
     netflixUrl: String,
     primeUrl: String,
     mxPlayerUrl: String,
     externalFreeUrl: String,
   });
   ```
4. **Fetch**: Update `getAvailability` in `src/lib/utils.ts` to query this DB instead of the `availabilityDB` object.
