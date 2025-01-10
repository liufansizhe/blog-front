import "./index.scss";

import { useCallback, useEffect, useRef, useState } from "react";

import ArticleItem from "@/components/ArticleItem";
import { ArticleListType } from "./type";
import { GetHomeArticleList } from "@/services";
import Pagination from "@/components/Pagination";
import emptyGifUrl from "@/assets/gif/empty.gif";
import loadingGifUrl from "@/assets/gif/loading.gif";

export interface PageType {
  pageSize: number;
  pageIndex: number;
}
const ArticleList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { current } = useRef<PageType>({ pageIndex: 1, pageSize: 10 });
  const [articleList, setArticleList] = useState<ArticleListType[]>([]);
  const [totalArticle, setTotalArticle] = useState<number>(0);
  const init = async () => {
    setLoading(true);
    const {
      data: { list, total },
    } = await GetHomeArticleList({
      pageSize: current.pageSize,
      pageIndex: current.pageIndex,
    });
    setLoading(false);
    setArticleList(list ?? []);
    setTotalArticle(total ?? 0);
  };
  const renderList = () => {
    if (articleList.length > 0) {
      return articleList.map((item, index) => (
        <ArticleItem key={index} info={item} />
      ));
    } else {
      return loading ? null : <img src={emptyGifUrl} />;
    }
  };
  const changeHandle = useCallback((pageIndex: number, pageSize: number) => {
    current.pageIndex = pageIndex;
    current.pageSize = pageSize;
    init();
  }, []);
  useEffect(() => {
    init();
  }, []);
  return (
    <div className='article-list'>
      <div className='article-body'>
        {loading ? <img src={loadingGifUrl} alt='' /> : null}
        {renderList()}
        <Pagination
          total={totalArticle}
          pageSize={current.pageSize}
          change={changeHandle}
        />
      </div>
    </div>
  );
};
export default ArticleList;
