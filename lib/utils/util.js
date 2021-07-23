import camelcaseKeys from 'camelcase-keys';
export var toCamelcase = function (object) {
    try {
        return JSON.parse(JSON.stringify(camelcaseKeys(object, {
            deep: true,
        })));
    }
    catch (error) {
        console.error(error);
    }
    return null;
};
//# sourceMappingURL=util.js.map