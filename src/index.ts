import { Observable } from 'rxjs';
import * as p5 from 'p5';

var sketch = (p: p5) => {
    // Wierzchołki trójkąta Sierpińskiego   
    let ax: number, ay: number;
    let bx: number, by: number;
    let cx: number, cy: number;
    let x: number, y: number;
    
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight-5);
        p.noLoop();
        p.background(0)
    }
    // },5000)

    // p.draw jest nieskończoną pętlą, która działa w określonym intervale czasowym sterowalnym funkcją p.frameRate()
    p.draw = () => {
        p.background(0);
        p.stroke(255);
        p.strokeWeight(6);

        ax = p.random(p.width);
        ay = p.random(p.height);
        bx = p.random(p.width);
        by = p.random(p.height);
        cx = p.random(p.width);
        cy = p.random(p.height);

        x = p.random(p.width);
        y = p.random(p.height);
        p.point(ax, ay);
        p.point(bx, by);
        p.point(cx, cy);

        p.strokeWeight(1);
        for(let i = 0; i < 100000; i++){ 
            p.point(x, y);

            let r = p.floor(p.random(3));

            if(r ==  0){
                p.stroke(255, 0, 255, 255);
                //lerp() is Linear Interpolation Function which calculates number between two numbers
                x = p.lerp(x, ax, 0.5);
                y = p.lerp(y, ay, 0.5);
            } else if (r == 1) {
                p.stroke(0, 255, 255, 255);
                x = p.lerp(x, bx, 0.5);
                y = p.lerp(y, by, 0.5);
            } else if (r == 2) {
                p.stroke(255, 255, 0, 255);
                x = p.lerp(x, cx, 0.5);
                y = p.lerp(y, cy, 0.5);
            }
        }
    }
}

var counter = 1;

var observable = Observable.create((observer:any) => {
    var p5object = new p5(sketch);

    const generator = setInterval(()=>{
        observer.next(p5object);
        //p5object.redraw();
    }, 5000);

    return () => {
        clearInterval(generator);
    }
})

var observer = observable.subscribe(
    (p5object:any) => {
        p5object.redraw(); //asynchronous redrawing our sketch
        return inc(++counter);
    },
    (error:any) => inc('Error: ' + error),
    () => inc('Completed')
);

function inc(val:any) {
    document.getElementById("counter").innerHTML = val;
}
