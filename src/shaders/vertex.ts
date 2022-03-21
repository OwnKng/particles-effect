export const vertex = `
  attribute vec3 offset;  
  attribute float angle; 
  uniform vec2 uTextureSize; 
  uniform sampler2D uTexture; 
  
  varying vec2 vUv; 
  varying float vStrength; 
  varying vec2 vParticleUv; 
  
  void main() {
    vec3 displaced = offset; 

    vec2 particleUv = displaced.xy / uTextureSize; 
    float strength = texture2D(uTexture, particleUv).r; 
    
    displaced.z += strength * 20.0;
    displaced.x += cos(angle) * strength * 5.0;
    displaced.y += sin(angle) * strength * 5.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    float pSize = strength; 
    pSize = max(pSize, 0.3);

    mvPosition.xyz += position * pSize;      
    
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv; 
    vStrength = strength; 
    vParticleUv = particleUv; 
    }
`
