#!/usr/bin/env node

const Kahoot = require("./index");
const select = require("@inquirer/select");
const input = require("@inquirer/input")

console.log("Welcome to Kahoot Toolkit by WillTDA!");

select({
    message: 'What would you like to do?',
    choices: [
        {
            name: 'Flood a Game',
            description: 'Flood a Game of Kahoot with Bots!',
            value: 'flood',
        },
        {
            name: 'Autonomously Win a Game',
            description: 'Create a Bot that will Play Kahoot and Attempt to Win!',
            value: 'win',
        },
    ],
}).then(async mode => {
    if (mode === 'flood') {
        let pin = await input({ message: 'Kahoot Flooding Setup | Step 1 of 3 - Enter Kahoot Game PIN:' });
        let amount = await input({ message: 'Kahoot Flooding Setup | Step 2 of 3 - Enter Number of Bots to Join:' });
        let floodMode = await select({
            message: 'Kahoot Flooding Setup | Step 3 of 3 - Select Flood Mode:',
            choices: [
                {
                    name: 'Pick Random Names (Recommended)',
                    description: 'Give all bots random names so that Kahoot Anti-Cheat can\'t kick them. This is highly recommended if you want them to stick around!',
                    value: 'random',
                },
                {
                    name: 'Choose a Name (Not Recommended)',
                    description: 'Pick a name to give to all bots. This is not recommended as Kahoot Anti-Cheat can kick bots joining with the same name.',
                    value: 'choose',
                },
            ],
        });

        let name = '';
        if (floodMode === 'random') name = Math.random().toString(36).substring(7);
        else if (floodMode === 'choose') name = await input({ message: 'Kahoot Flooding Setup | Enter Bot Name:' });

        const kahoot = new Kahoot(pin, name);
        console.log("Starting Kahoot Flooding... (The bots should start joining within a few seconds!)")
        await kahoot.flood(amount, floodMode === 'random').catch(err => {
            setTimeout(() => {
                console.log("Notice: Stopped Flooding Process as bots were being kicked while joining.")
            }, 5000);
        });
        console.log("Kahoot Flooding Complete!")
    } else if (mode === 'win') {
        let quizResolvable = await input({ message: 'Kahoot Autoplay Setup | Step 1 of 4 - Enter Kahoot Quiz Name or ID:' });
        let pin = await input({ message: 'Kahoot Autoplay Setup | Step 2 of 4 - Enter Kahoot Game PIN:' });
        let name = await input({ message: 'Kahoot Autoplay Setup | Step 3 of 4 - Enter Bot Name:' });
        let debug = await select({
            message: 'Kahoot Autoplay Setup | Step 4 of 4 - Enable Debug Mode?',
            choices: [
                {
                    name: 'Yes',
                    description: 'Show everything the bot is doing while playing.',
                    value: 'yes',
                },
                {
                    name: 'No',
                    description: 'Don\'t show anything the bot is doing while playing.',
                    value: 'no',
                },
            ],
        });

        const kahoot = new Kahoot(pin, name);
        console.log("Starting Kahoot Autoplay Bot... (Sit back and watch your bot climb to the top!)")
        await kahoot.autoplay(quizResolvable, debug === 'yes');
    }
});