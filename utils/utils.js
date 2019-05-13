const formatDate = article => {
  return article.map(section => {
    section.created_at = new Date(section.created_at).toDateString();
    return section;
  });
};

module.exports = { formatDate };
