import {
	ADD_PLAYER,
} from '../constants/ActionsTypes'


const initialState = [{
	text: 'Je dois créer mon state initial',
	completed: false,
	id: 10
}]

export default function players (state = initialState, action) {
	switch(action.type) {
		case ADD_PLAYER:
			return [
				...state,
				{
					id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
					completed: false,
					text: action.text
				}
            ]
        default:
            return state
    }
}