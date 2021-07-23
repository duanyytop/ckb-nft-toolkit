import { u8ToHex, u32ToBe, encode, remove0x } from '../utils/hex';
var Issuer = /** @class */ (function () {
    function Issuer(version, classCount, setCount, info) {
        if (version === void 0) { version = 0; }
        if (setCount === void 0) { setCount = 0; }
        if (info === void 0) { info = ''; }
        this.version = 0;
        this.classCount = 0;
        this.setCount = 0;
        this.info = '';
        this.version = version;
        this.classCount = classCount;
        this.setCount = setCount;
        this.info = info;
    }
    Issuer.prototype.toString = function () {
        return "0x" + u8ToHex(this.version) + u32ToBe(this.classCount) + u32ToBe(this.setCount) + encode(this.info);
    };
    Issuer.prototype.updateClassCount = function (count) {
        this.classCount = count;
    };
    Issuer.prototype.updateInfo = function (info) {
        this.info = info;
    };
    Issuer.fromString = function (data) {
        var temp = remove0x(data);
        if (temp.length < 18) {
            throw new Error('Issuer data invalid');
        }
        var version = parseInt(temp.slice(0, 2), 16);
        var classCount = parseInt(temp.slice(2, 10), 16);
        var setCount = parseInt(temp.slice(10, 18), 16);
        var info = temp.slice(18);
        return new Issuer(version, classCount, setCount, info);
    };
    return Issuer;
}());
export default Issuer;
//# sourceMappingURL=issuer.js.map