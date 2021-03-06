
  var player, walk, platforms, tele, jump, fall, finish, platformArray

  class start extends Phaser.Scene{
      constructor() {
          super("startGame")
      }
  
  
   preload(){
    this.cameras.main.setBounds(0, 0, 2200, 500);
    // this.cameras.main.setZoom(1.2)
  
    this.physics.world.setBounds(0, -200, 2200, 900);
  
    this.load.image('sky', 'assets/prettySky.png')
    this.load.image('grass', 'assets/purpleGrass.png')
    this.load.image('tree', 'assets/tTree.png')
    this.load.image('platform', 'assets/metalBox.png')
    this.load.image('tele', 'assets/tele.png')
    this.load.spritesheet('player', 'assets/mydood.png',{ frameWidth: 96, frameHeight: 96})
  
    //Audio
    this.load.audio('jump', './audio/jump_03.wav')
    this.load.audio('fall', './audio/death.wav')
    this.load.audio('finish', './audio/round_end.wav')
  
    //Arrow keys
    this.cursors = this.input.keyboard.createCursorKeys()
  
  }
  
   create(){
    
  
    // this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky').setOrigin(0,0).setScrollFactor(0)
    // this.sky = this.add.image(0,-50, 'sky').setOrigin(0,0)
    this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky').setOrigin(0, 0).setScrollFactor(0)
    
    
    //Tilesprite and scroll factor allows repeating scrolling background
    this.tree = this.add.tileSprite(0, 30, game.config.width, game.config.height, 'tree').setOrigin(0, 0).setScrollFactor(0)

    // this.grass = this.add.tileSprite(0, 30, game.config.width, 200, 'grass').setOrigin(0, 0).setScrollFactor(0)

    
    this.add.image(0,600,'grass')
    this.add.image(600,600,'grass')
    this.add.image(1200,600,'grass')
    
    //Add scrolling ground but give it physics
    //Add ground to physics system, default value is false which means dynamic value, setting true makes it static and does not react to forces therefore setting gravity is no longer needed, keeping for reference
    // this.physics.add.existing(ground, true)
    //Remove gravity so it stays in place
    // ground.body.setAllowGravity(false)
  
  
    // platforms = this.physics.add.staticGroup();
    // //Starting platform
    // platforms.create(40, 500, 'platform')
    // //Other in order
    // platforms.create(220, 400, 'platform')
    // platforms.create(450, 300, 'platform')
    // platforms.create(650, 200, 'platform')
    // platforms.create(1000, 400, 'platform')
    // // platforms.create(1200, 300 , 'platform')
    
    // var movingPlatform = this.physics.add.sprite(1200, 300, 'platform')
    // movingPlatform.body.allowGravity = false;
    // movingPlatform.body.immovable = true;
    // movingPlatform.body.moves = false;

    // // platforms.children.entries[1]

    

    platforms = this.physics.add.group();
    //Starting platform
    platforms.create(40, 500, 'platform')
    //Other in order
    platforms.create(220, 400, 'platform')
    platforms.create(450, 300, 'platform')
    platforms.create(650, 200, 'platform')
    platforms.create(1000, 400, 'platform')
    platforms.create(1200, 300 , 'platform')

    var platformArray = platforms.getChildren()

    for (let i = 0; i < platformArray.length; i++){
      platformArray[i].body.allowGravity = false
      platformArray[i].body.immovable = true
    }

    // platformArray[1].body.setVelocityX(10)
    
    var timeline1 = this.tweens.timeline({

      targets: platformArray[2],
      loop: -1,

      tweens: [
      {
          x: 500,
          ease: 'Linear',
          duration: 1000,
          yoyo: true,
         
      },
      ]
      
    })

    var timeline2 = this.tweens.timeline({

      targets: platformArray[5],
      loop: -1,

      tweens: [
      {
          x: 1000,
          ease: 'Linear',
          duration: 1000,
          yoyo: true,
         
      },
      ]
      
    })

    
  
    tele = this.add.sprite(1550, 400, 'tele')
    this.physics.add.existing(tele, true) 
  
    player = this.physics.add.sprite(30, 400, 'player')
    player.setBounce(0.2)
    player.setCollideWorldBounds(true)

    //Function for teleport (reaching end)
    function win(player, tele) {
        finish.play()
        player.body.reset(0, 400)
    }
    
    this.physics.add.collider(player, platforms)
    this.physics.add.overlap(player, tele, win)
    // this.physics.add.collider(player, movingPlatform)
  
    //Create Animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 6 }),
      frameRate: 5,
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
    this.cursors = this.input.keyboard.addKeys(
      {up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D});
  
  
    //Audio
    jump = this.sound.add('jump')
    fall = this.sound.add('fall')
    finish = this.sound.add('finish')
  
  
    //Debug
    console.log(player)
    console.log(this.physics.world)
    console.log(platforms)
    
  }
  
 
  
   update(){
   
    const speed = 300


    // if(player.body.touching.down = true){
    //   player.setVelocityX(platformArray[1].body.velocity.x)
    // }
  
    //Move left
    if(this.cursors.left.isDown && player.x > -500){
      player.setVelocityX(-speed)
      player.anims.play('left', true)
    }
    //Move Right
    if(this.cursors.right.isDown && player.x < 2000){
      player.setVelocityX(speed)
      player.play('right', true)
    }
    //Move up
    if(this.cursors.up.isDown | this.keySpace.isDown && (player.body.touching.down == true)){
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
    this.tree.tilePositionX = this.cameras.main.scrollX * 0.5
  
    
  
  }
}