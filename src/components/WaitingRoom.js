
import PlayersList from './PlayersList';
import Whiteboard from './Whiteboard';

export default function WaitingRoom() {

    return (
        <div class="waiting">
            <PlayersList></PlayersList>
            <Whiteboard></Whiteboard>
        </div>
    );
}
