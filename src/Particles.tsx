//@ts-nocheck
import { useThree } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { InstancedMesh } from "three"
import Material from "./Material"

const Particles = ({ texture }: any) => {
  const { viewport } = useThree()
  let { width, height } = viewport

  width = Math.ceil(width)
  height = Math.ceil(height)

  const numberOfPoints = width * height

  const ref = useRef<InstancedMesh>(null!)

  const vertices = useMemo(
    () =>
      new Float32Array([
        -0.5, 0.5, 0.0, 0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0,
      ]),
    []
  )

  const uvs = useMemo(
    () => new Float32Array([0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0]),
    []
  )

  const index = useMemo(() => new Uint16Array([0, 2, 1, 2, 3, 1]), [])

  const [offsets, angle] = useMemo(() => {
    const offsets = []
    const angle = []

    for (let i = 0; i < numberOfPoints; i++) {
      offsets[i * 3 + 0] = i % width
      offsets[i * 3 + 1] = Math.floor(i / width)
      offsets[i * 3 + 2] = 0

      angle[i] = Math.random() * Math.PI
    }

    return [new Float32Array(offsets), new Float32Array(angle)]
  }, [numberOfPoints, width])

  return (
    <instancedMesh
      ref={ref}
      position={[-width / 2, -height / 2, 0]}
      args={[null, null, numberOfPoints]}
    >
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          args={[vertices, 3]}
        />
        <bufferAttribute
          attach='index'
          array={index}
          count={index.length}
          itemSize={1}
        />
        <bufferAttribute attachObject={["attributes", "uv"]} args={[uvs, 2]} />
        <instancedBufferAttribute
          attachObject={["attributes", "offset"]}
          args={[offsets, 3]}
        />
        <instancedBufferAttribute
          attachObject={["attributes", "angle"]}
          args={[angle, 1]}
        />
      </bufferGeometry>
      <Material texture={texture.current} width={width} height={height} />
    </instancedMesh>
  )
}

export default Particles
