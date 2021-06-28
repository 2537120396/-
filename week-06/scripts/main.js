import Button from './components/Button.js';
import Modal from './components/Modal.js';
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            visible: false
        };
    }
    toggle() {
        this.setState({
            visible: !this.state.visible
        });
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { type: "default" }, "\u9ED8\u8BA4\u6309\u94AE"),
            React.createElement(Button, { type: "primary" }, "\u4E3B\u6309\u94AE"),
            React.createElement(Button, { type: "primary", onClick: this.toggle.bind(this) }, "\u6253\u5F00\u5BF9\u8BDD\u6846"),
            React.createElement(Modal, { visible: this.state.visible, title: "\u7A97\u53E3\u6807\u9898", 
                // 实现关闭窗口的逻辑
                onClose: this.toggle.bind(this), footer: [
                    // 实现关闭窗口的逻辑
                    React.createElement(Button, { key: "cancel", type: 'default', onClick: this.toggle.bind(this) }, "\u53D6\u6D88"),
                    // 实现关闭窗口的逻辑
                    React.createElement(Button, { key: "ok", type: 'primary', onClick: this.toggle.bind(this) }, "\u786E\u8BA4")
                ] },
                React.createElement("p", null, "Some contents..."),
                React.createElement("p", null, "Some contents..."),
                React.createElement("p", null, "Some contents..."))));
    }
}
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=main.js.map