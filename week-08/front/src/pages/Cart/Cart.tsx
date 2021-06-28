// 热门资讯页面
import * as React from 'react'
import { ISku } from '../../types'
import style from './Cart.less'
import * as api from '../../services/api'
import { Modal, message, Button } from 'antd'
import Footer from '../../components/footer'

interface ISkus extends ISku {
    isChecked: boolean
}
interface State {
    lists: ISkus[]
    isCkeckedAll: boolean
    
}

export default class Posts extends React.Component<any, State> {
    state: State = {
        lists: [],
        isCkeckedAll: true,
        
    }
    //数据获取
    async getData() {
        let result = await api.listCart()
        let list = []
        if (result.stat === 'OK') {
            result.rows.map((item) => {
                list.push(Object.assign({}, item, { isCkecked: false }))
            })
            this.setState({
                lists: list
            })
        }
        if (result.stat === 'ERR_NOT_LOGIN') {
            this.props.history.push('/login')
        }
    }
    componentDidMount() {
        this.getData()
    }
    //删除
    async delete() {
        let results = this.state.lists.filter(
            item => item.isChecked === false
        )
        let number = []
        results.map((item) => {
            number.push(item.id)
        })
        console.log(number)
        await api.removeCart(number)
    }
    
    //全选
    checkAll() {
        //未全选的情况 
        if (this.state.isCkeckedAll === false) {
            this.setState({
                isCkeckedAll: true
            })
            this.state.lists.map((item) => {
                if (item.isChecked === false) {
                    this.state.lists.forEach(
                        i => { i.isChecked = true }
                    )
                }
            })
            this.setState({
                lists: this.state.lists
            })
            console.log(this.state.lists)
            console.log(this.state.isCkeckedAll)
        } else {//已全选的情况
            this.setState({
                isCkeckedAll: false
            })
            this.state.lists.map(() => {
                this.state.lists.forEach(
                    i => { i.isChecked = false }
                )
            })
            this.setState({
                lists: this.state.lists
            })
            console.log(this.state.lists)
            console.log(this.state.isCkeckedAll)
        }
    }
    //选中状态变化
    onclick(index: number) {
        this.state.lists[index].isChecked = !this.state.lists[index].isChecked
        this.setState({
            lists: this.state.lists
        })
        console.log(this.state.lists)
    }
    render() {
        return (
            <>
                <div className={style.page}>
                    <div className={style.in}>
                        <div className={style.inner}>
                            {this.state.lists.map(
                                (item, index) => (
                                    <div className={style.list} >
                                        <i className={`${style.aa} 
                                          ${this.state.lists[index].isChecked ? 'iconfont icon-round' : "iconfont icon-roundcheckfill"} 
                                          ${this.state.lists[index].isChecked ? style.yes : style.no}`}
                                            onClick={() => this.onclick(index)}
                                        />
                                        <img src={this.state.lists[index]?.cover} className={style.img} />
                                        <div className={style.info}>
                                            <div className={style.title}>
                                                {this.state.lists[index]?.title}
                                            </div>
                                            <div className={style.price}>
                                                ￥{this.state.lists[index]?.price}
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className={style.footer}>
                        <i className={`${style.aa} 
                        ${this.state.isCkeckedAll ? style.yes : style.no} 
                        ${this.state.isCkeckedAll ? "iconfont  icon-round" : 'iconfont icon-roundcheckfill'}`}
                            onClick={this.checkAll.bind(this)}
                        />
                        <span className={style.check} >全选</span>
                        <button className={style.btn} onClick={this.delete.bind(this)}>删除</button>
                    </div>
                    <Footer />
                </div>

            </>
        )
    }
}