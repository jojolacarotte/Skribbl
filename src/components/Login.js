import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSocket } from '../contexts/SocketProvider';
import { useGame } from '../contexts/GameProvider';
import PropTypes from 'prop-types'

import Socket from '../game/Socket.js'
import { addPlayer } from '../actions';

export default function Login({play, actions}) {

  const socket = useSocket();
  const [game, setGame] = useGame();
  const history = useHistory();
  const [pseudo, setPseudo] = useState("");
  const [roomCode, setRoomCode] = useState(1);

  const counter = useSelector(state => console.log('state', state))
  const dispatch = useDispatch()

  console.log('actions', actions)
  console.log('play', play)

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

      dispatch(addPlayer(pseudo))
  
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

Login.propTypes = {
  actions: PropTypes.object.isRequired,
}
