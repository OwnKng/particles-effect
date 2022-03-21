//@ts-nocheck
import "./App.css"
import { Canvas } from "@react-three/fiber"
import Particles from "./Particles"
import { useCanvas } from "./hooks/useCanvas"

const App = () => {
  const { canvasRef, texture, canvasWidth, canvasHeight, onMouseMove } =
    useCanvas()

  return (
    <div className='App'>
      <div className='canvas-wrapper'>
        <canvas
          className='interaction'
          onMouseMove={(event) => onMouseMove(event)}
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
      <div className='fiber'>
        <Canvas orthographic camera={{ zoom: 20, position: [0, 0, 30] }}>
          <Particles texture={texture} />
        </Canvas>
      </div>
    </div>
  )
}

export default App
