// patches the JSON.parse() function to fix an issue with "kahoot.js-updated-fixed"

let lastValue = [];

const parsedHandler = {
  get(target, key, receiver) {
    const result = Reflect.get(target, key, receiver);
    if (key === 'defaultQuizData') {
      if (!result || typeof result.quizQuestionAnswers !== 'object') {
        return { quizQuestionAnswers: lastValue };
      }
      lastValue = result.quizQuestionAnswers;
    }

    return result;
  },
};

JSON.parse = new Proxy(JSON.parse, {
  apply(target, thisArg, args) {
    const parsed = Reflect.apply(target, thisArg, args);
    return new Proxy(parsed, parsedHandler);
  },
});

module.exports = JSON.parse;