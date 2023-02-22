import { EventEmitter } from "events";
import Experience from "./Experience";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Resources extends EventEmitter{
    constructor(assets){
        super()
        this.experience = new Experience();
        this.renderer = this.experience.renderer;
        this.scene = this.experience.scene;
        this.assets = assets;
        this.items = {}
        this.queue = this.assets.length;
        this.loaded = 0;
        gsap.registerPlugin(ScrollTrigger)
        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();

        this.loaders.dracoLoader.setDecoderPath("/draco");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }

    startLoading(){
        for(const asset of this.assets){
            if(asset.type==="glbModel"){
                this.loaders.gltfLoader.load(asset.path, (file)=>{
                    this.singleAssetLoaded(asset, file);
                })
            }
        }
    }


    singleAssetLoaded(asset, file){
        this.items[asset.name] = file;
        this.loaded++;
        if(this.loaded===this.queue){
            this.emit("ready");
            this.actualroom = this.items.cake.scene;
            this.actualroom.children.forEach((child) =>{
                child.castShadow = true;
                child.recieveShadow = true;
                child.scale.set(0,0,0)
                
                gsap.to(child.rotation, {
                    y:2,
                    duration:3,
                })
                if((child.name=="Cylinder001") || (child.name=="Cylinder")){
                    gsap.to(child.scale, {
                        x:.3,
                        y:.3, 
                        z:.3,
                        duration:1,
                        ease: "back.out(1)"
                    }) 
                
                }
                else if((child.name=="Cylinder002") || child.name=="Cylinder003"){
                    child.position.y += .08
                    gsap.to(child.scale, {
                        x:.24,
                        y:.24, 
                        z:.24,
                        duration:1,
                        ease: "back.out(1)"
                })
               
            }
            else if((child.name=="Cylinder004") || child.name=="Cylinder005"){
                child.position.y += .11
                gsap.to(child.scale, {
                    x:.2,
                    y:.2, 
                    z:.2,
                    duration:1,
                    ease: "back.out(1)"
            })
        }   
            else if(child.name=="Plane"){
                gsap.to(child.scale, {
                    x:100,
                    z:100
                })
            }
            else{
                child.position.y+=.21
                gsap.to(child.scale, {
                    x:.3,
                    y:1.1,
                    z:.3,
                    duration:10,
                    ease:"back.out(3)"
                })
            }
                if(child instanceof THREE.Group){
                    child.children.forEach((groupchild) =>{
                        groupchild.castShadow = true;
                        groupchild.receiveShadow = true;
                    })
                    
                }
            })
            this.Timeline = new gsap.timeline({
                scrollTrigger:{
                  trigger:".first-move",
                  start:"top",
                  end: "bottom",
                  scrub:0.6,
                  invalidateOnRefresh: true,
                }
              })
              this.Timeline.to(this.actualroom.position, {
                x: ()=>{
                  return this.experience.sizes.width * 0.0004;
                }
              })
            this.scene.add(this.actualroom)
        }
    }
}
