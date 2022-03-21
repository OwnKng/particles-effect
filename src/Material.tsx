import { useMemo } from "react"
import * as THREE from "three"
import { vertex, fragment } from "./shaders"

const Material = ({ texture, width, height }: any) => {
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTextureSize: { value: new THREE.Vector2(width, height) },
    }),
    [texture, width, height]
  )

  return (
    <shaderMaterial
      uniforms={uniforms}
      vertexShader={vertex}
      fragmentShader={fragment}
      transparent={true}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
    />
  )
}

export default Material
