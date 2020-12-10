
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { SocketProvider } from '../contexts/SocketProvider';
import Login from './Login';
import WaitingRoom from './WaitingRoom';


function App() {

  return (
    <Router>
      <SocketProvider>
          <Switch>
            <Route path="/" exact component={ Login }/>
            <Route path="/waitingRoom" component={ WaitingRoom }/>
          </Switch>
      </SocketProvider>
    </Router>
  );
}

export default App;
