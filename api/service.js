var os = require("os");
var process = require("process");
var cluster = require("cluster");
const { resolve } = require("path");
process.env.UV_THREADPOOL = os.cpus().length;

class thread_manager {
    constructor(){
        this.threadPool= process.env.UV_THREADPOOL;
        this.name = process.env.name;
    }

    cpuState(){
        if(cluster.isMaster){
            for(let i = 0; i<process.env.UV_THREADPOOL; i++){
                cluster.fork();
                console.log(process.env.UV_THREADPOOL + " CPU LENGTH ");
                console.log(this.name);
            }
        
            cluster.on("exit",()=>{
                cluster.fork()
            })
        
        }
    }
}

let thread = new thread_manager();

setTimeout(()=>thread.cpuState(),10);

