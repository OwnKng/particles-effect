import { useThree } from "@react-three/fiber"
import Material from "./Material"

const Plane = ({ texture }: any) => {
  const { viewport } = useThree()
  const { width, height } = viewport

  return (
    <mesh>
      <planeBufferGeometry args={[width, height, 64, 64]} />
      <Material texture={texture.current} />
    </mesh>
  )
}

export default Plane
