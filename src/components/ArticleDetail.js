import React from 'react';

function ArticleDetail({ article, onBack }) {
  return (
    <div className="article-detail">
      <button onClick={onBack}>Zurück zur Übersicht</button>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
}

export default ArticleDetail;