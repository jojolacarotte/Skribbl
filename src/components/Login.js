import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSocket } from '../contexts/SocketProvider';

import { addPlayer } from '../actions';

export default function Login() {

  const playersList = useSelector(state => state.players)
  const socket = useSocket();
  const history = useHistory();
  const [pseudo, setPseudo] = useState("");
  const [roomCode, setRoomCode] = useState(1);
  const dispatch = useDispatch()

  function joinGame() {
    socket.emit('joinGame', pseudo, roomCode, (success, players, status, playerID, wordsCount) => {

      if(!success)
        return

      console.log(`Joined game.🧻 Players:, ${players}, Game status: ${status}, Room ${roomCode}, PlayerID:, ${playerID}`)

      Object.keys(players).forEach(key => {
        const hasAlready = playersList.some((el)=> el.pseudo === pseudo)
        if (!hasAlready) {
          dispatch(addPlayer(roomCode, players[key].name, null,playerID))
        }
      })
  
      history.push('/waitingRoom');
    })
  }
  
  function createGame() {

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
