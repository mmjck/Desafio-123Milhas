const Methods = {
    getData (value) {
        if (!value) {
            return "-"
        }

        const date = new Date(value);
        const d = date.getDay();
        const m = date.getMonth();
        const y = date.getFullYear();



        return `${d}/${m}/${y}`
    },

}

export default Methods;
