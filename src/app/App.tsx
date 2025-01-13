import { AppLayout } from '@/components/layout/AppLayout';
import { useEffect } from 'react';
import { fetchBoards } from '../features/boards';
import { useAppDispatch } from './hooks';
import { DarkModeProvider } from '@/context';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
    <DarkModeProvider>
      <div className="flex flex-col h-[100vh]">
        <AppLayout />
      </div>
    </DarkModeProvider>
  );
}

export default App;
