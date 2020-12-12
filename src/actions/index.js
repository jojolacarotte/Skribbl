import * as types from '../constants/ActionsTypes'

export const addPlayer = (text, pseudo, idSocket, idPlayer) => ({
	type: types.ADD_PLAYER,
	pseudo,
	idSocket,
	text,
	idPlayer
})

export const removePlayer = (idPlayer) => ({
	type: types.REMOVE_PLAYER,
	idPlayer
})