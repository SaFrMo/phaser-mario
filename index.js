import Phaser from 'phaser'

export default class extends Phaser.Sprite{
    constructor( opts ){
        super( opts.game, opts.x || 0, opts.y || 0, opts.key || '', opts.frame || '' )

        // Save options
        this.opts = opts

        // Enable player physics
        this.game.physics.enable( this, Phaser.Physics.ARCADE )

        // Player specifics
        this.body.collideWorldBounds = opts.hasOwnProperty('collideWorldBounds') ? opts.collideWorldBounds : true
        this.body.setSize( opts.width || 64, opts.height || 64 )
        this.health = opts.health || 1

        // Shortcut to current state object
        this.state = this.game.state.states[this.game.state.current]

        // Set up camera
        if( opts.hasOwnProperty('follow') && opts.follow === true ){
            this.game.camera.follow( this )

            if( opts.hasOwnProperty('deadzone') ){
                const left = opts.deadzone.left <= 1 ? this.game.width * opts.deadzone.left : opts.deadzone.left
                const width = opts.deadzone.width <= 1 ? this.game.width * opts.deadzone.width : opts.deadzone.width
                this.game.camera.deadzone = new Phaser.Rectangle( left, 0, width, this.game.height )
            }
        }

        // Set up speed and force values
        this.xSpeed = opts.speed || 350
        this.jumpForce = opts.jump || -250
        this.totalJumps = opts.hasOwnProperty('jumps') ? opts.jumps : 1
        this.currentJump = 0

        // Set up controls
        if( opts.hasOwnProperty('controls') && opts.controls ){

            this.cursors = this.game.input.keyboard.createCursorKeys()
            this.jumpButton = this.game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR )

            // Jump
            this.jumpButton.onDown.add( function(){ this.jump() }, this )

        }

        // Set up where the sprite is facing
        this.facing = 1

    }

    jump(){
        if( this.currentJump < this.totalJumps ){
            this.body.velocity.y = this.jumpForce
            this.currentJump++
        }
    }

    die(){
        this.kill()
    }

    update(){
        // basic living/dying checks
        if( !this.alive ) return
        if( this.health <= 0 ){
            this.die()
        }

        // reset jump count
        if( this.body.onFloor() ){
            this.currentJump = 0
        }

        if( this.opts.hasOwnProperty('controls') && this.opts.controls ){
            // horizontal movement
            if( this.cursors.left.isDown ){
                this.body.velocity.x = -this.xSpeed
                this.direction = -1
                this.facing = -1
            } else if ( this.cursors.right.isDown ){
                this.body.velocity.x = this.xSpeed
                this.direction = 1
                this.facing = 1
            } else {
                this.body.velocity.x = 0
            }
        }
    }
}
