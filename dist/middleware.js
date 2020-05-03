"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArguments = (context, next) => {
    const { message, state } = context;
    const input = message.content.slice("mon!".length).trim();
    state.args = input.split(/ +/).slice(1);
    return next();
};
