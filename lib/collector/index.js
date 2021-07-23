import { __awaiter, __generator } from "tslib";
import fetch from 'node-fetch';
import CKB from '@nervosnetwork/ckb-sdk-core';
import { CKB_NODE_RPC, CKB_NODE_INDEXER } from '../utils/config';
import { FEE } from '../constants/script';
import { toCamelcase } from '../utils/util';
var ckb = new CKB(CKB_NODE_RPC);
export var getCells = function (lock, type) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, payload, body, res, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filter = type
                    ? {
                        script: {
                            code_hash: type.codeHash,
                            hash_type: type.hashType,
                            args: type.args,
                        },
                    }
                    : {
                        output_data_len_range: ['0x0', '0x1'],
                    };
                payload = {
                    id: 1,
                    jsonrpc: '2.0',
                    method: 'get_cells',
                    params: [
                        {
                            script: {
                                code_hash: lock.codeHash,
                                hash_type: lock.hashType,
                                args: lock.args,
                            },
                            script_type: 'lock',
                            filter: filter,
                        },
                        'asc',
                        '0x64',
                    ],
                };
                body = JSON.stringify(payload, null, '  ');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(CKB_NODE_INDEXER, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: body,
                    })];
            case 2:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 3:
                res = _a.sent();
                return [2 /*return*/, toCamelcase(res.result.objects)];
            case 4:
                error_1 = _a.sent();
                console.error('error', error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var collectInputs = function (liveCells, needCapacity) {
    var inputs = [];
    var sum = BigInt(0);
    for (var _i = 0, liveCells_1 = liveCells; _i < liveCells_1.length; _i++) {
        var cell = liveCells_1[_i];
        inputs.push({
            previousOutput: {
                txHash: cell.outPoint.txHash,
                index: cell.outPoint.index,
            },
            since: '0x0',
        });
        sum = sum + BigInt(cell.output.capacity);
        if (sum >= needCapacity + FEE) {
            break;
        }
    }
    if (sum < needCapacity + FEE) {
        throw Error('Capacity not enough');
    }
    return { inputs: inputs, capacity: sum };
};
export var getLiveCell = function (outPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var cell;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ckb.rpc.getLiveCell(outPoint, true)];
            case 1:
                cell = (_a.sent()).cell;
                return [2 /*return*/, cell];
        }
    });
}); };
//# sourceMappingURL=index.js.map