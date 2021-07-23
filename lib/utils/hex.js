import { hexToBytes, bytesToHex } from '@nervosnetwork/ckb-sdk-utils';
export var remove0x = function (hex) {
    if (hex.startsWith('0x')) {
        return hex.substring(2);
    }
    return hex;
};
var ArrayBufferToHex = function (arrayBuffer) {
    return Array.prototype.map.call(new Uint8Array(arrayBuffer), function (x) { return ('00' + x.toString(16)).slice(-2); }).join('');
};
export var u16ToBe = function (u16) {
    var buffer = new ArrayBuffer(2);
    var view = new DataView(buffer);
    view.setUint16(0, u16, false);
    return ArrayBufferToHex(buffer);
};
var u32ToHex = function (u32, littleEndian) {
    var buffer = new ArrayBuffer(4);
    var view = new DataView(buffer);
    view.setUint32(0, Number(u32), littleEndian);
    return ArrayBufferToHex(buffer);
};
export var u32ToBe = function (u32) {
    return u32ToHex(u32, false);
};
export var u32ToLe = function (u32) {
    return u32ToHex(u32, true);
};
export var u8ToHex = function (u8) {
    var buffer = new ArrayBuffer(1);
    var view = new DataView(buffer);
    view.setUint8(0, u8);
    return ArrayBufferToHex(buffer);
};
export var u64ToLe = function (u64) {
    if (typeof u64 !== 'bigint') {
        throw new Error('u64 must be bigint');
    }
    var val = u64.toString(16).padStart(16, '0');
    var viewRight = u32ToLe("0x" + val.slice(0, 8));
    var viewLeft = u32ToLe("0x" + val.slice(8));
    return "" + viewLeft + viewRight;
};
export var encode = function (hex) {
    if (!hex) {
        return '0000';
    }
    return "" + u16ToBe(remove0x(hex).length / 2) + remove0x(hex);
};
export var decode = function (hex) {
    if (hex === '' || hex === '0000') {
        return '';
    }
    var size = parseInt(hex.slice(0, 4)) * 2;
    if (size !== hex.length - 4) {
        throw new Error('Dynamic data format invalid');
    }
    return hex.slice(4);
};
export var utf8ToHex = function (text) {
    var result = text.trim();
    if (result.startsWith('0x')) {
        return result;
    }
    result = bytesToHex(new TextEncoder().encode(result));
    return result;
};
export var hexToUtf8 = function (hex) {
    var result = hex.trim();
    try {
        result = new TextDecoder().decode(hexToBytes(result));
    }
    catch (error) {
        console.error('hexToUtf8 error:', error);
    }
    return result;
};
//# sourceMappingURL=hex.js.map