<h1 align="center">
    🎮 Kahoot Toolkit 🎮
</h1>

[![NPM](https://nodei.co/npm/kahoot-toolkit.png)](https://npmjs.com/package/kahoot-toolkit)

[![Downloads](https://img.shields.io/npm/dt/kahoot-toolkit?logo=npm&style=flat-square)](https://npmjs.com/package/kahoot-toolkit) [![Discord Server](https://img.shields.io/discord/667479986214666272?logo=discord&logoColor=white&style=flat-square)](https://discord.gg/P2g24jp)

Kahoot Toolkit is the easiest way to interact with Kahoot games.

## Features

- 🌊 <b>Flood Games</b> | Spam join a Kahoot game with a customisable amount of bots.

- 🕹️ <b>Win Games with Autoplay</b> | Configure a bot to play a game for you and attempt to win it with a single function. This is the first time something like this has been published to NPM!

- 🖥️ <b>Command Line Interface</b> | Don't want to use code? No problem! Kahoot Toolkit has a CLI built in to do everything for you.

## Installation

There are two ways to install and use Kahoot Toolkit, either as a dependency in your project, or the CLI. Here are the commands to install them in both ways:

### <u>**Install as a Dependency**</u>
    
`npm i kahoot-toolkit --save`

### <u>**Install CLI**</u>

`npm i -g kahoot-toolkit`

## Example Code

Setting up Kahoot Toolkit is really easy. Simply import the package and create an instance of the Kahoot class!

```js
const Kahoot = require("kahoot-toolkit");
const client = new Kahoot("Game PIN Here", "Bot Name Here"); // If the bot name is not specified, it will be randomly generated.
```

To flood a game, you can use the `flood` method.

```js
client.flood(1000); // Floods the game with 1,000 bots.

// To avoid Kahoot's Anti-Cheat, you can set a second parameter to true.

client.flood(1000, true); // Floods the game with 1,000 bots, but uses randomly generated names for each bot.
```

To win a game autonomously, use the `autoplay` method.

```js
client.autoplay("Quiz Name or ID Here");

// To log any progress the bot makes, you can set a second parameter to true.

client.autoplay("Quiz Name or ID Here", true);
```

## CLI Usage

To open the CLI, simply type `kahoot-toolkit`, `kahoot-cli` or `kahoot` into your Terminal. You should be met with this prompt:

![Root Menu](https://github.com/WillTDA/Kahoot-Toolkit/blob/master/images/rootMenu.jpg?raw=true)

Simply choose which action you would like to perform to continue. Then, just follow the instructions and prompts!

### <u>**Flooding a Game**</u>

![Flood Example](https://github.com/WillTDA/Kahoot-Toolkit/blob/master/images/floodExample.jpg?raw=true)

### <u>**Winning a Game**</u>

![Autoplay Setup](https://github.com/WillTDA/Kahoot-Toolkit/blob/master/images/autoplaySetup.jpg?raw=true)

![Autoplay Playing](https://github.com/WillTDA/Kahoot-Toolkit/blob/master/images/autoplayPlaying.jpg?raw=true)

## Contact Me

- 👋 Need Help? [Join Our Discord Server](https://discord.gg/P2g24jp)!

- 👾 Found a Bug? [Open an Issue](https://github.com/WillTDA/Kahoot-Toolkit/issues), or Fork and [Submit a Pull Request](https://github.com/WillTDA/Kahoot-Toolkit/pulls) on our [GitHub Repository](https://github.com/WillTDA/Kahoot-Toolkit)!