import { hexToBytes } from '@nervosnetwork/ckb-sdk-utils';
import { u8ToHex, encode, remove0x, decode } from '../utils/hex';
var Nft = /** @class */ (function () {
    function Nft(version, characteristic, configure, state, extinfoData) {
        if (version === void 0) { version = 0; }
        if (extinfoData === void 0) { extinfoData = ''; }
        this.version = 0;
        this.characteristic = [0, 0, 0, 0, 0, 0, 0, 0];
        this.configure = 0;
        this.state = 0;
        this.extinfoData = '';
        this.extension = '';
        this.version = version;
        this.characteristic = characteristic;
        this.configure = configure;
        this.state = state;
        this.extinfoData = extinfoData;
    }
    Nft.prototype.toString = function () {
        var chars = this.characteristic.map(function (char) { return u8ToHex(char); }).join('');
        var result = "0x" + u8ToHex(this.version) + chars + u8ToHex(this.configure) + u8ToHex(this.state);
        result = this.extinfoData ? "" + result + encode(this.extinfoData) : result;
        result = this.extension ? "" + result + encode(this.extension) : result;
        return result;
    };
    Nft.prototype.lock = function () {
        if ((this.configure & 2) === 0) {
            this.state = this.state | 2;
        }
        else {
            throw new Error('The NFT cell cannot be locked.');
        }
    };
    Nft.prototype.allowClaim = function () {
        return (this.configure & 1) === 0;
    };
    Nft.prototype.claim = function () {
        if ((this.configure & 1) === 0) {
            this.state = this.state | 1;
        }
        else {
            throw new Error('The NFT cell cannot be claimed.');
        }
    };
    Nft.prototype.addExtInfo = function (extInfo) {
        if ((this.configure & 4) === 0) {
            this.extension = this.extension + encode(extInfo);
        }
        else {
            throw new Error('The NFT cell cannot be added extension info data.');
        }
    };
    Nft.prototype.updateCharacteristic = function (chars) {
        if ((this.configure & 8) === 0) {
            this.characteristic = chars;
        }
        else {
            throw new Error('The NFT characteristic cannot be updated.');
        }
    };
    Nft.prototype.updateState = function (state) {
        this.state = state;
    };
    Nft.fromString = function (data) {
        var temp = remove0x(data);
        if (temp.length < 22) {
            throw new Error('Nft data invalid');
        }
        var version = parseInt(temp.slice(0, 2), 16);
        var characteristic = Array.from(hexToBytes("0x" + temp.slice(2, 18)));
        var configure = parseInt(temp.slice(18, 20), 16);
        var state = parseInt(temp.slice(20, 22), 16);
        var extinfoData = decode(temp.slice(22));
        return new Nft(version, characteristic, configure, state, extinfoData);
    };
    return Nft;
}());
export default Nft;
//# sourceMappingURL=nft.js.map