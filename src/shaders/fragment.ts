import { hsl2rgb } from "./hsl2rgb"

export const fragment = `
    varying vec2 vUv; 
    varying float vStrength; 
    varying vec2 vParticleUv; 
    
    ${hsl2rgb}

    void main() {

        float distanceToBottom = distance(vec2(1.0), vParticleUv) * 0.5; 

        vec3 color = hsl2rgb(0.6 + distanceToBottom * 0.5, 0.7, 0.7);

        float alpha = 1.0 - smoothstep(0.3, 0.5, length(vUv - vec2(0.5)));

        gl_FragColor = vec4(color, alpha); 
    }
`
