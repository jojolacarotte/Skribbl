import * as types from '../constants/ActionsTypes'

export const addPlayer = (text) => ({
	type: types.ADD_PLAYER,
	text,
})