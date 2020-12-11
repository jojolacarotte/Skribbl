import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../contexts/SocketProvider';

import { addPlayer } from '../actions';

export default function PlayerList() {

    const players = useSelector(state => state.players)
    const socket = useSocket()
    const dispatch = useDispatch()

    useEffect(() => {
        if (socket == null) return
    
        socket.on('playerJoin', (pseudo, playerID) => {
            dispatch(addPlayer(null, pseudo, playerID))
            console.log(`${pseudo} joined. Players: `, players);
        })
    }, [socket])

    return (

        <div className="Players">
            <h1 className="title">Joueurs ({players.length})</h1>
            <ul>
                {Object.keys(players).map(key =>
                    <li key={key}>
                        <h1>{players[key].pseudo}</h1>
                        <h2>{players[key].points} {players[key].points > 0 ? 'points' : 'point'}</h2>
                    </li>
                )}
            </ul>
        </div>

    );
}