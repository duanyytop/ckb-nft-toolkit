import { u8ToHex, u32ToBe, encode, remove0x } from '../utils/hex';
var TokenClass = /** @class */ (function () {
    function TokenClass(version, total, issued, configure, name, description, renderer, extinfoData) {
        if (version === void 0) { version = 0; }
        if (extinfoData === void 0) { extinfoData = ''; }
        this.version = 0;
        this.total = 0;
        this.issued = 0;
        this.configure = 0;
        this.name = '';
        this.description = '';
        this.renderer = '';
        this.extinfoData = '';
        this.version = version;
        this.total = total;
        this.issued = issued;
        this.configure = configure;
        this.name = name;
        this.description = description;
        this.renderer = renderer;
        this.extinfoData = extinfoData;
    }
    TokenClass.prototype.toString = function () {
        var dynamic = "" + encode(this.name) + encode(this.description) + encode(this.renderer) + encode(this.extinfoData);
        return "0x" + u8ToHex(this.version) + u32ToBe(this.total) + u32ToBe(this.issued) + u8ToHex(this.configure) + dynamic;
    };
    TokenClass.prototype.updateIssued = function (issued) {
        this.issued = issued;
    };
    TokenClass.prototype.updateName = function (name) {
        this.name = name;
    };
    TokenClass.fromString = function (data) {
        var temp = remove0x(data);
        if (temp.length < 24) {
            throw new Error('Class data invalid');
        }
        var version = parseInt(temp.slice(0, 2), 16);
        var total = parseInt(temp.slice(2, 10), 16);
        var issued = parseInt(temp.slice(10, 18), 16);
        var configure = parseInt(temp.slice(18, 20), 16);
        var nameLen = parseInt(temp.slice(20, 24), 16) * 2;
        var name = temp.slice(24, nameLen + 24);
        if (temp.length < 28 + nameLen) {
            throw new Error('Class data invalid');
        }
        var descriptionLen = parseInt(temp.slice(nameLen + 24, nameLen + 28), 16) * 2;
        var description = temp.slice(nameLen + 28, descriptionLen + nameLen + 28);
        if (temp.length < descriptionLen + nameLen + 32) {
            throw new Error('Class data invalid');
        }
        var rendererLen = parseInt(temp.slice(descriptionLen + nameLen + 28, descriptionLen + nameLen + 32), 16) * 2;
        var renderer = temp.slice(descriptionLen + nameLen + 32, descriptionLen + nameLen + rendererLen + 32);
        return new TokenClass(version, total, issued, configure, name, description, renderer);
    };
    return TokenClass;
}());
export default TokenClass;
//# sourceMappingURL=class.js.map