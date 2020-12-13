import React, { useContext, useState } from 'react'
import { useSocket } from '../contexts/SocketProvider';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPlayer, removePlayer } from '../actions';

const GameContext = React.createContext()

export const useGameuseCanvas = () => useContext(GameContext);

export function GameProvider({children}) {
  const gameState = useState(0)
  const socket = useSocket()
  const dispatch = useDispatch()
  const players = useSelector(state => state.players)

  useEffect(() => {
      if (socket == null) return
  
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
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  )
}