import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
import CKB from '@nervosnetwork/ckb-sdk-core';
import { scriptToHash } from '@nervosnetwork/ckb-sdk-utils';
import { secp256k1LockScript, secp256k1Dep } from '../account';
import { getCells, collectInputs, getLiveCell } from '../collector';
import { FEE, IssuerTypeScript, ClassTypeScript, IssuerTypeDep, ClassTypeDep } from '../constants/script';
import { CKB_NODE_RPC, PRIVATE_KEY } from '../utils/config';
import { u32ToBe, utf8ToHex, remove0x } from '../utils/hex';
import Issuer from '../models/issuer';
import TokenClass from '../models/class';
var ckb = new CKB(CKB_NODE_RPC);
var CLASS_CELL_CAPACITY = BigInt(240) * BigInt(100000000);
export var generateClassOutputs = function (inputCapacity, classTypeScripts) { return __awaiter(void 0, void 0, void 0, function () {
    var lock, outputs, changeCapacity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, secp256k1LockScript()];
            case 1:
                lock = _a.sent();
                outputs = classTypeScripts.map(function (classTypeScript) { return ({
                    capacity: "0x" + CLASS_CELL_CAPACITY.toString(16),
                    lock: lock,
                    type: classTypeScript,
                }); });
                changeCapacity = inputCapacity - FEE - CLASS_CELL_CAPACITY * BigInt(classTypeScripts.length);
                outputs.push({
                    capacity: "0x" + changeCapacity.toString(16),
                    lock: lock,
                });
                return [2 /*return*/, outputs];
        }
    });
}); };
export var createClassCells = function (issuerTypeArgs, classCount) {
    if (classCount === void 0) { classCount = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var lock, liveCells, _a, inputs, capacity, issuerType, issuerCells, issuerOutPoint, issuerInput, issuerCell, issuer, issuerOutput, classTypeScripts, tokenClasses, tokenClass, issuerId, i, outputIssuer, outputs, cellDeps, rawTx, signedTx, txHash;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, secp256k1LockScript()];
                case 1:
                    lock = _b.sent();
                    return [4 /*yield*/, getCells(lock)];
                case 2:
                    liveCells = _b.sent();
                    _a = collectInputs(liveCells, CLASS_CELL_CAPACITY * BigInt(classCount)), inputs = _a.inputs, capacity = _a.capacity;
                    issuerType = __assign(__assign({}, IssuerTypeScript), { args: issuerTypeArgs });
                    return [4 /*yield*/, getCells(lock, issuerType)];
                case 3:
                    issuerCells = _b.sent();
                    issuerOutPoint = { txHash: issuerCells[0].outPoint.txHash, index: issuerCells[0].outPoint.index };
                    issuerInput = {
                        previousOutput: issuerOutPoint,
                        since: '0x0',
                    };
                    return [4 /*yield*/, getLiveCell(issuerOutPoint)];
                case 4:
                    issuerCell = _b.sent();
                    issuer = Issuer.fromString(issuerCell.data.content);
                    issuerOutput = issuerCell.output;
                    classTypeScripts = [];
                    tokenClasses = [];
                    tokenClass = new TokenClass(0, 1000, 0, 200, utf8ToHex('First NFT'), utf8ToHex('Description'), utf8ToHex('https://goldenlegend.oss-cn-hangzhou.aliyuncs.com/production/1620983974245.jpeg')).toString();
                    issuerId = remove0x(scriptToHash(issuerType)).slice(0, 40);
                    for (i = 0; i < classCount; i++) {
                        classTypeScripts.push(__assign(__assign({}, ClassTypeScript), { args: "0x" + issuerId + u32ToBe(issuer.classCount + i) }));
                        tokenClasses.push(tokenClass);
                    }
                    outputIssuer = Issuer.fromString(issuerCell.data.content);
                    outputIssuer.updateClassCount(issuer.classCount + classCount);
                    return [4 /*yield*/, generateClassOutputs(capacity, classTypeScripts)];
                case 5:
                    outputs = _b.sent();
                    return [4 /*yield*/, secp256k1Dep()];
                case 6:
                    cellDeps = [_b.sent(), IssuerTypeDep, ClassTypeDep];
                    rawTx = {
                        version: '0x0',
                        cellDeps: cellDeps,
                        headerDeps: [],
                        inputs: __spreadArray([issuerInput], inputs),
                        outputs: __spreadArray([issuerOutput], outputs),
                        outputsData: __spreadArray(__spreadArray([outputIssuer.toString()], tokenClasses), ['0x']),
                        witnesses: [],
                    };
                    rawTx.witnesses = rawTx.inputs.map(function (_, i) { return (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }); });
                    signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx);
                    console.log(JSON.stringify(signedTx));
                    return [4 /*yield*/, ckb.rpc.sendTransaction(signedTx)];
                case 7:
                    txHash = _b.sent();
                    console.info("Creating class cells tx has been sent with tx hash " + txHash);
                    return [2 /*return*/, txHash];
            }
        });
    });
};
export var destroyClassCell = function (classOutPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, classCell, output, outputs, outputsData, cellDeps, rawTx, signedTx, txHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputs = [
                    {
                        previousOutput: classOutPoint,
                        since: '0x0',
                    },
                ];
                return [4 /*yield*/, getLiveCell(classOutPoint)];
            case 1:
                classCell = _a.sent();
                output = classCell.output;
                output.capacity = "0x" + (BigInt(output.capacity) - FEE).toString(16);
                output.type = null;
                outputs = [output];
                outputsData = ['0x'];
                return [4 /*yield*/, secp256k1Dep()];
            case 2:
                cellDeps = [_a.sent(), ClassTypeDep];
                rawTx = {
                    version: '0x0',
                    cellDeps: cellDeps,
                    headerDeps: [],
                    inputs: inputs,
                    outputs: outputs,
                    outputsData: outputsData,
                    witnesses: [],
                };
                rawTx.witnesses = rawTx.inputs.map(function (_, i) { return (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }); });
                signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx);
                console.log(JSON.stringify(signedTx));
                return [4 /*yield*/, ckb.rpc.sendTransaction(signedTx)];
            case 3:
                txHash = _a.sent();
                console.info("Destroy class cell tx has been sent with tx hash " + txHash);
                return [2 /*return*/, txHash];
        }
    });
}); };
export var updateClassCell = function (classOutPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, classCell, outputs, tokenClass, outputsData, cellDeps, rawTx, signedTx, txHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputs = [
                    {
                        previousOutput: classOutPoint,
                        since: '0x0',
                    },
                ];
                return [4 /*yield*/, getLiveCell(classOutPoint)];
            case 1:
                classCell = _a.sent();
                outputs = [classCell.output];
                outputs[0].capacity = "0x" + (BigInt(outputs[0].capacity) - FEE).toString(16);
                tokenClass = TokenClass.fromString(classCell.data.content);
                tokenClass.updateName(utf8ToHex('Second NFT'));
                outputsData = [tokenClass.toString()];
                return [4 /*yield*/, secp256k1Dep()];
            case 2:
                cellDeps = [_a.sent(), ClassTypeDep];
                rawTx = {
                    version: '0x0',
                    cellDeps: cellDeps,
                    headerDeps: [],
                    inputs: inputs,
                    outputs: outputs,
                    outputsData: outputsData,
                    witnesses: [],
                };
                rawTx.witnesses = rawTx.inputs.map(function (_, i) { return (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }); });
                signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx);
                console.log(JSON.stringify(signedTx));
                return [4 /*yield*/, ckb.rpc.sendTransaction(signedTx)];
            case 3:
                txHash = _a.sent();
                console.info("Update class cell tx has been sent with tx hash " + txHash);
                return [2 /*return*/, txHash];
        }
    });
}); };
//# sourceMappingURL=class.js.map