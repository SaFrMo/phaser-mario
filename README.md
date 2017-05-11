## What
This is part of the Phaser Component Library.

A "mario" is a player-controlled character than can move on the X axis and jump on the Y axis. It is affected by gravity, has a given amount of health, and usesWASD/arrow keys and space bar to move.

## How
`npm install phaser-mario`

Then, in your Phaser source code

```js
import Mario from 'phaser-mario'

// in your game creation method:
this.game.physics.startSystem( Phaser.Physics.ARCADE )
this.game.physics.arcade.gravity.y = 500

// add a controllable (arrow keys/space bar) Mario-like player character
const mario = this.game.add.existing(new Mario({
    game: this.game,
    key: 'your-sprite-key',
    controls: true
}))
```

## API

### `new Mario( { options } )`

#### options

##### collideWorldBounds

Type: `boolean`
Default: `false`

Whether or not the mario collides with the world bounds.

##### controls

Type: `boolean`
Default: `false`

Whether or not the mario can be controlled by the player.

##### deadzone

Type: `object: { left, width }`
Default: `{}`

The camera's [deadzone](https://youtu.be/89TRXUm8jMI?t=9s).

If `left` is exactly 1 or lower, a percentage of the screen width will be used; ditto for `width`. Otherwise, the defined pixel amount will be used.

##### follow

Type: `boolean`
Default: `false`

Whether or not the camera follows the mario.

##### frame

Type: `string | number`
Default: `''`

See [Sprite docs](https://phaser.io/docs/2.6.2/Phaser.Sprite.html).

##### game

Required<br>
Type: `Phaser.Game`

The game where this mario will live.

##### health

Type: `number`
Default: `1`

This mario's starting health.

##### height

Type: `number`
Default: `64`

This mario's height.

##### jump

Type: `number`
Default: `-250`

The jump force of the mario. Note that to jump up, this value must be negative.

##### jumps

Type: `number`
Default: `1`

The number of times the mario can jump. Set to 2 for double-jump, for example.

##### key

Recommended
Type: `string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture`
Default: `''`

See [Sprite docs](https://phaser.io/docs/2.6.2/Phaser.Sprite.html).

##### speed

Type: `number`
Default: `350`

The x-axis speed of the mario.

##### width

Type: `number`
Default: `64`

This mario's width.

##### x

Type: `number`
Default: `0`

The x-value of the mario's spawn location.

##### y

Type: `number`
Default: `0`

The y-value of the mario's spawn location.

### Properties

##### state

Type: `Phaser.State`

Shortcut to the current state object. Useful for accessing global properties from that state.
