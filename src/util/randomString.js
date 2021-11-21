module.exports = function randomString(length) {
    let string = "";
    const chars = "abcdefghijklmnopqrstuvwxyz".split("");
    for (let i = 0; i < length; i++) string += `${chars[Math.floor(Math.random() * chars.length)]}`;
    return string;
}