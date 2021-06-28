// 热门资讯列表项组件
import { IArticle } from '../../types'
import './style.css'
import * as React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

interface Params {
  id: string
}
interface Props {
  news: IArticle
  onClick: () => void
}

class NewsItem extends React.Component<Props & RouteComponentProps<Params>> {
  render() {
    let { news} = this.props
    let id = '/detail/'+this.props.news.id
    return (
      <Link to={id} className="hot" >
         <div className="main">
             <div className="item">
                 <a href="" className="item-a">
                     <img src="" />
                     <div className="item-write">   
                       <div className="title"></div>
                       <div className="bttom"></div>
                    </div>
                 </a>
             </div>
         </div>
       




        <div className="hot-cover">
          <img src={news.banner} className="hot-img" />
        </div>
        <div className="hot-comment">
          <div className="hot-title">{news.title}</div>
          <div className="hot-author">{news.author}</div> 
        </div>
      </Link>
    )
  }
}
export default withRouter(NewsItem)