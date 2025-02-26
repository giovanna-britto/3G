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
        this.load.image("personagem_frente", "../assets/personagem_frente.png")
    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "paisagem").setScale(0.6);

        this.player = this.physics.add.sprite(this.larguraJogo/2, 100, 'personagem_frente').setScale(0.4);
        this.player.body.setSize(151, 195, true);
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

        // quarta parte
        this.botaoJogar = this.add.image(this.larguraJogo/2, 290, "play").setScale(0.2).setInteractive();

        var resultado = "ganhou";

        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("EndScene", {resultado: resultado});
        })

        // quarta parte
    }

    update() {

    }
}