const api = require("kahoot.js-updated-fixed");
const got = require("got");
const search = require("./util/search");
const getRandomName = require("./util/randomString");

class Kahoot {

    /**
     * Create a new Kahoot API Client.
     * @param {string} pin The Kahoot Game PIN.
     * @param {string} [name=undefined] The nickname to assign to the Kahoot Client. A random name will be assigned if one is not provided.
     */

    constructor(pin, name) {
        if (!pin) return console.log("Kahoot Toolkit Error: No Game PIN was Provided.\nNeed Help? Join our Discord Server at 'https://discord.gg/P2g24jp'");
        if (!name) name = getRandomName(15);
        this.pin = pin;
        this.name = name;
    }

    /**
     * Flood/Spam Join the Kahoot Game.
     * @param {number} amount The number of bots to join the game.
     * @param {boolean} [persistent=false] When enabled, the bots will use a random naming scheme so Kahoot Anti-Cheat will have a harder time detecting them.
     * (Defaults to `false`)
     * @returns {Promise<void>}
     */

    async flood(amount, persistent) {
        if (!amount) return console.log("Kahoot Toolkit Error: No Amount of Bots was Provided.\nNeed Help? Join our Discord Server at 'https://discord.gg/P2g24jp'");
        if (amount < 1) return console.log("Kahoot Toolkit Error: At least 1 Bot is Required.\nNeed Help? Join our Discord Server at 'https://discord.gg/P2g24jp'");
        for (let i = 0; i < amount; i++) {
            if (persistent) await api.join(this.pin, getRandomName(15));
            else await api.join(this.pin, this.name);
        }
    }

    /**
     * Flood/Spam Join the Kahoot Game.
     * @param {number} amount The number of bots to join the game.
     * @param {boolean} [persistent=false] When enabled, the bots will use a random naming scheme so Kahoot Anti-Cheat will have a harder time detecting them.
     * (Defaults to `false`)
     * @returns {Promise<void>}
     */

    async spam(amount, persistent) {
        this.flood(amount, persistent);
    }

    /**
     * Join the Kahoot Game and Attempt to Win Autonomously.
     * 
     * **Note:** This method only works on multiple choice and true/false questions.
     * @param {string} quizResolvable The ID or Name of the Quiz to Join.
     * @param {boolean} [debug=false] When enabled, the bot will log it's game progress. (Defaults to `false`)
     * @returns {Promise<void>}
     */

    async autoplay(quizResolvable, debug) {
        if (!quizResolvable) return console.log("Kahoot Toolkit Error: No Quiz ID or Name was Provided.\nNeed Help? Join our Discord Server at 'https://discord.gg/P2g24jp'");
        let quizData = await new search(quizResolvable).search();
        if (quizData.totalHits === 0) {
            try {
                await got(`https://create.kahoot.it/rest/kahoots/${quizResolvable}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
            } catch (e) { } //lazy but it heckin works
        }
        if (quizData[0]?.uuid) quizResolvable = quizData[0].uuid;
        if (debug) console.log("[Kahoot Client]: Joining Game...");
        const client = new api();

        client.on("Joined", () => {
            if (debug) console.log(`[Kahoot Client]: Successfully Joined Game as '${this.name}'!`)
        });

        client.on("QuizStart", () => {
            if (debug) console.log("[Kahoot Client]: Quiz Started!")
        });

        client.on("QuizEnd", (data) => {
            if (debug) console.log(`[Kahoot Client]: Quiz Ended! Finished with Rank ${data.rank} and ${data.totalScore} Points.`)
        });

        client.on("QuestionStart", async question => {
            let questionRequest = await got(`https://create.kahoot.it/rest/kahoots/${quizResolvable}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            let questionData = JSON.parse(questionRequest.body).questions;
            questionData = questionData[question.gameBlockIndex];
            let answers = questionData.choices.filter(choice => choice.correct === true);
            let answerNames = answers.map(answer => answer.answer);
            answers = answers.map(answer => questionData.choices.indexOf(answer)); 
            if (debug) console.log(`[Kahoot Client]: Answering Question ${question.gameBlockIndex + 1} with ${answers.length === 1 ? `'${questionData.choices[0].answer}'` : `'${answerNames.join("' and '")}'` }...`);
            question.answer(answers);
        });

        client.on("QuestionEnd", question => {
            if (debug) console.log(`[Kahoot Client]: Question Ended! ${question.isCorrect ? `(Correct, +${question.points} Points)` : `(Incorrect)`} Currently Rank ${question.rank}`);
        })
        await client.join(this.pin, this.name).catch(err => console.log("Kahoot Toolkit Error: Failed to Join Game!\nNeed Help? Join our Discord Server at 'https://discord.gg/P2g24jp'"));
    }
}

module.exports = Kahoot;