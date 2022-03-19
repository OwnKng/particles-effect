// @ts-nocheck
import { useRef, useEffect } from "react"

const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight

const update = (coord) => ({
  ...coord,
  size: coord.size <= 0 ? 0 : coord.size - 1,
})

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!)

  const coordsRef = useRef([])

  const requestRef = useRef()

  const onMouseMove = (event: any) => {
    const currentCoords = {
      x: event.clientX,
      y: event.clientY,
      size: 64,
    }

    coordsRef.current = [...coordsRef.current, currentCoords]
  }

  const drawParticles = () => {
    const canvasObj = canvasRef.current
    const ctx = canvasObj.getContext("2d")
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    if (coordsRef.current.length > 200) {
      coordsRef.current = coordsRef.current.slice(1)
    }

    if (coordsRef.current.length) {
      coordsRef.current = coordsRef.current.map((coord) => update(coord))

      for (let i = 0; i < coordsRef.current.length; i++) {
        const { x, y, size } = coordsRef.current[i]
        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    requestRef.current = requestAnimationFrame(drawParticles)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(drawParticles)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  return {
    canvasRef,
    canvasWidth,
    canvasHeight,
    onMouseMove,
  }
}
