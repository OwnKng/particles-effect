// @ts-nocheck
import { useRef, useEffect } from "react"
import * as THREE from "three"

const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight

const update = (coord) => ({
  ...coord,
  size: coord.size <= 0 ? 0 : coord.size - 2,
})

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!)

  const coordsRef = useRef([])
  const requestRef = useRef()
  const texture = useRef()

  const onMouseMove = (event: any) => {
    const currentCoords = {
      x: event.clientX,
      y: event.clientY,
      size: 256,
    }

    coordsRef.current = [...coordsRef.current, currentCoords]
  }

  useEffect(() => {
    texture.current = new THREE.CanvasTexture(canvasRef.current)
  }, [canvasRef])

  const drawParticles = () => {
    const canvasObj = canvasRef.current
    const ctx = canvasObj.getContext("2d")
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvasObj.width, canvasObj.height)

    if (coordsRef.current.length > 200) {
      coordsRef.current = coordsRef.current.slice(1)
    }

    if (coordsRef.current.length) {
      coordsRef.current = coordsRef.current.map((coord) => update(coord))

      for (let i = 0; i < coordsRef.current.length; i++) {
        const { x, y, size } = coordsRef.current[i]
        const gradient = ctx?.createRadialGradient(
          x,
          y,
          size * 0.25,
          x,
          y,
          size
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)")

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    texture.current.needsUpdate = true

    requestRef.current = requestAnimationFrame(drawParticles)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(drawParticles)
    return () => cancelAnimationFrame(requestRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    texture,
    canvasRef,
    canvasWidth,
    canvasHeight,
    onMouseMove,
  }
}
