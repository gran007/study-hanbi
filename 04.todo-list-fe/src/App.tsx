import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Main, Login, Auth } from './01.pages'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-right" /> */}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </QueryClientProvider>
  )
}

export default App
