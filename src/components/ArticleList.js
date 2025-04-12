import React from 'react';

function ArticleList({ articles, onArticleClick }) {
  return (
    <div className="article-list">
      {articles.map(article => (
        <div key={article.id} className="article-card" onClick={() => onArticleClick(article)}>
          <h3>{article.title}</h3>
          <p>{article.content.substring(0, 100)}...</p>
          <button>Mehr lesen</button>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;