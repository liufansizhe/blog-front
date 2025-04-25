import "./index.scss";

import { ArticleListType } from "@/page/articleList/type";
import { Avatar } from "antd";
import CollectIcon from "@/assets/svg/Collect.svg?react";
import StarIcon from "@/assets/svg/Star.svg?react";
import { useMemo } from "react";

export interface ArticleItemProps {
  info: ArticleListType;
}
const ArticleItem = (props: ArticleItemProps) => {
  const { info } = props;
  const updateTime = useMemo(() => {
    let duration = Math.ceil(
      (new Date().getTime() - Number(info.createTime)) / 1000
    );
    let count = 0;
    let res = "";
    while (duration > 1) {
      res = Math.ceil(duration) + "";
      count++;
      switch (count) {
        case 1: {
          //分钟
          duration /= 60;

          break;
        }
        case 2: {
          //小时
          duration /= 60;
          break;
        }
        case 3: {
          //天
          duration /= 24;
          break;
        }
        case 4: {
          //月
          duration /= 30;
          break;
        }
        case 5: {
          duration /= 12;
          break;
        }
        default: {
          duration = 0;
        }
      }
    }
    switch (count) {
      case 1: {
        //分钟
        res += "秒前";

        break;
      }
      case 2: {
        //小时
        res += "分钟前";
        break;
      }
      case 3: {
        //天
        res += "小时前";
        break;
      }
      case 4: {
        //月
        res += "天前";
        break;
      }
      case 5: {
        res += "个月前";
        break;
      }
      case 6: {
        res += "年前";
        break;
      }
    }
    return res;
  }, [info.createTime]);
  const clickHandle = () => {
    window.open("/detail/" + info.contentId);
  };
  return (
    <div className='article-item'>
      <div className='article-item-head'>
        <Avatar src={info.userAvatar} />
        <a className='article-name' onClick={clickHandle}>
          {info.userName}/ {info.title}
        </a>
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
        {updateTime}
      </div>
    </div>
  );
};
export default ArticleItem;
