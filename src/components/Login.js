import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSocket } from '../contexts/SocketProvider';
import { useGame } from '../contexts/GameProvider';

import Socket from '../game/Socket.js'

export default function Login(props) {

  const socket = useSocket();
  const [game, setGame] = useGame(props.gameData);
  const history = useHistory();
  const [pseudo, setPseudo] = useState("");
  const [roomCode, setRoomCode] = useState("");

  function joinGame() {
    socket.emit('joinGame', pseudo, roomCode, (success, players, status, playerID, wordsCount) => {

      if(!success)
        return

      console.log(`Joined game. Players:, ${players}, Game status:, ${status}, PlayerID:, ${playerID}`)
  
      // Replace by Redux
      Socket.Game = {

        code: roomCode,
        wordsCount: wordsCount,
        status: status,
        players: players,
        playerData: { id: playerID, name: pseudo, gameCode: roomCode, points: 0 }

      }

      console.log('game', Socket.Game)
  
      history.push('/waitingRoom');
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

      <input type="text" placeholder="Pseudo" name="pseudo" value={pseudo} onChange={e => setPseudo(e.target.value)} />
      <input type="text" placeholder="Code Room" name="roomCode" value={roomCode} onChange={e => setRoomCode(e.target.value)} />

      <button name="join" onClick={joinGame}>Rejoindre une partie !</button>

      <button name="create" onClick={createGame}>Créer une partie !</button>

    </div>
  );
}
