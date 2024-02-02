import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import TopNav from './components/TopNav';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-300 h-full">
          <div className="mx-auto max-w-[700px]">
            <div className="grid grid-rows-[auto_1fr] h-screen">
              <TopNav />
              <AppRoutes />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
