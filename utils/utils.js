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

const formatDateandKeys = (arr, articleRef) => {
  const formatData = arr.map(obj => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
      if (key === "belongs_to") {
        newObj["article_id"] = articleRef[obj[key]];
      } else {
        newObj[key] = obj[key];
      }
      if (key === "created_at") {
        newObj["created_at"] = new Date(obj.created_at).toDateString();
      }
    });
    return newObj;
  });
  return formatData;
};

module.exports = { formatDate, renameKeys, createRef, formatDateandKeys };
