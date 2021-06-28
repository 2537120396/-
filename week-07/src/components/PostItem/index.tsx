// 好文推荐列表项组件
import { IArticle } from '../../types'
import './style.css'
import * as React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

interface Params {
  id: string
}

interface Props {
  post: IArticle
  onClick: () => void
}

class PostItem extends React.Component<Props & RouteComponentProps<Params>> {
  render() {
    let { post } = this.props
    let id = '/detail/'+this.props.post.id
    return (
        <Link to={id} className="sku" >
          <div className="content">
            <div className="cover">
              <img src={post.banner} className="cover-img" />
            </div>
            <div className="comment">
               <strong>{post.title}</strong>
            </div>
            <div className="desc">
              <span className="desc-number-1">{post.likes} </span>
              <i className="iconfont icon-likes"></i>
              <span className="desc-number-2">{post.comments}</span>
              <i className="iconfont icon-comments"></i>
            </div>
        </div>
      </Link>
    )
  }
}
export default withRouter(PostItem)