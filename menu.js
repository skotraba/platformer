var background;

class menu extends Phaser.Scene {
    constructor() {
        super("startMenu");
    }

    preload(){
        this.load.spritesheet('background', 'assets/idkagain.png',{ frameWidth: 800, frameHeight: 600})
    }
    create(){
        //Load background image
        this.background = this.add.sprite(0,0,'background').setOrigin(0,0)
        
        //animate
        this.anims.create({
            key:"menuPlay",
            frames: this.anims.generateFrameNumbers("background",{
                start:0,
                end:2
            }),
            frameRate: 2,
            repeate: 0
        })

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // setTimeout(() => {
        //     this.scene.start('startGame')
        // }, 2000)

    }
    update(){
        this.background.anims.play("menuPlay", true)

        if(this.keySpace.isDown) {
            this.scene.start('startGame')
        }
    }
}