 precision mediump float;
// varying float vRandom;
uniform vec3 uColor;
varying vec2 vUv;
varying float vArivation;
uniform sampler2D uTexture;
    void main(){
        vec4 textureColor=texture2D(uTexture,vUv);
        textureColor.rgb *=vArivation*2.0+.5;
        //  gl_FragColor=vec4(.5,vRandom,1.0,1.0);
        gl_FragColor=textureColor;
    }
    