
export class Circle {
    color: cc.Color;
    pos: cc.Vec2;
    radius: number;
    colorId: number;
    

    rectPos: cc.Vec2;
    boringCirclePos: cc.Vec2;
    funCirclePos: cc.Vec2;
    fun: boolean;
    
    //animation
    startPos: cc.Vec2;
    endPos: cc.Vec2;
    time: number;
    animating: boolean;

    constructor(color: cc.Color, rectPos: cc.Vec2, boringCirclePos: cc.Vec2, funCirclePos: cc.Vec2, radius: number, colorId: number) {
        this.color = color;
        this.pos = new cc.Vec2(rectPos);
        this.rectPos = new cc.Vec2(rectPos);
        this.boringCirclePos = new cc.Vec2(boringCirclePos);
        this.funCirclePos = new cc.Vec2(funCirclePos);
        this.radius = radius;
        this.colorId = colorId;
    }

    draw(graphics: cc.Graphics) {
        graphics.fillColor = this.color;
        graphics.circle(this.pos.x, this.pos.y, this.radius);
        graphics.fill();
    }

    update(dt) {
        if(!this.animating) return;

        this.time += dt;

        // exponential easing out
        this.pos.x = (this.endPos.x - this.startPos.x)*( -Math.pow( 2, -10 * this.time ) + 1 ) + this.startPos.x;
        this.pos.y = (this.endPos.y - this.startPos.y)*( -Math.pow( 2, -10 * this.time ) + 1 ) + this.startPos.y;

        if(this.time >= 1) {
            this.animating = false;
            this.pos = new cc.Vec2(this.endPos);
        }

    }

    toggleShape(shapeRect: boolean) {
        this.startPos = new cc.Vec2(this.pos);
        this.endPos = shapeRect ? this.rectPos : (this.fun ? this.funCirclePos : this.boringCirclePos);
        this.time = 0;
        this.animating = true;
    }

    toggleAnimation() {
        this.fun = !this.fun;
    }
}
