export class GameScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;
    plataformas = [];

    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.image("paisagem", "../assets/paisagem.png");
        this.load.image("plataforma", "../assets/plataforma.png");
        this.load.spritesheet("grace_sprite", "../assets/spritesheetGrace.png", { frameWidth: 64, frameHeight: 64 })
    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "paisagem").setScale(0.6);

        this.player = this.physics.add.sprite(this.larguraJogo/2, 100, 'grace_sprite').setScale(1.3);
        // this.player.body.setSize(151, 195, true);
        this.player.setCollideWorldBounds(true);

        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma');
        this.plataformas[0].body.setSize(148, 44, true);
        this.plataformas[0].setScale(0.3);

        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma');
        this.plataformas[1].body.setSize(148, 44, true);
        this.plataformas[1].setScale(0.3);

        for (let i = 0; i < this.plataformas.length; i++){
            this.physics.add.collider(this.player, this.plataformas[i]);
        }
        
        // Adiciona as setas do teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // quarta parte
        this.botaoJogar = this.add.image(this.larguraJogo/2, 290, "play").setScale(0.2).setInteractive();
        var resultado = "ganhou";
        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("EndScene", {resultado: resultado});
        })
        // quarta parte

        // Animações da personagem
        this.anims.create ({
            key: 'direita',
            frame: this.anims.generateFrameNumbers('grace_sprite', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })

        this.player.anims.play('direita');

        this.anims.create ({
            key: 'esquerda',
            frame: this.anims.generateFrameNumbers('grace_sprite', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        })
        this.player.anims.play('esquerda');

        this.anims.create({
            key: 'parada',
            frames: [ { key: 'grace_sprite', frame: 4 } ],
            frameRate: 20
        });
        this.player.anims.play('parada');
    }

    update() { // Adiciona a movimentação 
        if (this.cursors.left.isDown) { // Movimentação horizontal
            this.player.setVelocityX(-160);
            if (this.player.anims.currentAnim?.key !== 'esquerda') {
                this.player.anims.play ('esquerda', true); }

        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            if (this.player.anims.currentAnim?.key !== 'direita') {
                this.player.anims.play ('direita', true); }

        } else {
            this.player.setVelocityX(0);
            if (this.player.anims.currentAnim?.key !== 'parada') {
                this.player.anims.play ('parada', true); }
        }

        // Lógica de pulo (vertical) 
        if (this.cursors.up.isDown) { // && (this.player.body.touching.down || this.player.body.blocked.down)
            this.player.setVelocityY(-400);
        }

        if (this.cursors.down.isDown) {
            this.player.setVelocityY(400); // Acelera a descida 
        }
    }
}
