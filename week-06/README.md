# 作业思路和问题
鼠标悬浮变成手样式：
css样式
cursor:pointer

Button组件：类名、onClick事件和内容由传入参数决定
Modal组件：遮罩mask和modal对话框类名由参数决定并随点击事件发生变化 给遮罩mask、Button按钮和关闭按钮绑定点击事件onClose()
Main：使用自定义Button组件并设置参数值。toggle()为点击事件，用于改变visible状态,给用于打开对话框的按钮绑定toggle()。
