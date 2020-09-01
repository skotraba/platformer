var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 2000 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};


var game = new Phaser.Game(config);
var player, walk, platforms, tele, jump, fall, finish

function preload(){
  this.cameras.main.setBounds(0, 0, 2200, 500);

  this.physics.world.setBounds(-50, -200, 2200, 900);

  this.load.image('sky', 'assets/testBack.png')
  this.load.image('clouds', 'assets/clouds.png')
  this.load.image('ground', 'assets/road.png')
  this.load.image('grass2', 'assets/grass2.png')
  this.load.image('grass', 'assets/ground.png')
  this.load.image('tree', 'assets/tree.png')
  this.load.image('platform', 'assets/metalBox.png')
  this.load.image('tele', 'assets/tele.png')
  this.load.spritesheet('player', 'assets/mydood.png',{ frameWidth: 32, frameHeight: 32})

  //Audio
  this.load.audio('jump', './audio/jump_03.wav')
  this.load.audio('fall', './audio/death.wav')
  this.load.audio('finish', './audio/round_end.wav')

  //Arrow keys
  this.cursors = this.input.keyboard.createCursorKeys()

}

function create(){
  

  // this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky').setOrigin(0,0).setScrollFactor(0)
  this.sky = this.add.image(0,0, 'sky').setOrigin(0,0)
  this.add.image(0, 0, 'clouds')
  this.add.image(0, -50, 'tree').setOrigin(0,0)
  
  
  //Tilesprite and scroll factor allows repeating scrolling background
  this.grass = this.add.tileSprite(0, 400, game.config.width, 200, 'grass').setOrigin(0, 0).setScrollFactor(0)
  this.grass2 = this.add.tileSprite(0, 400, game.config.width, 200, 'grass2').setOrigin(0, 0).setScrollFactor(2)
  this.grass2 = this.add.tileSprite(0, 400, game.config.width, 200, 'grass2').setOrigin(0, 0).setScrollFactor(2)
  
  //Add scrolling ground but give it physics
  // ground = this.add.tileSprite(0, 500, game.config.width, 200, 'ground').setOrigin(0, 0).setScrollFactor(0)
  //Add ground to physics system, default value is false which means dynamic value, setting true makes it static and does not react to forces therefore setting gravity is no longer needed, keeping for reference
  // this.physics.add.existing(ground, true)
  //Remove gravity so it stays in place
  // ground.body.setAllowGravity(false)


  platforms = this.physics.add.staticGroup();
  //Starting platform
  platforms.create(40, 500, 'platform')
  //Other in order
  platforms.create(220, 400, 'platform')
  platforms.create(450, 300, 'platform')
  platforms.create(700, 200, 'platform')
  platforms.create(1000, 400, 'platform')
  platforms.create(1200, 300 , 'platform')

//   //
//   .setScale(2, 1).refreshBody()
// .setScale(2, 1).refreshBody()

  tele = this.add.sprite(1600, 400, 'tele')
  this.physics.add.existing(tele, true) 


  player = this.physics.add.sprite(30, 400, 'player').setScale(2)
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  
  this.physics.add.collider(player, platforms)
  this.physics.add.overlap(player, tele, win)

  //Create Animations
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 4, end: 6 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'player', frame: 7 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 1, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  //Keyboard
  this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)
  this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)


  //Audio
  jump = this.sound.add('jump')
  fall = this.sound.add('fall')
  finish = this.sound.add('finish')


  //Debug
  console.log(player)
  console.log(this.physics.world)
  
}

//Function for teleport (reaching end)
function win(player, tele) {
  finish.play()
  player.body.reset(0, 400)
}

function update(){
 
  const speed = 300

  if(this.cursors.left.isDown && player.x > -500){
    player.setVelocityX(-speed)
    player.anims.play('left', true)
  }
  if(this.cursors.right.isDown && player.x < 2000){
    player.setVelocityX(speed)
    player.play('right', true)
  }
  
  if(this.cursors.up.isDown | this.keySpace.isDown && player.body.onFloor()){
    player.setVelocityY(-700)
    jump.play()
    
  }
  //Debug
  if (this.key.isDown) {
    console.log('Pressed Tab. Player position x is: ' + player.x)
    console.log('Pressed Tab. Player position y is: ' + player.y)
    // console.log(player.body.velocity.y)
    // console.log(this.cameras.main.getWorldPoint())

  }
  // if(this.keySpace.isDown){
  //   player.setX(1400)
  //   player.setY(200)
  // }

  if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.key.isDown) {
    player.setVelocityX(0)
    player.anims.play('turn')
  }
  if(player.y >= 550) {
    fall.play()
    player.setX(30)
    player.setY(300)
  }

  //Camera stuff
  this.cameras.main.startFollow(player)
  this.sky.tilePositionX = this.cameras.main.scrollX * 0.3
  this.grass.tilePositionX = this.cameras.main.scrollX * 0.5

  

}