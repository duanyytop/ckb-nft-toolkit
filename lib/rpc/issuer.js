import { __assign, __awaiter, __generator } from "tslib";
import CKB from '@nervosnetwork/ckb-sdk-core';
import { serializeInput, blake2b, hexToBytes } from '@nervosnetwork/ckb-sdk-utils';
import { secp256k1LockScript, secp256k1Dep } from '../account';
import { getCells, collectInputs, getLiveCell } from '../collector';
import { FEE, IssuerTypeScript, IssuerTypeDep } from '../constants/script';
import { CKB_NODE_RPC, PRIVATE_KEY } from '../utils/config';
import { u64ToLe } from '../utils/hex';
import Issuer from '../models/issuer';
var ckb = new CKB(CKB_NODE_RPC);
var ISSUER_CELL_CAPACITY = BigInt(150) * BigInt(100000000);
var PERSONAL = new Uint8Array([99, 107, 98, 45, 100, 101, 102, 97, 117, 108, 116, 45, 104, 97, 115, 104]);
var generateIssuerTypeArgs = function (firstInput, firstOutputIndex) {
    var input = hexToBytes(serializeInput(firstInput));
    var s = blake2b(32, null, null, PERSONAL);
    s.update(input);
    s.update(hexToBytes("0x" + u64ToLe(firstOutputIndex)));
    return "0x" + s.digest('hex').slice(0, 40);
};
var generateIssuerOutputs = function (inputCapacity, issuerType) { return __awaiter(void 0, void 0, void 0, function () {
    var lock, outputs, changeCapacity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, secp256k1LockScript()];
            case 1:
                lock = _a.sent();
                outputs = [
                    {
                        capacity: "0x" + ISSUER_CELL_CAPACITY.toString(16),
                        lock: lock,
                        type: issuerType,
                    },
                ];
                changeCapacity = inputCapacity - FEE - ISSUER_CELL_CAPACITY;
                outputs.push({
                    capacity: "0x" + changeCapacity.toString(16),
                    lock: lock,
                });
                return [2 /*return*/, outputs];
        }
    });
}); };
export var createIssuerCell = function () { return __awaiter(void 0, void 0, void 0, function () {
    var lock, liveCells, _a, inputs, capacity, issuerTypeArgs, outputs, cellDeps, issuer, rawTx, signedTx, txHash;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, secp256k1LockScript()];
            case 1:
                lock = _b.sent();
                return [4 /*yield*/, getCells(lock)];
            case 2:
                liveCells = _b.sent();
                _a = collectInputs(liveCells, ISSUER_CELL_CAPACITY), inputs = _a.inputs, capacity = _a.capacity;
                issuerTypeArgs = generateIssuerTypeArgs(inputs[0], BigInt(0));
                return [4 /*yield*/, generateIssuerOutputs(capacity, __assign(__assign({}, IssuerTypeScript), { args: issuerTypeArgs }))];
            case 3:
                outputs = _b.sent();
                return [4 /*yield*/, secp256k1Dep()];
            case 4:
                cellDeps = [_b.sent(), IssuerTypeDep];
                issuer = new Issuer(0, 0, 0, '');
                rawTx = {
                    version: '0x0',
                    cellDeps: cellDeps,
                    headerDeps: [],
                    inputs: inputs,
                    outputs: outputs,
                    outputsData: [issuer.toString(), '0x'],
                    witnesses: [],
                };
                rawTx.witnesses = rawTx.inputs.map(function (_, i) { return (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }); });
                signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx);
                console.info(JSON.stringify(signedTx));
                return [4 /*yield*/, ckb.rpc.sendTransaction(signedTx)];
            case 5:
                txHash = _b.sent();
                console.info("Creating issuer cell tx has been sent with tx hash " + txHash);
                return [2 /*return*/, txHash];
        }
    });
}); };
export var destroyIssuerCell = function (issuerOutPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, issuerCell, output, outputs, outputsData, cellDeps, rawTx, signedTx, txHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputs = [
                    {
                        previousOutput: issuerOutPoint,
                        since: '0x0',
                    },
                ];
                return [4 /*yield*/, getLiveCell(issuerOutPoint)];
            case 1:
                issuerCell = _a.sent();
                output = issuerCell.output;
                output.capacity = "0x" + (BigInt(output.capacity) - FEE).toString(16);
                output.type = null;
                outputs = [output];
                outputsData = ['0x'];
                return [4 /*yield*/, secp256k1Dep()];
            case 2:
                cellDeps = [_a.sent(), IssuerTypeDep];
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
                console.info("Destroy issuer cell tx has been sent with tx hash " + txHash);
                return [2 /*return*/, txHash];
        }
    });
}); };
export var updateIssuerCell = function (issuerOutPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, issuerCell, outputs, issuer, outputsData, cellDeps, rawTx, signedTx, txHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputs = [
                    {
                        previousOutput: issuerOutPoint,
                        since: '0x0',
                    },
                ];
                return [4 /*yield*/, getLiveCell(issuerOutPoint)];
            case 1:
                issuerCell = _a.sent();
                outputs = [issuerCell.output];
                outputs[0].capacity = "0x" + (BigInt(outputs[0].capacity) - FEE).toString(16);
                issuer = Issuer.fromString(issuerCell.data.content);
                issuer.updateInfo('0x1234');
                outputsData = [issuer.toString()];
                return [4 /*yield*/, secp256k1Dep()];
            case 2:
                cellDeps = [_a.sent(), IssuerTypeDep];
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
                console.info("Update issuer cell tx has been sent with tx hash " + txHash);
                return [2 /*return*/, txHash];
        }
    });
}); };
//# sourceMappingURL=issuer.js.map