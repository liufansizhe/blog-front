import "bytemd/dist/index.css";
import "bytemd/dist/index.min.css";
import "highlight.js/styles/github-dark.css";
import "./index.scss";

import { useEffect, useMemo, useState } from "react";

import Api from "@/services";
import { ArticleType } from "./type";
import { Avatar } from "antd";
import { Viewer } from "@bytemd/react";
import moment from "moment";
import { plugins } from "../write";
import { useParams } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams();
  const [info, setInfo] = useState<ArticleType>({ content: "" });

  const init = async () => {
    const { data, success } = (await Api.GetArticleDetail({ id })) ?? {};
    if (success) {
      setInfo(data);
    }
  };
  const time = useMemo(() => {
    return moment(info.createTime).format("YYYY-MM-DD");
  }, [info.createTime]);
  useEffect(() => {
    init();
  }, []);
  return (
    <div className='article-detail'>
      <div className='article-detail-body'>
        <div className='article-detail-body-head'>
          <div className='title'>{info?.title}</div>
          <div className='info'>
            <span className='name'> 作者：{info.userName}</span>
            <span className='time'>更新日期：{time}</span>
          </div>
        </div>
        <Viewer value={info.content} plugins={plugins} />
        <div className='article-detail-body-user'>
          <div className='user-info'>
            <Avatar src={info.userAvatar} />
            <div className='user-name-body'>
              <span>{info.userName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleDetail;
