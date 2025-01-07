import "./index.scss";

import { ArticleListType } from "@/page/articleList/type";
import { Avatar } from "antd";
import CollectIcon from "@/assets/svg/Collect.svg?react";
import StarIcon from "@/assets/svg/Star.svg?react";

export interface ArticleItemProps {
  info: ArticleListType;
}
const ArticleItem = (props: ArticleItemProps) => {
  const { info } = props;
  return (
    <div className='article-item'>
      <div className='article-item-head'>
        <Avatar src={info.userAvatar} />
        <span>
          {info.userName}/ {info.title}
        </span>
      </div>
      <div className='article-item-content'>{info.describe}</div>
      <div className='article-item-tag-list'></div>
      <div className='article-item-footer'>
        <StarIcon />
        {info.collect}
        <span className='dot'>·</span>
        <CollectIcon />
        {info.collect}
        <span className='dot'>·</span>
      </div>
    </div>
  );
};
export default ArticleItem;
