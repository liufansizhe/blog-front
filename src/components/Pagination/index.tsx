import "./index.scss";

import { useEffect, useRef, useState } from "react";

export interface PaginationProps {
  total: number;
  pageSize: number;
  change: (pageIndex: number, pageSize: number) => void;
}
const Pagination = (props: PaginationProps) => {
  const { total, pageSize = 1, change } = props;
  const { current: pageInfo } = useRef({ pageSize: pageSize, pageIndex: 1 });
  const [page, setPage] = useState<number>(1);
  const changeHandle = (index: number) => {
    if (index !== pageInfo.pageIndex) {
      change(index, pageInfo.pageSize);
      pageInfo.pageIndex = index;
    }
  };
  const clickHandle = (val: number) => {
    switch (val) {
      case 0: {
        if (pageInfo.pageIndex == 1) {
          return;
        }
        change(--pageInfo.pageIndex, pageInfo.pageSize);

        break;
      }
      case 1: {
        if (pageInfo.pageIndex == page) {
          return;
        }
        change(++pageInfo.pageIndex, pageInfo.pageSize);
        break;
      }
    }
  };
  const renderPaginationList = () => {
    const start = pageInfo.pageIndex - 2 > 0 ? pageInfo.pageIndex - 2 : 1;
    const end = pageInfo.pageIndex + 2 > page ? page : pageInfo.pageIndex + 2;
    const isStartMid = start !== 1;
    const isEndMid = end !== page;
    const list = [];
    for (let i = start; i < end + 1; i++) {
      list.push(
        <div
          key={i}
          className={`pagination-item ${
            pageInfo.pageIndex == i ? "pagination-active" : ""
          }`}
          onClick={() => changeHandle(i)}
        >
          {i}
        </div>
      );
    }
    return (
      <>
        {isStartMid ? (
          <>
            <div
              className={`pagination-item ${
                pageInfo.pageIndex == 1 ? "pagination-active" : ""
              }`}
              onClick={() => changeHandle(1)}
            >
              1
            </div>
            <div className='qote'>...</div>
          </>
        ) : null}
        {list}
        {isEndMid ? (
          <>
            <div className='qote'>...</div>
            <div
              className={`pagination-item ${
                pageInfo.pageIndex == page ? "pagination-active" : ""
              }`}
              onClick={() => changeHandle(page)}
            >
              {page}
            </div>
          </>
        ) : null}
      </>
    );
  };
  useEffect(() => {
    setPage(Math.ceil(total / pageInfo.pageSize));
  }, [total, pageInfo.pageSize]);
  return total == 0 ? null : (
    <div className='pagination'>
      <div
        className='pagination-pre'
        style={{ cursor: pageInfo.pageIndex == 1 ? "not-allowed" : "pointer" }}
        onClick={() => clickHandle(0)}
      >
        {"上一页"}
      </div>
      <div className='pagination-list'>{renderPaginationList()}</div>
      <div
        className='pagination-next'
        style={{
          cursor: pageInfo.pageIndex == page ? "not-allowed" : "pointer",
        }}
        onClick={() => clickHandle(1)}
      >
        {"下一页"}
      </div>
    </div>
  );
};
export default Pagination;
