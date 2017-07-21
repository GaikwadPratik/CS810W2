"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LogException(err) {
    console.log(`An error with name: '${err.name}', message: ${err.message} and stackstrace: ${err.stack}`);
}
exports.LogException = LogException;
function LogError(errorMessage) {
    console.log(errorMessage);
}
exports.LogError = LogError;
function LogWarning(errorMessage) {
    console.log(errorMessage);
}
exports.LogWarning = LogWarning;
function LogInfo(errorMessage) {
    console.log(errorMessage);
}
exports.LogInfo = LogInfo;
function LogDebug(errorMessage) {
    console.log(errorMessage);
}
exports.LogDebug = LogDebug;
//# sourceMappingURL=ApplicationLog.js.map