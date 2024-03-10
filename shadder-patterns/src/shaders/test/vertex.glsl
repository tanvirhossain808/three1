
varying vec2 vUv;
// varying vec3 hey;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    // modelViewMatrix.z=4.0;
    // modelViewMatrix.position.z=1.0;
    vUv=uv;
// hey=position;
}