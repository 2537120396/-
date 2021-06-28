import * as React from 'react'
import {RouteComponentProps } from 'react-router-dom'
import {
    Table,
    Form,
    Button,
    Input,
    Menu,
    Dropdown,
    Modal,
    Tag,
    message
} from 'antd'
import { SettingOutlined, PlusOutlined } from '@ant-design/icons'
import { ColumnProps } from 'antd/lib/table'

import style from './style.less'
import { ISku, SkuStatus } from '../../types'
import Edit from './Edit'
import * as api from '../../services/api'

interface State {
    visible: boolean
    keyword: string
    users: ISku[]
    current: ISku
}

export default class Sku extends React.Component<RouteComponentProps, State> {
    columns: ColumnProps<ISku>[] = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            align: 'center',
            render: value => <img src={value} width="120" />
        },
        {
            title: '标题',
            dataIndex: 'title'
        },
        {
            title: '价格',
            width: 100,
            dataIndex: 'price',
            render: value =>  ("￥" + value)
        },
        {
            title: '库存',
            width: 100,
            dataIndex: 'stock',
        },
        {
            title: '状态',
            width: 100,
            dataIndex: 'status',
            render: (value: SkuStatus) => {
                if (value === 1) return <Tag color="green">上架</Tag>
                return <Tag color="red">下架</Tag>
            }
        },
        {
            title: '操作',
            key: 'opt',
            width: 150,
            align: 'center',
            render: (val, record) => {
                return (
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key="edit" onClick={() => this.edit(record)}>
                                    编辑
                                </Menu.Item>
                                <Menu.Item key="delete" onClick={() => this.remove(record)}>
                                    删除
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button icon={<SettingOutlined />} />
                    </Dropdown>
                )
            }
        }
    ]

    state: State = {
        visible: false,
        keyword: '',
        users: [],
        current: null
    }

    edit(record: ISku) {
        this.setState({
            current: record,
            visible: true
        })
    }

    add() {
        this.setState({
            current: null,
            visible: true
        })
    }

    remove(record: ISku) {
        Modal.confirm({
            title: '提示',
            content: `确定要删除该商品吗？`,
            onOk: async () => {
                let result = await api.removeSku(record.id)
                if (result.stat === 'OK') {
                    message.success('商品已删除')
                    this.getData()
                } else {
                    message.warning(result.message)
                }
            }
        })
    }

    async getData() {
        let handle = message.loading('正在加载数据...', 0)
        try {
            let result = await api.listSku(this.state.keyword)
            if (result.stat === 'OK') {
                this.setState({
                    users: result.rows
                })
            }
            handle()
        } catch (error) {
            handle()
            message.error('网络错误')
        }
    }

    reset() {
        this.setState(
            {
                keyword: ''
            },
            this.getData
        )
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <>
                <Form layout="inline" className={style.toolbar}>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={this.add.bind(this)}
                            icon={<PlusOutlined />}
                        >
                            添加商品
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder="标题"
                            autoComplete="off"
                            allowClear
                            value={this.state.keyword}
                            onKeyDown={e => {
                                if (e.key === 'Enter') this.getData()
                            }}
                            onChange={e => {
                                this.setState({ keyword: e.target.value.trim() })
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.getData.bind(this)}>
                            搜索
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.reset.bind(this)}>重置</Button>
                    </Form.Item>
                </Form>
                <Table
                    dataSource={this.state.users}
                    rowKey="id"
                    columns={this.columns}
                />
                {this.state.visible && (
                    <Edit
                        record={this.state.current}
                        onSuccess={this.getData.bind(this)}
                        afterClose={() => this.setState({ visible: false })}
                    />
                )}
            </>
        )
    }

}