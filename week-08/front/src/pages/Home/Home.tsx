// 商品页面
import * as React from 'react'
import Goods from '../../components/goods' 
import { ISku } from '../../types'
import style from './Home.less'
import * as api from '../../services/api'
import Footer from '../../components/footer'

interface State {
    News: ISku[]
}
export default class goods extends React.Component<State> {
    state: State = {
        News: []
    }

    async load() {
        let row = await api.listSku()
        this.setState({
            News: row.rows
        })
    }

    componentDidMount() {
        this.load()
    }

    render() {
        return (
            <div className={style.page}>
                <div className={style.inner}>
                    <div className={style.grid}>
                        {this.state.News.map((New, index) => (
                            <Goods
                                key={index}
                                goods={New}
                            />
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}