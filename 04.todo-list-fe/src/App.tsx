import './App.css'
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Project, Login, Auth } from './01.pages'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from './05.util/axios';
import { Alert } from '@/02.component'

const queryClient = new QueryClient();

function App() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    setLoad(true);
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-right" /> */}
      {
        load && (
          <Routes>
            <Route path='/' element={<Project />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        )
      }
      <Alert />
    </QueryClientProvider>
  )
}

export default App
