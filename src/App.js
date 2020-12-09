import { useState, useEffect } from 'react';
import './App.css';

import socketIOClient from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:4001";

function App() {

  const [pseudo, setPseudo] = useState();
  const [roomCode, setRoomCode] = useState();

  var socket;

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  function joinGame() {
    socket.io.emit('joinGame', this.state.name, this.state.gameCode, (success, players, status, playerID, wordsCount) => {

      if(!success)
        return

      console.log('Joined game. Players:', players, 'Game status:', status, 'PlayerID:', playerID)

      // socket.Game = {

      //   code: this.state.gameCode,
      //   wordsCount: wordsCount,
      //   status: status,
      //   players: players,
      //   playerData: { id: playerID, name: this.state.name, gameCode: this.state.gameCode, points: 0 }

      // }

      // this.setState({ redirectToWaiting: true })

    })
  }

  function createGame() {
    setRoomCode(1);

    joinGame()
  }

  return (
    <div className="accueil">

      <h1 className="title">Welcome!</h1>
      <h2 className="subtitle">Enter a code or create a new game!</h2>

      <p>Vous avez cliqué {pseudo} fois</p>
      <p>Vous avez cliqué {roomCode} fois</p>

      <input type="text" placeholder="Pseudo" name="pseudo" value={pseudo} onChange={e => setPseudo(e.target.value)} />
      <input type="text" placeholder="Code Room" name="roomCode" value={roomCode} onChange={e => setRoomCode(e.target.value)} />

      <button name="join" onClick={joinGame}>Rejoindre une partie !</button>

      <button name="create" onClick={createGame}>Créer une partie !</button>

    </div>
  );
}

export default App;
