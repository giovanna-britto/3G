export class GameScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;
    plataformas = [];

    pontuacao = 0;

    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.image("paisagem", "../assets/paisagem.png");
        this.load.image("plataforma", "../assets/plataforma.png");
        this.load.spritesheet("grace_sprite", "../assets/spritesheetGrace.png", { frameWidth: 64, frameHeight: 64 })
        this.load.image("bug", "../assets/bug.png");
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

        // adicionando placar 
        this.placar = this.add.text(50, 50, 'Pontuacao:' + this.pontuacao, {fontSize:'45px', fill:'#495613'});

        // add o bug / mariposa
        this.bug = this.physics.add.sprite(this.larguraJogo/3, 0, 'bug');
        this.bug.setCollideWorldBounds(true); // "borda no mundo"
        this.bug.setScale(0.3);
        this.physics.add.collider(this.bug, this.plataformas[0]); // faz com que o bug n consiga se sobrepor a plataforma
        this.physics.add.collider(this.bug, this.plataformas[1]);

        // quando o player encostar no bug
        this.physics.add.overlap(this.player, this.bug, () => { 

            this.bug.setVisible(false); //o bug fica invisível

            //número sorteado entre 50 e 650
            var posicaoBug_Y = Phaser.Math.RND.between(50, 650);
            //ajusta a posição do bug de acordo com o número sorteado
            this.bug.setPosition(posicaoBug_Y, 100); 

            this.pontuacao += 1; //soma pontuação
            this.placar.setText('Pontuacao: ' + this.pontuacao); //atualiza o placar

            this.bug.setVisible(true); // torna o bug visível

        });

    
        // Animações da personagem
        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('grace_sprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('grace_sprite', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'parada',
            frames: [{ key: 'grace_sprite', frame: 4 }],
            frameRate: 20
        });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            if (this.player.anims.currentAnim?.key !== 'esquerda') {
                this.player.anims.play('esquerda', true);
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            if (this.player.anims.currentAnim?.key !== 'direita') {
                this.player.anims.play('direita', true);
            }
        } else {
            this.player.setVelocityX(0);
            if (this.player.anims.currentAnim?.key !== 'parada') {
                this.player.anims.play('parada', true);
            }
        }

        // Lógica de pulo (vertical) 
        if (this.cursors.up.isDown) { // && (this.player.body.touching.down || this.player.body.blocked.down)
            this.player.setVelocityY(-400);
        }

        if (this.cursors.down.isDown) {
            this.player.setVelocityY(400); // Acelera a descida 
        }

        // logica ganhar
        if (this.pontuacao >= 5){
            this.scene.stop('MainScene');
            this.scene.start('EndScene', "ganhou");
        }
    }
}
