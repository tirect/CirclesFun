const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonManager extends cc.Component {

    @property(cc.Button)
    animButton: cc.Button = null;

    @property(cc.Label)
    animLabel: cc.Label = null;

    @property(cc.Label)
    shapeLabel: cc.Label = null;

    animTexts: {[key: string]: string} = {"Fun": "Boring", "Boring": "Fun"};
    shapeTexts: {[key: string]: string} = {"Circle": "Rect", "Rect": "Circle"};

    getAnimText(v: string): string {
        return this.animTexts[v];
    }

    getShapeText(v: string): string {
        return this.shapeTexts[v];
    }

    onLoad() {
        this.animLabel.string = "Boring";
        this.shapeLabel.string = "Circle";
    }

    animPressed() {
        this.animLabel.string = this.getAnimText(this.animLabel.string);
    }

    shapePressed() {
        this.animButton.enabled = !this.animButton.enabled;
        this.shapeLabel.string = this.getShapeText(this.shapeLabel.string);
    }
}
