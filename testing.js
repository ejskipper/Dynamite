const array = ['D','f','g','D'];

const istrue = !!array.reduce(function(a, b){ return (a === b) ? a : NaN; });

// const istrue = arr.reduce(function(a, b){ return (a === b) ? a : NaN; });

console.log(istrue);