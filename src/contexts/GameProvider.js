import React, { useContext, useState } from 'react'

const GameContext = React.createContext()

export function useGame() {
  return useContext(GameContext)
}

export function GameProvider({children}) {
  const gameState = useState(0)

  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  )
}