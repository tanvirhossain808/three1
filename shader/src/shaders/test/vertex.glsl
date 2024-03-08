
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    uniform vec2 uFrequency;
    uniform float uTime;
    attribute vec3 position;
    attribute vec2 uv;
    attribute float aRandom;
    varying vec2 vUv;
    varying float vRandom;

    varying float vArivation;
//     attribute vec3 position;
//     float loremImpsum(){
//     float a=1.0;
//     float b=2.0;

//     return a+b;
// }


    void main(){
        // float a=1.0;
        // float b=1.0;
        // float c=a+b;
        // int foo=123;
        // int bar=-1;
// int a=1;
// int b=2;
// int c=a*b;

// float a=1.0;
// int b=2;
// float c=a*float(b);

// bool foo =true;
// bool bar =false;

// vec2 foo=vec2(0.0);

// foo.x=1.0
// foo.y=2.0
// vec2 foo=vec2(1.0,2.0);
// foo *=2;
// vec3 foo=vec3(.0);
// vec3 bar=vec3(1.0,2.0,3.0);
// vec3 purpleColor=vec3(.0);
// purpleColor.r=.5;
// purpleColor.b=1.0;
        
// vec2 foo=vec2(1.0,2.0);
// vec3 bar=vec3(foo,3.0);
// vec2  hey=bar.xy;

// float result=loremImpsum();

vec4 foo =vec4(1.0,2.0,3.0,4.0);
// float br=foo.w

vec4 modelPosition=modelMatrix*vec4(position,1.0);
float elevataion = sin(modelPosition.x*uFrequency.x-uTime)*.1;
elevataion +=sin(modelPosition.y*uFrequency.y-uTime)*.1;


modelPosition.z +=elevataion;

// modelPosition.z+=sin(modelPosition.x*uFrequency.x - uTime)*.1;
// modelPosition.z+=sin(modelPosition.y*uFrequency.y - uTime)*.1;
// modelPosition.z+=aRandom*.1;
vec4 viewPosition=viewMatrix * modelPosition;
vec4 projectionMatrix=projectionMatrix *viewPosition;

        gl_Position=projectionMatrix;
        // gl_Position=projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        // gl_Position.x +=.5;
        // gl_Position.y +=.5;
        vRandom=aRandom;
        vUv=uv;
        vArivation=elevataion;
    }