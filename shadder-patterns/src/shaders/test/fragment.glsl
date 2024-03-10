varying vec2 vUv;
// varying vec3 hey;
// float random(vec2 st){
//     return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
// }
void main()
{
    // float o=hey.y;
    //pattern-7
    // float strength =mod(vUv.x*10.0,1.0);

//pattern-8
    // float strength =mod(vUv.y*2.0,1.0);
    // float strength=step(.8,mod(vUv.y*10.0,1.0));
    // strength *=step(.4,mod(vUv.x*10.0,1.0));
    // strength=step(0.5,strength);
    // if(strength<0.5) strength=0.0;
    // else strength-1.0;

//pattern9
    // float strength =mod(vUv.y*10.0,1.0);
    // strength=step(0.8,strength);

    //pattern-10
        // float strength =mod(vUv.x*10.0,1.0);
        // strength=step(0.8,strength);
//pattern-11
    // float strength =step(0.8,mod(vUv.x*10.0,1.0));
    //       strength +=step(0.8,mod(vUv.y*10.0,1.0));  

//pattern-12
//   float strength =step(0.8,mod(vUv.x*10.0,1.0));
//           strength *=step(0.8,mod(vUv.y*10.0,1.0));  

// // pattern-13
//   float strength =step(0.4,mod(vUv.x*10.0,1.0));
//           strength *=step(0.8,mod(vUv.y*10.0,1.0));  

// pattern-14
//   float barX =step(0.4,mod(vUv.x*10.0,1.0));
//           barX *=step(0.8,mod(vUv.y*10.0,1.0));  

//           float barY=step(0.8,mod(vUv.x*10.0,1.0));
//           barY *=step(0.4,mod(vUv.y*10.0,1.0));

//           float barXY=barX+barY;

// pattern-15

  float barX =step(0.4,mod(vUv.x*10.0,1.0));
          barX *=step(0.8,mod(vUv.y*10.0+0.2,1.0));  

          float barY=step(0.8,mod(vUv.x*10.0+0.2,1.0));
          barY *=step(0.4,mod(vUv.y*10.0,1.0));

          float strength=barX+barY;


// pattern-16
// float strength=abs(vUv.x-.5);

//pattern-17

// float strength=min(abs(vUv.x-.5),abs(vUv.y-.5));
//pattern-18
// float strength=max(abs(vUv.x-.5),abs(vUv.y-.5));
//pattern-19
// float strength=step(0.2,max(abs(vUv.x-.5),abs(vUv.y-.5)));
//pattern-20
// float squre1=step(0.2,max(abs(vUv.x-.5),abs(vUv.y-.5)));
// float squre2=1.0-step(0.25,max(abs(vUv.x-.5),abs(vUv.y-.5)));
// float strength=squre1*squre2;

//pattern-21
// float strength=step(.5,vUv.x);
// float strength=floor(vUv.x*10.0)/10.0;

// pattern-22
// float strength=floor(vUv.x*10.0)/10.0;
//  strength *=floor(vUv.y*10.0)/10.0;

//pattern-23

// float strength=random(vUv);

//pattern-24
// vec2 gridUv=vec2(
//     floor(vUv.x*10.0)/10.0,
//     floor(vUv.y*10.0)/10.0
// );

//pattern-25
// vec2 gridUv=vec2(
//     floor(vUv.x*10.0)/10.0,
//     floor((vUv.y+vUv.x*.5)*10.0)/10.0
// );
// float strength=random(gridUv);

// pattern-26

// float strength=length(vUv);

// pattern-27
// float strength=length(vUv-0.5);
// float strength=distance(vUv,vec2(0.5));
//pattern-28

// float strength=1.0-distance(vUv,vec2(0.5));

// pattern-29
// float strength =0.015/distance(vUv,vec2(0.5));
//pattern-30
// vec2 lightUv=vec2(
//     vUv.x*0.1+0.45,
//     vUv.y*0.5+0.25
// );
// float strength =0.015/distance(lightUv,vec2(0.5));

// float strength=random(gridUv);
    // gl_FragColor = vec4(strength, strength,strength, 1.0);
    gl_FragColor = vec4(strength,strength,strength, 1.0);
}