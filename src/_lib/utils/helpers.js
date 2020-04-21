const getLocalStorageValue = key => {
  const val = localStorage.getItem(key);
  if (!val) return null;
  try {
    return JSON.parse(val);
  } catch (e) {
    return null;
  }
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const clearLocalStorage = () => {
  localStorage.clear();
};

const arrayToObject = (arrayData, keyField) => {
  if (!arrayData) return {};

  return arrayData.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});
};

const nestedArrayToObject = (arrayData, nestedKeyField, keyField = 'id') => {
  if (!arrayData) return {};

  return arrayData.reduce((obj, item) => {
    obj[item.id] = {
      ...item,
      [nestedKeyField]: arrayToObject(item[nestedKeyField], keyField),
    };
    return obj;
  }, {});
};

const getMax = arrayData =>
  arrayData.reduce((max, objectItem) => {
    const newMax = Number(objectItem.position);
    return max > newMax ? max : newMax;
  }, 0);

const sortPosition = (itemA, itemB) =>
  (itemA.position || itemA.id) - (itemB.position || itemB.id);

const objectToArray = objectData => {
  if (!objectData) return [];

  return Object.values(objectData).sort(sortPosition);
};

const reorderArrary = async (arrayData, oldIndex, newIndex) => {
  const [removed] = arrayData.splice(oldIndex, 1);
  arrayData.splice(newIndex, 0, removed);
  return arrayData;
};

const generateID = () =>
  `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

export {
  getLocalStorageValue,
  setLocalStorage,
  clearLocalStorage,
  arrayToObject,
  sortPosition,
  objectToArray,
  reorderArrary,
  nestedArrayToObject,
  getMax,
  generateID,
};
