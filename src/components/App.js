
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { SocketProvider } from '../contexts/SocketProvider';
import { GameProvider } from '../contexts/GameProvider';
import { CanvasProvider } from '../contexts/CanvasProvider';
import Login from './Login';
import rootReducer from './../reducers'
import WaitingRoom from './WaitingRoom';

const store = createStore(rootReducer)

function App() {

  return (
    <Router>
      <Provider store={store}>
        <SocketProvider>
          <GameProvider>
            <Switch>
              <Route path="/" exact component={ Login }/>
              <CanvasProvider>
                <Route path="/waitingRoom" component={ WaitingRoom }/>
              </CanvasProvider>
            </Switch>
          </GameProvider>
        </SocketProvider>
      </Provider>
    </Router>
  );
}

export default App;
