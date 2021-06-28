import Button from './components/Button.js'
import Modal from './components/Modal.js'

interface State {
  visible: boolean
}

class App extends React.Component<any, State> {
  state: State = {
    visible: false
  }

  toggle() {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    return (
      <React.Fragment>
        <Button type="default">默认按钮</Button>
        <Button type="primary">主按钮</Button>
        <Button type="primary" onClick={this.toggle.bind(this)}>打开对话框</Button>
        <Modal
          visible={this.state.visible}
          title="窗口标题"
          // 实现关闭窗口的逻辑
          onClose={this.toggle.bind(this)}
          footer={[
            // 实现关闭窗口的逻辑
            <Button key="cancel" type='default' onClick={this.toggle.bind(this)}>取消</Button>,
            // 实现关闭窗口的逻辑
            <Button key="ok" type='primary' onClick={this.toggle.bind(this)}>确认</Button>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
