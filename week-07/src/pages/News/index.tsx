// 热门资讯页面
import * as React from 'react'
import NewsItem from '../../components/NewsItem' // 热门资讯列表项组件引用
import { IArticle } from '../../types'
import './style.css'
import * as api from '../../services/api'
import Nav from '../../components/Nav'
interface State {
  New: IArticle[]
}
export default class Posts extends React.Component<any, State> {
  state: State = {
    New: []
}

async load() {
    let row = await api.news() 
    this.setState({
      New:row.rows  
    })
}

componentDidMount() {
    this.load()
}


  EnterArticle(New: IArticle) {
    let index = this.state. New.indexOf(New)
    this.state.New.splice(index, 1)
    this.setState({
       New: this.state.New
    })
  }
  

  render() {
    return (
    <>
       <div className="list">
            {this.state.New.map((News,index) => (
              <NewsItem
                key={index}
                news={News}
                onClick={() => this.EnterArticle(News)}
              />
            ))}
       </div>
\
    </>
    )
  }
}