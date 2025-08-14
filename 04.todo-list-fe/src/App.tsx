import './App.css'
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Project, Login, Auth } from './01.pages'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from './05.util/axios';
import { Alert } from '@/02.component'
import Board from './01.pages/04.board';

const queryClient = new QueryClient();

function App() {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const { pathname } = window.location;
    if (!pathname.includes('/login') && !pathname.includes('/auth')) {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        axios.post('/user/refresh', { refreshToken }).then((response) => {
          const { accessToken, refreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }).catch(() => {
          navigate('/login');
        })
          .finally(() => {
            setLoad(true);
          })
      } else {
        navigate('/login');
        setLoad(true);
      }
    } else {
      setLoad(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-right" /> */}
      {
        load && (
          <Routes>
            <Route path='/' element={<Project />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/login' element={<Login />} />
            <Route path='/board/:id' element={<Board />} />
          </Routes>
        )
      }
      <Alert />
    </QueryClientProvider>
  )
}

export default App;
