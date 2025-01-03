import "./index.scss";

import { GetHomeArticleList } from "@/services";
import { useEffect } from "react";

const ArticleList = () => {
  const init = async () => {
    if (localStorage.token) {
      const articleList = await GetHomeArticleList();
      console.log("lfsz", articleList);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <div className='article-list'>11</div>;
};
export default ArticleList;
