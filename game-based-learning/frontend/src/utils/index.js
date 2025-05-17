export const handleMakeUnique = (arr, setArr) => {
  const temp = [];
  arr.forEach((element) => {
    if (!temp.includes(element.id)) {
      temp.push(element.id);
    }
  });

  let result = filterUniqueObjects(temp, arr);
  setArr(result);
};

function filterUniqueObjects(obj1, obj2) {
  let idSet = new Set(obj1);
  let uniqueObjectsMap = new Map();
  obj2.forEach((item) => {
    if (idSet.has(item.id) && !uniqueObjectsMap.has(item.id)) {
      uniqueObjectsMap.set(item.id, item);
    }
  });
  return Array.from(uniqueObjectsMap.values());
}
