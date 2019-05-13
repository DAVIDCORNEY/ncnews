const formatDate = article => {
  return article.map(section => {
    section.created_at = new Date(section.created_at).toDateString();
    return section;
  });
};

const renameKeys = (arr, keyToChange, newKey) => {
  return (changeKey = arr.map(element => {
    const newObj = {};
    Object.keys(element).forEach(function(key) {
      return key === keyToChange
        ? (newObj[newKey] = element[key])
        : (newObj[key] = element[key]);
    });
    return newObj;
  }));
};

module.exports = { formatDate, renameKeys };
