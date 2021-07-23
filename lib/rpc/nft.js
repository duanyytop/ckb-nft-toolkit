import { __assign, __asyncValues, __awaiter, __generator, __spreadArray } from "tslib";
import CKB from '@nervosnetwork/ckb-sdk-core';
import { secp256k1LockScript, secp256k1Dep, receiverSecp256k1Lock } from '../account';
import { getCells, collectInputs, getLiveCell } from '../collector';
import { FEE, NFTTypeScript, ClassTypeScript, ClassTypeDep, NFTTypeDep, IssuerTypeDep } from '../constants/script';
import { CKB_NODE_RPC, PRIVATE_KEY } from '../utils/config';
import { u32ToBe } from '../utils/hex';
import TokenClass from '../models/class';
import Nft from '../models/nft';
var ckb = new CKB(CKB_NODE_RPC);
var NFT_CELL_CAPACITY = BigInt(150) * BigInt(100000000);
var NORMAL_CELL_CAPACITY = BigInt(65) * BigInt(100000000);
export var generateNftOutputs = function (inputCapacity, classTypeScripts) { return __awaiter(void 0, void 0, void 0, function () {
    var lock, outputs, changeCapacity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, secp256k1LockScript()];
            case 1:
                lock = _a.sent();
                outputs = classTypeScripts.map(function (classTypeScript) { return ({
                    capacity: "0x" + NFT_CELL_CAPACITY.toString(16),
                    lock: lock,
                    type: classTypeScript,
                }); });
                changeCapacity = inputCapacity - FEE - NFT_CELL_CAPACITY * BigInt(classTypeScripts.length);
                outputs.push({
                    capacity: "0x" + changeCapacity.toString(16),
                    lock: lock,
                });
                return [2 /*return*/, outputs];
        }
    });
}); };
export var createNftCells = function (classTypeArgs, nftCount) {
    if (nftCount === void 0) { nftCount = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var lock, liveCells, _a, inputs, capacity, classType, classCells, classOutPoint, classInput, classCell, tokenClass, classOutput, nftTypeScripts, nfts, nft, i, outputClass, outputs, cellDeps, rawTx, signedTx, txHash;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, secp256k1LockScript()];
                case 1:
                    lock = _b.sent();
                    return [4 /*yield*/, getCells(lock)];
                case 2:
                    liveCells = _b.sent();
                    _a = collectInputs(liveCells, NFT_CELL_CAPACITY * BigInt(nftCount)), inputs = _a.inputs, capacity = _a.capacity;
                    classType = __assign(__assign({}, ClassTypeScript), { args: classTypeArgs });
                    return [4 /*yield*/, getCells(lock, classType)];
                case 3:
                    classCells = _b.sent();
                    classOutPoint = { txHash: classCells[0].outPoint.txHash, index: classCells[0].outPoint.index };
                    classInput = {
                        previousOutput: classOutPoint,
                        since: '0x0',
                    };
                    return [4 /*yield*/, getLiveCell(classOutPoint)];
                case 4:
                    classCell = _b.sent();
                    tokenClass = TokenClass.fromString(classCell.data.content);
                    if (tokenClass.total - tokenClass.issued < nftCount) {
                        throw new Error('The class cell issued count overflow');
                    }
                    classOutput = classCell.output;
                    nftTypeScripts = [];
                    nfts = [];
                    nft = new Nft(0, [0, 0, 0, 0, 0, 0, 0, 0], 200, 3, '').toString();
                    for (i = 0; i < nftCount; i++) {
                        nftTypeScripts.push(__assign(__assign({}, NFTTypeScript), { args: "" + classTypeArgs + u32ToBe(tokenClass.issued + i) }));
                        nfts.push(nft);
                    }
                    outputClass = TokenClass.fromString(classCell.data.content);
                    outputClass.updateIssued(tokenClass.issued + nftCount);
                    return [4 /*yield*/, generateNftOutputs(capacity, nftTypeScripts)];
                case 5:
                    outputs = _b.sent();
                    return [4 /*yield*/, secp256k1Dep()];
                case 6:
                    cellDeps = [_b.sent(), ClassTypeDep, NFTTypeDep];
                    rawTx = {
                        version: '0x0',
                        cellDeps: cellDeps,
                        headerDeps: [],
                        inputs: __spreadArray([classInput], inputs),
                        outputs: __spreadArray([classOutput], outputs),
                        outputsData: __spreadArray(__spreadArray([outputClass.toString()], nfts), ['0x']),
                        witnesses: [],
                    };
                    rawTx.witnesses = rawTx.inputs.map(function (_, i) { return (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }); });
                    signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx);
                    console.log(JSON.stringify(signedTx));
                    return [4 /*yield*/, ckb.rpc.sendTransaction(signedTx)];
                case 7:
                    txHash = _b.sent();
                    console.info("Creating nft cells tx has been sent with tx hash " + txHash);
                    return [2 /*return*/, txHash];
            }
        });
    });
};
export var transferNftCells = function (nftOutPoints) { var nftOutPoints_1, nftOutPoints_1_1; return __awaiter(void 0, void 0, void 0, function () {
    var inputs, outputs, outputsData, receiverLock, outPoint, nftCell, e_1_1, cellDeps, rawTx, signedTx, txHash;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                inputs = nftOutPoints.map(function (outPoint) { return ({
                    previousOutput: outPoint,
                    since: '0x0',
                }); });
                outputs = [];
                outputsData = [];
                return [4 /*yield*/, receiverSecp256k1Lock()];
            case 1:
                receiverLock = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, 9, 14]);
                nftOutPoints_1 = __asyncValues(nftOutPoints);
                _b.label = 3;
            case 3: return [4 /*yield*/, nftOutPoints_1.next()];
            case 4:
                if (!(nftOutPoints_1_1 = _b.sent(), !nftOutPoints_1_1.done)) return [3 /*break*/, 7];
                outPoint = nftOutPoints_1_1.value;
                return [4 /*yield*/, getLiveCell(outPoint)];
            case 5:
                nftCell = _b.sent();
                outputs.push(__assign(__assign({}, nftCell.output), { lock: receiverLock }));
                outputsData.push(nftCell.data.content);
                _b.label = 6;
            case 6: return [3 /*break*/, 3];
            case 7: return [3 /*break*/, 14];
            case 8:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 14];
            case 9:
                _b.trys.push([9, , 12, 13]);
                if (!(nftOutPoints_1_1 && !nftOutPoints_1_1.done && (_a = nftOutPoints_1.return))) return [3 /*break*/, 11];
                return [4 /*yield*/, _a.call(nftOutPoints_1)];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 13: return [7 /*endfinally*/];
            case 14:
                outputs[0].capacity = "0x" + (BigInt(outputs[0].capacity) - FEE).toString(16);
                return [4 /*yield*/, secp256k1Dep()];
            case 15:
                cellDeps = [_b.sent(), NFTTypeDep];
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
            case 16:
                txHash = _b.sent();
                console.info("Transfer nft cells tx has been sent with tx hash " + txHash);
                return [2 /*return*/, txHash];
        }
    });
}); };
export var destroyNftCell = function (nftOutPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, nftCell, output, outputs, outputsData, cellDeps, rawTx, signedTx, txHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputs = [
                    {
                        previousOutput: nftOutPoint,
                        since: '0x0',
                    },
                ];
                return [4 /*yield*/, getLiveCell(nftOutPoint)];
            case 1:
                nftCell = _a.sent();
                output = nftCell.output;
                output.capacity = "0x" + (BigInt(output.capacity) - FEE).toString(16);
                output.type = null;
                outputs = [output];
                outputsData = ['0x'];
                return [4 /*yield*/, secp256k1Dep()];
            case 2:
                cellDeps = [_a.sent(), NFTTypeDep];
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
                console.info("Destroy nft cell tx has been sent with tx hash " + txHash);
                return [2 /*return*/, txHash];
        }
    });
}); };
export var destroyNftCellWithIssuerLock = function (issuerOutPoint, nftOutPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var lock, liveCells, normalCells, inputs, issuerCellDep, outputs, issuerNormalCell, nftCell, outputsData, cellDeps, _a, rawTx, signedTx, txHash;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, secp256k1LockScript()];
            case 1:
                lock = _b.sent();
                return [4 /*yield*/, getCells(lock)];
            case 2:
                liveCells = _b.sent();
                normalCells = collectInputs(liveCells, NORMAL_CELL_CAPACITY).inputs;
                inputs = [
                    normalCells[0],
                    {
                        previousOutput: nftOutPoint,
                        since: '0x0',
                    },
                ];
                issuerCellDep = { outPoint: issuerOutPoint, depType: 'code' };
                outputs = [];
                return [4 /*yield*/, getLiveCell(normalCells[0].previousOutput)];
            case 3:
                issuerNormalCell = _b.sent();
                outputs.push(issuerNormalCell.output);
                outputs[0].capacity = "0x" + (BigInt(outputs[0].capacity) - FEE).toString(16);
                return [4 /*yield*/, getLiveCell(nftOutPoint)];
            case 4:
                nftCell = _b.sent();
                outputs.push(nftCell.output);
                outputs[1].type = null;
                outputsData = ['0x', '0x'];
                _a = [issuerCellDep];
                return [4 /*yield*/, secp256k1Dep()];
            case 5:
                cellDeps = _a.concat([_b.sent(), NFTTypeDep, IssuerTypeDep]);
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
            case 6:
                txHash = _b.sent();
                console.info("Destroy nft cell with issuer lock has been sent with tx hash " + txHash);
                return [2 /*return*/, txHash];
        }
    });
}); };
export var destroyNftCellWithClassLock = function (classOutPoint, nftOutPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var lock, liveCells, normalCells, inputs, classCellDep, outputs, classCell, nftCell, outputsData, cellDeps, _a, rawTx, signedTx, txHash;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, secp256k1LockScript()];
            case 1:
                lock = _b.sent();
                return [4 /*yield*/, getCells(lock)];
            case 2:
                liveCells = _b.sent();
                normalCells = collectInputs(liveCells, NORMAL_CELL_CAPACITY).inputs;
                inputs = [
                    normalCells[0],
                    {
                        previousOutput: nftOutPoint,
                        since: '0x0',
                    },
                ];
                classCellDep = { outPoint: classOutPoint, depType: 'code' };
                outputs = [];
                return [4 /*yield*/, getLiveCell(normalCells[0].previousOutput)];
            case 3:
                classCell = _b.sent();
                outputs.push(classCell.output);
                outputs[0].capacity = "0x" + (BigInt(outputs[0].capacity) - FEE).toString(16);
                return [4 /*yield*/, getLiveCell(nftOutPoint)];
            case 4:
                nftCell = _b.sent();
                outputs.push(nftCell.output);
                outputs[1].type = null;
                outputsData = ['0x', '0x'];
                _a = [classCellDep];
                return [4 /*yield*/, secp256k1Dep()];
            case 5:
                cellDeps = _a.concat([_b.sent(), NFTTypeDep, ClassTypeDep]);
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
            case 6:
                txHash = _b.sent();
                console.info("Destroy nft cell with class lock has been sent with tx hash " + txHash);
                return [2 /*return*/, txHash];
        }
    });
}); };
export var updateNftCell = function (nftOutPoint, action, props) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, outputs, outputsData, lock, liveCells, normalCells, issuerOrClassCell, nftCell, nft, cellDeps, _a, _b, rawTx, signedTx, txHash;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!action) {
                    throw new Error('Action is not defined ');
                }
                inputs = [];
                outputs = [];
                outputsData = [];
                if (!(action === UpdateActions.UPDATE_STATE_WITH_ISSUER || action === UpdateActions.UPDATE_STATE_WITH_CLASS)) return [3 /*break*/, 4];
                return [4 /*yield*/, secp256k1LockScript()];
            case 1:
                lock = _c.sent();
                return [4 /*yield*/, getCells(lock)];
            case 2:
                liveCells = _c.sent();
                normalCells = collectInputs(liveCells, NORMAL_CELL_CAPACITY).inputs;
                inputs.push(normalCells[0]);
                return [4 /*yield*/, getLiveCell(normalCells[0].previousOutput)];
            case 3:
                issuerOrClassCell = _c.sent();
                outputs.push(issuerOrClassCell.output);
                outputsData.push('0x');
                _c.label = 4;
            case 4:
                inputs.push({
                    previousOutput: nftOutPoint,
                    since: '0x0',
                });
                return [4 /*yield*/, getLiveCell(nftOutPoint)];
            case 5:
                nftCell = _c.sent();
                outputs.push(nftCell.output);
                outputs[0].capacity = "0x" + (BigInt(outputs[0].capacity) - FEE).toString(16);
                nft = Nft.fromString(nftCell.data.content);
                switch (action) {
                    case UpdateActions.LOCK:
                        nft.lock();
                        break;
                    case UpdateActions.CLAIM:
                        nft.claim();
                        break;
                    case UpdateActions.ADD_EXT_INFO:
                        nft.addExtInfo(props === null || props === void 0 ? void 0 : props.extInfo);
                        break;
                    case UpdateActions.UPDATE_CHARACTERISTIC:
                        nft.updateCharacteristic(props === null || props === void 0 ? void 0 : props.characteristic);
                        break;
                    case UpdateActions.UPDATE_STATE_WITH_ISSUER:
                    case UpdateActions.UPDATE_STATE_WITH_CLASS:
                        nft.updateState(props === null || props === void 0 ? void 0 : props.state);
                        break;
                    default:
                        break;
                }
                outputsData.push(nft.toString());
                cellDeps = [];
                if (action == UpdateActions.UPDATE_STATE_WITH_ISSUER) {
                    cellDeps.push({ outPoint: props === null || props === void 0 ? void 0 : props.issuerOutPoint, depType: 'code' });
                }
                else if (action == UpdateActions.UPDATE_STATE_WITH_CLASS) {
                    cellDeps.push({ outPoint: props === null || props === void 0 ? void 0 : props.classOutPoint, depType: 'code' });
                }
                _b = (_a = cellDeps).concat;
                return [4 /*yield*/, secp256k1Dep()];
            case 6:
                cellDeps = _b.apply(_a, [[_c.sent(), NFTTypeDep]]);
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
            case 7:
                txHash = _c.sent();
                console.info(action.toString() + " nft cell tx has been sent with tx hash " + txHash);
                return [2 /*return*/, txHash];
        }
    });
}); };
export var lockNftCell = function (nftOutPoint) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, updateNftCell(nftOutPoint, UpdateActions.LOCK)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
export var claimNftCell = function (nftOutPoint) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, updateNftCell(nftOutPoint, UpdateActions.CLAIM)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
export var addExtInfoToNftCell = function (nftOutPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var extInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                extInfo = '0x5678';
                return [4 /*yield*/, updateNftCell(nftOutPoint, UpdateActions.ADD_EXT_INFO, { extInfo: extInfo })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var updateNftCharacteristic = function (nftOutPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var characteristic;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                characteristic = [1, 2, 3, 4, 5, 6, 7, 8];
                return [4 /*yield*/, updateNftCell(nftOutPoint, UpdateActions.UPDATE_CHARACTERISTIC, { characteristic: characteristic })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var updateNftStateWithIssuer = function (nftOutPoint, issuerOutPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var state;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                state = 0;
                return [4 /*yield*/, updateNftCell(nftOutPoint, UpdateActions.UPDATE_STATE_WITH_ISSUER, { state: state, issuerOutPoint: issuerOutPoint })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var updateNftStateWithClass = function (nftOutPoint, classOutPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var state;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                state = 0;
                return [4 /*yield*/, updateNftCell(nftOutPoint, UpdateActions.UPDATE_STATE_WITH_CLASS, { state: state, classOutPoint: classOutPoint })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//# sourceMappingURL=nft.js.map