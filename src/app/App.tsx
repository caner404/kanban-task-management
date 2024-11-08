import { AppLayout } from '@/components/layout/AppLayout';
import { useEffect } from 'react';
import { fetchBoards } from '../features/boards';
import { useAppDispatch } from './hooks';

function App() {
  const dispatch = useAppDispatch();
  //const { boards, loading, error } = useAppSelector((state) => state.boards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);
  return (
    <div className="flex flex-col h-[100vh]">
      <AppLayout />
    </div>
  );
}

export default App;
