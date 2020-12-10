
import { SocketProvider } from '../contexts/SocketProvider';
import Login from './Login';


function App() {

  return (
    <SocketProvider>
      <Login></Login>
    </SocketProvider>
  );
}

export default App;
