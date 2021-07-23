import { __awaiter, __generator } from "tslib";
import CKB from '@nervosnetwork/ckb-sdk-core';
import { CKB_NODE_RPC, PRIVATE_KEY, RECEIVER_PRIVATE_KEY } from '../utils/config';
var ckb = new CKB(CKB_NODE_RPC);
export var secp256k1LockScript = function () { return __awaiter(void 0, void 0, void 0, function () {
    var secp256k1Dep;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ckb.loadDeps()];
            case 1:
                secp256k1Dep = (_a.sent()).secp256k1Dep;
                return [2 /*return*/, {
                        codeHash: secp256k1Dep.codeHash,
                        hashType: secp256k1Dep.hashType,
                        args: generateLockArgs(PRIVATE_KEY),
                    }];
        }
    });
}); };
export var generateLockArgs = function (privateKey) {
    var pubKey = ckb.utils.privateKeyToPublicKey(privateKey);
    return '0x' + ckb.utils.blake160(pubKey, 'hex');
};
export var secp256k1Dep = function () { return __awaiter(void 0, void 0, void 0, function () {
    var secp256k1Dep;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ckb.loadDeps()];
            case 1:
                secp256k1Dep = (_a.sent()).secp256k1Dep;
                return [2 /*return*/, { outPoint: secp256k1Dep.outPoint, depType: 'depGroup' }];
        }
    });
}); };
export var receiverSecp256k1Lock = function () { return __awaiter(void 0, void 0, void 0, function () {
    var secp256k1Dep;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ckb.loadDeps()];
            case 1:
                secp256k1Dep = (_a.sent()).secp256k1Dep;
                return [2 /*return*/, {
                        codeHash: secp256k1Dep.codeHash,
                        hashType: secp256k1Dep.hashType,
                        args: generateLockArgs(RECEIVER_PRIVATE_KEY),
                    }];
        }
    });
}); };
//# sourceMappingURL=index.js.map