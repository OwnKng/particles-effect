//@ts-nocheck
import React from "react"
import { useCanvas } from "./hooks/useCanvas"

const App = () => {
  const { canvasRef, canvasWidth, canvasHeight, onMouseMove } = useCanvas()

  return (
    <div>
      <canvas
        onMouseMove={(event) => onMouseMove(event)}
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
    </div>
  )
}

export default App
