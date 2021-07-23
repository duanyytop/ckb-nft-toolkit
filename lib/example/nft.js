import { __awaiter, __generator } from "tslib";
import { updateNftStateWithClass, } from '../rpc/nft';
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // await createNftCells('0x218b04dbc79d944fffc9e44bd8ce4acbc0c61cde00000005', 2)
            // const nftOutPoints = [
            //   {
            //     txHash: '0xf02357aa4d24338373da393f01a0f08982a835d9c4d210d765b87cf90d544fcd',
            //     index: '0x1',
            //   },
            //   {
            //     txHash: '0xf02357aa4d24338373da393f01a0f08982a835d9c4d210d765b87cf90d544fcd',
            //     index: '0x2',
            //   },
            //   {
            //     txHash: '0xf02357aa4d24338373da393f01a0f08982a835d9c4d210d765b87cf90d544fcd',
            //     index: '0x3',
            //   },
            // ]
            // await transferNftCells(nftOutPoints)
            // await destroyNftCell({ txHash: '0xa31620254cadd7a331e1213058dde19bd4fa892d288b5516fb4b55f7d2ba1e68', index: '0x0' })
            // await lockNftCell({ txHash: '0xbac38d5138debec6ddb1def5160da8fff16617f157ede41f13e52cd4d0745ee6', index: '0x1' })
            // await claimNftCell({ txHash: '0x0bd97d71c9c70f40386b792fdcb0bdbdb507243d0242cd3506212018c143be4f', index: '0x2' })
            // await addExtInfoToNftCell({
            //   txHash: '0x2f31a3bbd7688a37dbaa637bdcb9a7d89db4492821c885dd5e4ff8fd56e0d7bc',
            //   index: '0x1',
            // })
            // await updateNftCharacteristic({
            //   txHash: '0x974778d1f624c26d3f0d9af31bfff04acbab3c0054046f37e32c7118c88d3e17',
            //   index: '0x1',
            // })
            // await updateNftStateWithIssuer(
            //   {
            //     txHash: '0x4abdb93c63425379760cc1e9893df3728eb7bcb001a6add996a91c37ea25537c',
            //     index: '0x1',
            //   },
            //   {
            //     txHash: '0xbea940dd1b9a0ec23eab61ccf0fc28bcbdcca581b121d50f691d9bf1518c0020',
            //     index: '0x0',
            //   },
            // )
            return [4 /*yield*/, updateNftStateWithClass({
                    txHash: '0x4abdb93c63425379760cc1e9893df3728eb7bcb001a6add996a91c37ea25537c',
                    index: '0x2',
                }, {
                    txHash: '0x4abdb93c63425379760cc1e9893df3728eb7bcb001a6add996a91c37ea25537c',
                    index: '0x0',
                })
                // await destroyNftCellWithIssuerLock(
                //   { txHash: '0x1079ea9f1099c0ac38cf40d66393a7fcacd647c0903d9dbd32b92e29d8eaec1e', index: '0x0' },
                //   {
                //     txHash: '0x616ef5d3eb547cd599c5f28434c2defbf530a6b2bdac44f184e851c5277b760d',
                //     index: '0x1',
                //   },
                // )
                // await destroyNftCellWithClassLock(
                //   { txHash: '0x616ef5d3eb547cd599c5f28434c2defbf530a6b2bdac44f184e851c5277b760d', index: '0x0' },
                //   {
                //     txHash: '0x616ef5d3eb547cd599c5f28434c2defbf530a6b2bdac44f184e851c5277b760d',
                //     index: '0x2',
                //   },
                // )
            ];
            case 1:
                // await createNftCells('0x218b04dbc79d944fffc9e44bd8ce4acbc0c61cde00000005', 2)
                // const nftOutPoints = [
                //   {
                //     txHash: '0xf02357aa4d24338373da393f01a0f08982a835d9c4d210d765b87cf90d544fcd',
                //     index: '0x1',
                //   },
                //   {
                //     txHash: '0xf02357aa4d24338373da393f01a0f08982a835d9c4d210d765b87cf90d544fcd',
                //     index: '0x2',
                //   },
                //   {
                //     txHash: '0xf02357aa4d24338373da393f01a0f08982a835d9c4d210d765b87cf90d544fcd',
                //     index: '0x3',
                //   },
                // ]
                // await transferNftCells(nftOutPoints)
                // await destroyNftCell({ txHash: '0xa31620254cadd7a331e1213058dde19bd4fa892d288b5516fb4b55f7d2ba1e68', index: '0x0' })
                // await lockNftCell({ txHash: '0xbac38d5138debec6ddb1def5160da8fff16617f157ede41f13e52cd4d0745ee6', index: '0x1' })
                // await claimNftCell({ txHash: '0x0bd97d71c9c70f40386b792fdcb0bdbdb507243d0242cd3506212018c143be4f', index: '0x2' })
                // await addExtInfoToNftCell({
                //   txHash: '0x2f31a3bbd7688a37dbaa637bdcb9a7d89db4492821c885dd5e4ff8fd56e0d7bc',
                //   index: '0x1',
                // })
                // await updateNftCharacteristic({
                //   txHash: '0x974778d1f624c26d3f0d9af31bfff04acbab3c0054046f37e32c7118c88d3e17',
                //   index: '0x1',
                // })
                // await updateNftStateWithIssuer(
                //   {
                //     txHash: '0x4abdb93c63425379760cc1e9893df3728eb7bcb001a6add996a91c37ea25537c',
                //     index: '0x1',
                //   },
                //   {
                //     txHash: '0xbea940dd1b9a0ec23eab61ccf0fc28bcbdcca581b121d50f691d9bf1518c0020',
                //     index: '0x0',
                //   },
                // )
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
run();
//# sourceMappingURL=nft.js.map