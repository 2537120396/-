// 好文精选页面
import * as api from '../../services/api'
import * as React from 'react'
import { IArticle } from '../../types'
import './style.css'
import PostItem from '../../components/PostItem'
import Nav from '../../components/Nav'
interface State {
    posts: IArticle[]
}
export default class Posts extends React.Component<any, State>{
    state: State = {
        posts: []
    }

    async load() {
        let row = await api.posts() 
        this.setState({
            posts:row.rows  
        })
    }

    componentDidMount() {
        this.load()
    }
    EnterArticle(posts: IArticle) {
        let index = this.state.posts.indexOf(posts)
        this.state.posts.splice(index, 1)
        this.setState({
            posts: this.state.posts
        })
      }
      

  render() {
    return (
         <>
          <Nav />
            <div className="list-2">
              {this.state.posts.map((post, index) => (
                <PostItem
                  key={index}
                  post={post}
                  onClick={() => this.EnterArticle(post)}
                />
               ))}
            </div>
        </>
    )
  }
}