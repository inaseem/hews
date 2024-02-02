import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { paths } from './routes/constants';
import FallbackLoader from './components/FallbackLoader';
const Home = lazy(() => import('./routes/Home'));
const StoryDetails = lazy(() => import('./routes/StoryDetails'));

export const AppRoutes = () => (
  <Routes>
    <Route
      path={paths.root}
      element={
        <Suspense fallback={<FallbackLoader />}>
          <Home />
        </Suspense>
      }
    />
    <Route
      path={paths.storyDetails}
      element={
        <Suspense fallback={<FallbackLoader />}>
          <StoryDetails />
        </Suspense>
      }
    />
  </Routes>
);
