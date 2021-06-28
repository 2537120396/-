import * as React from 'react'
import { Modal, Form, Input, Button, Select, message, InputNumber, Row, Col } from 'antd'
import { FormInstance } from 'antd/lib/form'

import { ISku, SkuStatus } from '../../types'
import * as api from '../../services/api'

interface Props {
  record?: ISku
  afterClose?: () => void
  onSuccess?: () => void
}

interface State {
  disabled: boolean
  visible: boolean
  title: string
  status: SkuStatus
  stock: number
  price: number
  cover: string
  gallery: string
  detail: string
}

export default class Edit extends React.Component<Props, State> {
  form: FormInstance<ISku> = null
  state: State = {
    disabled: false,
    visible: true,
    title: this.props.record?.title,
    status: this.props.record?.status,
    stock: this.props.record?.stock,
    price: this.props.record?.price,
    cover: this.props.record?.cover,
    gallery: this.props.record?.gallery.join('\n'),
    detail: this.props.record?.detail.join('\n')
  }

  close() {
    this.setState({
      visible: false
    })
  }

  async submit() {
    try {
      let values = await this.form.validateFields()

      values.gallery = await this.form.getFieldValue("gallery").trim().split('\n')
      values.detail = await this.form.getFieldValue("detail").trim().split('\n')

      this.setState({
        disabled: true
      })

      if (this.props.record) {
        let result = await api.updateSku({
          id: this.props.record.id,
          ...values
        })
        if (result.stat === 'OK') {
          message.success('商品更新成功')
          this.close()
          this.props?.onSuccess()
        } else {
          message.error(result.message)
        }
      } else {
        let result = await api.addSku(values)
        if (result.stat === 'OK') {
          message.success('商品添加成功')
          this.close()
          this.props?.onSuccess()
        } else {
          message.error(result.message)
        }
      }
    } catch (error) { } finally {
      this.setState({
        disabled: false
      })
    }
  }

  render() {

    return (
      <Modal
        width={1000}
        visible={this.state.visible}
        title={this.props.record ? '编辑商品' : '添加商品'}
        onCancel={this.close.bind(this)}
        maskClosable={false}
        afterClose={this.props.afterClose}
        destroyOnClose
        footer={[
          <Button type="text" key="cancel" onClick={this.close.bind(this)}>
            取消
          </Button>,
          <Button type="primary" key="ok" onClick={this.submit.bind(this)} disabled={this.state.disabled}>
            确认
          </Button>
        ]}
      >
        <Form ref={el => this.form = el} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} >
          <Form.Item
            initialValue={this.state.title}
            name="title"
            label="标题"
            rules={[
              {
                required: true,
                message: '请填写标题'
              }
            ]}
          >
            <Input placeholder="请填写标题" />
          </Form.Item>
          <Form.Item
            initialValue={this.state.status}
            name="status"
            label="状态"
            rules={[
              {
                required: true,
                message: '请选择状态'
              }
            ]}
          >
            <Select placeholder="请选择状态" >
              <Select.Option value={1}>上架</Select.Option>
              <Select.Option value={2}>下架</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            initialValue={this.state.stock}
            name="stock"
            label="库存"
            rules={[
              {
                required: true,
                message: '请填写库存'
              }
            ]}
          >
            <InputNumber placeholder="请填写库存"/>
          </Form.Item>
          <Form.Item
            initialValue={this.state.price}
            name="price"
            label="价格"
            rules={[
              {
                required: true,
                message: '请填写价格'
              }
            ]}
          >
            <InputNumber placeholder="请填写价格" />
          </Form.Item>
          <Form.Item
            initialValue={this.state.cover}
            name="cover"
            label="封面图"
            rules={[
              {
                required: true,
                message: '请填写封面图地址'
              }
            ]}
          >
            <Input placeholder="请填写封面图地址" />
          </Form.Item>
          <Form.Item
            initialValue={this.state.gallery}
            name="gallery"
            label="头图"
            rules={[
              {
                required: true,
                message: '请填写头图地址，每行一条记录'
              }
            ]}
          >
            <Input.TextArea placeholder="请填写头图地址，每行一条记录" rows={5} />
          </Form.Item>
          <Form.Item
            initialValue={this.state.detail}
            name="detail"
            label="详情图"
            rules={[
              {
                required: true,
                message: '请填写详情图地址'
              }
            ]}
          >
            <Input.TextArea placeholder="请填写详情图地址，每行一条记录" rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
