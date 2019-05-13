const formatDate = article => {
  return article.map(section => {
    section.created_at = new Date(section.created_at).toDateString();
    return section;
  });
};

const renameKeys = (arr, keyToChange, newKey) => {
  return (changeKey = arr.map(element => {
    const newObj = {};
    Object.keys(element).forEach(key => {
      return key === keyToChange
        ? (newObj[newKey] = element[key])
        : (newObj[key] = element[key]);
    });
    return newObj;
  }));
};

const createRef = (arr, param1, param2) => {
  const newObj = {};
  arr.forEach(item => {
    return (newObj[item[param1]] = item[param2]);
  });
  return newObj;
};

module.exports = { formatDate, renameKeys, createRef };
