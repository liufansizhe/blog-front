import "./index.scss";

import { useEffect, useRef, useState } from "react";

import ArticleItem from "@/components/ArticleItem";
import { ArticleListType } from "./type";
import { GetHomeArticleList } from "@/services";
import { Pagination } from "antd";

export interface PageType {
  pageSize: number;
  pageIndex: number;
}
const ArticleList = () => {
  const { current } = useRef<PageType>({ pageIndex: 1, pageSize: 10 });
  const [articleList, setArticleList] = useState<ArticleListType[]>([]);
  const [totalArticle, setTotalArticle] = useState<number>(0);
  const init = async () => {
    const {
      data: { list, total },
    } = await GetHomeArticleList({
      pageSize: current.pageSize,
      pageIndex: current.pageIndex,
    });
    setArticleList(list ?? []);
    setTotalArticle(total ?? 0);
  };
  const renderList = () => {
    if (articleList.length > 0) {
      return articleList.map((item, index) => (
        <ArticleItem key={index} info={item} />
      ));
    } else {
      return 22;
    }
  };
  const changeHandle = (index: number, size: number) => {
    current.pageIndex = index;
    current.pageSize = size;
    init();
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className='article-list'>
      <div className='article-body'>
        {renderList()}
        <Pagination
          onChange={changeHandle}
          defaultCurrent={current.pageIndex}
          total={totalArticle}
        />
      </div>
    </div>
  );
};
export default ArticleList;
