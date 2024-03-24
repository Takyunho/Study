import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppProducts from './pages/AppProducts';

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <AppProducts />
      <AppProducts />
    </QueryClientProvider>
  );
}

export default App;
