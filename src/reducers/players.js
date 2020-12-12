import {
	ADD_PLAYER,
	REMOVE_PLAYER,
} from '../constants/ActionsTypes'


const initialState = []

export default function players (state = initialState, action) {
	switch(action.type) {
		case ADD_PLAYER:
			return [
				...state,
				{
					id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
					completed: false,
					text: action.text,
					pseudo: action.pseudo,
					idSocket: action.idSocket,
					idPlayer: action.idPlayer
				}
			]
		case REMOVE_PLAYER:
			console.log('rec player', state)
			console.log('action id', action.idPlayer)
			return state.filter((player) => {
				return player.pseudo !== action.idPlayer
			})
        default:
            return state
    }
}