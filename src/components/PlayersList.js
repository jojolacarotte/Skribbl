import {useGame} from "./../contexts/GameProvider"

export default function PlayerList(props) {

    const [game, setGame] = useGame()

    return (

        <div className="Players">
            <h1 className="title">Joueurs</h1>
            <ul>
                {Object.keys(props.players).map(key =>
                    <li key={key}>
                        <h1>{props.players[key].name}</h1>
                        <h2>{props.players[key].points}</h2>
                    </li>
                )}
            </ul>
        </div>

    );
}