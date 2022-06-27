const numberHelper = {
    isValidIntegerChar: function(charCode) {
        const restrictedCharCodes = [45, 69, 101, 187, 188, 189, 190];

        if (restrictedCharCodes.includes(charCode))
            return false;

        return true;
    },
    isValidDecimalChar: function(charCode) {
        const restrictedCharCodes = [45, 69, 101, 187, 189, 190];

        if (restrictedCharCodes.includes(charCode))
            return false;

        return true;
    }
};

export default numberHelper;