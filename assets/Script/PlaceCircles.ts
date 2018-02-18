import {Circle} from "Circle"

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({
        min: 5,
        max: 20
    })
    width: number = 20;

    @property({
        min: 3,
        max: 15
    })
    height: number = 15;    

    @property()
    radius: number = 10;

    @property(cc.Color)
    colors = [];

    circles: Circle[] = new Array();
    shapeRect: boolean;

    onLoad() {
        if(cc.director.setClearColor){
            cc.director.setClearColor(cc.Color.BLACK)
        }

        this.initCircles();
        this.setColorAnimation();
        this.shapeRect = true;
    }

    initCircles() {
        let circlesCount = (this.width - 1)*2 + (this.height - 1) * 2;
        var size = cc.view.getFrameSize()
        let center = new cc.Vec2(size.width/2, size.height/2);
        let offset = this.radius*2;
        
        //without angle offset animation would be rotational
        let angleOffset = Math.floor(this.height/2);

        //angle for circle positions
        let angle = 360/circlesCount;
        let funAngle = angle*angleOffset;

        //angles must be in radians
        funAngle *= Math.PI/180;
        angle *= Math.PI/180;
        
        let funCirclePos = new cc.Vec2();
        let boringCirclePos = new cc.Vec2();

        //initial rect positions moved so that the rect center would be the same as the circle center
        let rectPos = new cc.Vec2(center.x + this.width/2*offset, center.y + this.height/2*offset);

        let diagonal = Math.sqrt(this.width*this.width+this.height*this.height)*offset;
        let bigCircleRadius = diagonal/2;


        let colorId = 0;
        for(let i = 0; i < circlesCount; ++i){
            boringCirclePos.x = bigCircleRadius * Math.cos(angle*(i+angleOffset)) + center.x;
            boringCirclePos.y = bigCircleRadius * Math.sin(angle*(i+angleOffset)) + center.y;

            funCirclePos.x = bigCircleRadius * Math.cos(funAngle*i) + center.x;
            funCirclePos.y = bigCircleRadius * Math.sin(funAngle*i) + center.y;

            //rect positions
            if(i < this.width) {
                rectPos.x -= offset;
            } else if(i < this.width+this.height-1){
                rectPos.y -= offset;
            } else if(i < (this.width-1)*2+this.height){
                rectPos.x += offset;
            } else{
                rectPos.y += offset;
            }

            this.circles.push(new Circle(this.colors[colorId], rectPos, boringCirclePos, funCirclePos, this.radius, colorId));

            colorId = this.getNextColorId(colorId);
        }
    }

    getNextColorId(colorId: number): number {
        colorId++;
        if(colorId >= this.colors.length) {
            colorId = 0;
        }
        return colorId;
    }

    setColorAnimation() {
        this.schedule(function() {
            for(var circle of this.circles) {
                circle.colorId = this.getNextColorId(circle.colorId);
                circle.color = this.colors[circle.colorId];
            }
        }, 0.5);
    }

    update(dt: number) {
        var g = this.getComponent(cc.Graphics);
        g.clear();
        for(var circle of this.circles) {
            circle.update(dt);
            circle.draw(g);
        }
    }

    toggleShape() {
        this.shapeRect = !this.shapeRect;

        for(var circle of this.circles) {
            circle.toggleShape(this.shapeRect);
        }
    }

    toggleAnimation() {
        for(var circle of this.circles) {
            circle.toggleAnimation();
        }
    }
}
