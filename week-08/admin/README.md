# 作业思路和问题

## 思路

### 管理端

在pages中设置四个路由页:

Login——登录

Home——首页

Sku——商品页

APP——定义映射关系

页面跳转显示关系：

首先路由至Home页，在挂载Home页时先判断是否登录，若未登录跳转到Login页，已登录则正常显示Home页。Home页的布局内容又映射显示Sku页。选择退出跳转至Login页。

使用mobx创建全局状态，创建store类全局管理登录信息，供Home和Login访问或修改。

* Home：

使用Layout布局，Menu,Avatar, Dropdown, message其他组件完成功能

Sku：

包含index.tsx、Edit.tsx，要先登录才能获取商品数据

—index

​    设置state：visible（窗口可见性），keyword（关键字），users（商品数据），current:（当前选中商品）

​    使用Table, Form,Button,Input,Menu, Dropdown, Modal,Tag,message组件

​    定义数据数组传给Form

​    删除、添加：修改current,visible

​    搜索：将keyword传给获取商品数据接口

—Edit（编辑和添加商品）

​     设置state：disabled（数据获取或提交成功否），visible（窗口显示或隐藏），商品其他属性值。Props:取消和关闭事件

​     使用Modal,Form, Input, Button, Select, message, InputNumber组件

​     将获取到的数据赋给各显示框，gallery，detail数组通过join('\n')转换成字符串换行显示，提交时又获取表单内容换成字符串数组再提交

## 问题

* 编辑和添加窗口

布局时使用lableCol、wrapperCol赋值不对，写成lableCol={span:3}，应该是lableCol={{span:3}}

* 无法换行显示头图和详情图的地址

没看好组件API，以为只能在Form设置initialValue，因此一直想着要修改整个ISku再渲染到Form上。

可以为单个 Form.Item设置默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准。所以可以只修改获取的ISku的gallery和detail，再设置单个表格项内容

* 无法提交表单

表单的头图和详情图提交的内容是字符串，而更新接口参数是ISku，对应的类型是数组。

通过validateFields()获取表单内容values，刚开始想的是直接 `values.gallery = values.gallery.split('\n')`，但FormInstance设置的是ISku类型，无法使用字符串的split()方法。后来想到`values.gallery = this.state.gallery.split('\n')`，但也无法正常执行，因为如果是添加商品的话还没有设置state，获取到的是undefined。最后又仔细看了下组件的API，才发现可以通过getFieldValue()获取指定表单项内容，于是改成values.gallery = await this.form.getFieldValue("gallery").trim().split('\n')

* 添加商品的库存和价格数字输入框无法显示全部placeholder内容

  设置宽度没有效果，目前还未解决



