function getNewArray(key,order,array) {
  var newArray;
    if (order === "asc") {
      newArray = sortAsc(key, array);
     console.log(newArray);
    } else {
       newArray = sortDec(key, array);
    }
  return newArray;
}

function sortAsc(key, array) {
   array.sort(function(a, b) {
    return (a[key] - b[key]);
  });
  // console.log(array);
  // console.log(key);
  return array;
}

function sortDec(key, array) {
return array.sort(function(a, b) {
    return (b[key] - a[key]);
  });
}

module.exports = getNewArray;
