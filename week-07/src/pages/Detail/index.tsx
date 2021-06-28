// 文章详情页面
import * as api from '../../services/api'
import * as React from 'react'
import { IArticle } from '../../types'
import './style.css'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Back from '../../assets/imgs/Icon_back.png'
interface Params {
    id: string
}
interface State {
    detail: IArticle
}
export default class Detail extends React.Component<State & RouteComponentProps<Params>> {
    state: State = {
        detail: {
            author: '',
            avatar: '',
            id: '',
            title: '',
            time: '',
            banner: '',
            likes: 0,
            comments: 0
        }
    }

    async load() {
        let row = await api.detail(this.props.match.params.id)
        this.setState({
            detail: row.data
        })
    }

    componentDidMount() {
        this.load()
    }

    render() {
        return (
            <div className='Detail'>
                <div className='head'>
                    <div>
                        <img src={Back} className='icon-back' onClick={() => this.props.history.goBack()} />
                    </div>
                    <div className='avatar'>
                        <img src={this.state.detail.avatar} className='avatar' />
                    </div>
                    <div className='name'>
                        {this.state.detail.author}
                    </div>
                </div>
                <div className='picture'>
                    <img src={this.state.detail.banner} className='pic' />
                </div>

                <div className='content'>
                    <div className='detailTitle'>
                        {this.state.detail.title}
                    </div>
                    <div className='time'>
                        {this.state.detail.time}
                    </div>
                    <article dangerouslySetInnerHTML={{ __html: this.state.detail.content }} />
                </div>
            </div>
        )
    }
}
