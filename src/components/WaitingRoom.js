
import PlayersList from './PlayersList';
import Socket from '../game/Socket.js'

export default function WaitingRoom() {

    return (
        <PlayersList players={Socket.Game.players}></PlayersList>
    );
}
