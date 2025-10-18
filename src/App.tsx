import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { baseURL } from './constants';
import { paths } from './routes/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const AppContent = () => {
  const { pathname } = useLocation();
  const isHome = pathname === paths.root;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-300 h-full">
      <div className={`mx-auto ${isHome ? 'max-w-[700px] lg:max-w-none lg:w-full' : 'max-w-[700px]'}`}>
        <div className="h-screen">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={baseURL}>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
