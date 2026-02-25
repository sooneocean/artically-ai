function uniq(arr){return [...new Set(arr.filter(Boolean))];}
function toList(arr){return arr.map(x=>`- ${x}`).join('\n');}
module.exports = { uniq, toList };
