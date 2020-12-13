import { useSelector } from 'react-redux';


export default function PlayerList() {

    const players = useSelector(state => state.players)

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
