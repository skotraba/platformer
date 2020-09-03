var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 2000 },
          debug: true
      }
  },
  scene: 
      [menu, start]

      // preload: preload,
      // create: create,
      // update: update
  
};


var game = new Phaser.Game(config);