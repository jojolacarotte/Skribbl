import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../contexts/SocketProvider';

import { addPlayer, removePlayer } from '../actions';

export default function PlayerList() {

    const players = useSelector(state => state.players)
    const socket = useSocket()
    const dispatch = useDispatch()

    console.log('players list', players)

    useEffect(() => {
        if (socket == null || players.length === 0) return
    
        socket.on('playerJoin', (pseudo, playerID) => {
            const hasAlready = players.some((el)=> el.pseudo === pseudo)

            if (!hasAlready) {
                dispatch(addPlayer(null, pseudo, null, playerID))
                console.log(`${pseudo} joined. Players: `, players);
            }
        })

        socket.on('playerLeave', (pseudo, playerID) => {
            dispatch(removePlayer(pseudo))
            console.log(`${pseudo} left.`);
        })
    },[socket])

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