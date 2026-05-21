# 网站改版任务列表

## 执行规则

1. 一次只执行一个任务。
2. 每个任务执行完成后，diff 总结回复给我，我会确认任务是否完成，如果有问题我会继续让你修改，如果我确认完成，请把本文件中对应的任务状态标记为已完成，然后把本次任务的 diff 总结，以 markdown 格式记录到./tasks_record/下，然后使用 git 命令，把内容进行提交并 push。
3. 每个任务完成后不要直接做下一个任务，除非我明确要求继续。
4. 以下所有任务中，如果没有特殊说明，都是修改手机版本，不允许影响到 pc 版本。
5. 每一轮修改结束后（只是你的修改结束，并不是指任务完成，任务完成需要我来确认），除非任务中有明确说明使用 chrome mcp，否则都不需要调用 chrome mcp 确认效果，我会自己确认，修改完成后即可向我汇报，我会确认是否修改完成。
6. 所有修改后的代码必须保证防缓存，确保手机端每次查看都能展示最新效果。
7. 修改结束后，都需要告诉我，任务的内容是什么，修改的页面是哪个，比如 index.html，然后调用脚本/Users/xiexianbin/bin/feishu_private.sh来发送消息通知
8. 如果任务中有 figma 的链接，请使用 figma mcp 读取链接的设计信息
9. 所有任务都必须考虑代码是否防缓存以及手机兼容性问题，手机端兼容性以一加 Ace5 Pro 为重点参考机型。
10. 任务开始前必须先检查 git 工作区是否干净；如果不干净，需要先提示我当前有未提交改动，并停止任务执行，等待我确认后再继续。

---

## Task：tag-all.html页面，局部修改
状态：已完成
### 任务内容
把 tag-all.html 页面的如图![alt text](image-1.png)的内容，参考图片![alt text](image.png)进行修改,要求内容的位置和布局，都进行修改

## Task:attribute-all.html页面和tag-all.html页面，点击排序按钮后，悬浮菜单被遮挡修改
状态：已完成
### 任务内容
上面两个页面，如图的![alt text](image-2.png)的按钮被点击后，应该出现的浮动菜单，，我不确定是被下面的列表遮挡住了还是压根没有出现，请确认问题，然后进行修改


## Task: attribute-all.html的电脑版修改
状态：已完成
### 任务内容
store-all.html的电脑版，item 部分，每行需要展示 2 个 item，现在的样式如图![alt text](image-3.png)，只展示了一个


## Task:brand.html页面手机版，Hot Posts的 item 需要进行修改
状态：已完成
### 任务内容
brand.html手机版，Hot Posts的 item 如图![alt text](image-4.png)，请参考post-all.html中的 item 进行修改，直接使用post-all.html的组件，要求最终的展示效果和post-all.html中是一致的，要求修改后不影响目标文件以外的任何地方

## Task：post-all.html排序按钮太小
状态：已完成
### 任务内容
post-all.html的排序按钮如图![alt text](image-5.png)，太小了，请按照 figma 设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=614-7799&m=dev，请使用 figma mcp 读取设计稿的内容后修改

## Task:post-detail.html的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-6.png)，请参考 figma 设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=852-28617&m=dev，请使用 figma mcp 读取设计稿的内容后修改

## Task:post-detail.html的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-7.png)的布局不对，左侧距离边框、距离底部内容的间距都不对，请参考item-all.html的手机版的相同位置进行布局修改

## Task：item-detail.html的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-8.png)的布局不对，左侧距离边框、距离底部内容的间距都不对，请参考item-all.html的手机版的相同位置进行布局修改

## Task：item-detail.html的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-9.png)，请参考设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=722-21797&m=dev，请使用 figma mcp 读取设计稿的内容后修改，要求细节 1：1 还原，包括布局、间距、内容、颜色等等，修改完成后，请调用 chrome mcp，来确认修改效果，如果修改后的效果和设计稿比不够还原，则请继续修改

## Task：item-detail.html 的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-10.png)，请参考设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=722-21922&m=dev，请使用 figma mcp 读取设计稿的内容后修改，主要是修改内容布局，内容相对于外层卡片的间距

## Task：item-detail.html 的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-11.png)，请参考设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=722-21957&m=dev，请使用 figma mcp 读取设计稿的内容后修改，主要是修改内容布局，特别是标题部分，文字和 Hot、Top 等标志的布局，另外还有其中的内容，不能超过卡片的展示区域

## Task：item-detail.html 的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-12.png)，请参考图片进行修改![alt text](image-13.png)，包括宽度高度样式

## Task：item-detail.html 的手机版需要修改
状态：已完成
### 任务内容
Similar items 的部分，一页只需要展示 2 条数据，如图![alt text](image-14.png)，现在一页展示了 4 条数据，请参考 figma 设计稿修改 https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=998-38589&m=dev，请使用 figma mcp 读取设计稿的内容后修改

## Task: post-all.html 手机版需要修改
状态：已完成
### 任务内容
![alt text](image-15.png)如图的部分（看成一个整体，这个整体不需要修改，修改的是整体上面和整体下面的间距），顶部到上面内容的间距改成 10px，底部到下面内容的间距改成 10px

## Task:post-detail.html的手机版需要修改
状态：已完成
### 任务内容
该页面的 pc 版本，右侧是有一个锚点模块的（如图![alt text](image-16.png)），但是切换成手机版以后这个部分就不见了。移动版也需要这个锚点组件的。移动端这样修改：在页面上有一个浮动按钮如图![alt text](image-17.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=852-28733&m=dev，点击按钮以后从右侧出现锚点组件如图![alt text](image-18.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=997-36993&m=dev，请使用 figma mcp 读取设计稿的内容后修改，修改完成后，请调用 chrome mcp 来确认修改效果，确认和 figma 设计比已经很还原了才算修改结束

## Task：post-detail.html的手机版需要修改
状态：已完成
### 任务内容
Reviews 模块中，如图的部分![alt text](image-19.png)，其中的评分组件需要使用一颗星的评分组件（如图![alt text](image-20.png)），对应的设计稿为：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=852-28674&m=dev。请先确认项目中是否已经有该组件，如果有请直接使用，如果没有，请封装一个组件，然后应用到这里

## Task：post-detail.html的手机版需要修改
状态：已完成
### 任务内容
Reviews 模块中，如图的部分![alt text](image-21.png)，需要参考图片![alt text](image-22.png)进行修改。大小、间距、边框样式都需要修改，1：1 还原

## Task：post-detail.html的手机版需要修改
状态：已完成
### 任务内容
Related items 模块中，每一页只需要展示一行，每行展示两个，目前的效果如图![alt text](image-23.png)，需要改成如图![alt text](image-24.png)的效果

## Task：resource-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-25.png)的布局不对，左侧距离边框、距离底部内容的间距都不对，请参考item-all.html的手机版的相同位置进行布局修改

## Task:resource-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
该页面的 pc 版本，左侧是有一个锚点模块的![alt text](image-30.png)，但是切换成手机版以后这个部分就不见了。移动版也需要这个锚点组件的。移动端这样修改：在页面上有一个浮动按钮如图![alt text](image-17.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=852-28733&m=dev,需要使用设计稿中的图片，并且是只显示图片，完全切圆角，点击按钮以后从右侧出现锚点组件如图![alt text](image-18.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=997-36993&m=dev，锚点页面需要点击标题以后跳转到对应位置。请使用 figma mcp 读取设计稿的内容后修改，修改完成后，请调用 chrome mcp 来确认修改效果，确认和 figma 设计比已经很还原了才算修改结束。post-detail.html页面的手机版已经实现了，可以参考或者复用其中的组件和页面。如果post-detail.html页面没有把公共的内容抽取出来，则请把按钮和锚点页面都封装成组件后使用

## Task：resource-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
Other Pages 部分，每一页只需要展示 1 行数据，现在的效果如图![alt text](image-26.png)，应该修改成如图![alt text](image-27.png)的效果

## Task：service.html页面的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-28.png)的布局不对，左侧距离边框、距离底部内容的间距都不对，请参考item-all.html的手机版的相同位置进行布局修改

## Task：service.html页面的手机版需要修改
状态：已完成
### 任务内容
该页面的 pc 版本，右侧是有一个锚点模块的![alt text](image-29.png)，但是切换成手机版以后这个部分就不见了。移动版也需要这个锚点组件的。移动端这样修改：在页面上有一个浮动按钮如图![alt text](image-17.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=852-28733&m=dev,需要使用设计稿中的图片，并且是只显示图片，完全切圆角，点击按钮以后从右侧出现锚点组件如图![alt text](image-18.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=997-36993&m=dev，锚点页面需要点击标题以后跳转到对应位置。请使用 figma mcp 读取设计稿的内容后修改，修改完成后，请调用 chrome mcp 来确认修改效果，确认和 figma 设计比已经很还原了才算修改结束，post-detail.html页面的手机版已经实现了，可以参考或者复用其中的组件和页面。

## Task：store-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-31.png)的布局不对，左侧距离边框、距离底部内容的间距都不对，请参考item-all.html的手机版的相同位置进行布局修改

## Task：store-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
整个页面的布局，请按照 figma 设计稿进行调整：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=998-42164&m=dev，其中各个模块的内容都已经有了，但是手机版布局乱了，需要按照设计稿的布局进行修改

## Task：demand-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-32.png)的布局不对，左侧距离边框、距离底部内容的间距都不对，请参考item-all.html的手机版的相同位置进行布局修改

## Task：demand-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
列表中的所有 item 中的评分组件，都需要使用单💗的组件。项目中已经有现成的组件可以使用，请使用。另外整个组件的布局（所有组件的布局），仅仅是布局修改，请参考：figma https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1152-44658&m=dev 进行修改，再次强调，仅仅是修改布局


## Task：demand-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
如图的部分，请参考 figma：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1019-39493&m=dev 的设计进行修改，包括样式、间距、布局等等。后面的是选择图片后的效果：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1158-46145&m=dev，也一并参考修改


## Task：点击index.html右上角 Join 出现的一系列弹框的手机版需要修改
状态：已完成
### 任务内容
登录注册的这一系列弹框（登录、注册、找回密码、2fa验证等等，总之就是点击首页右上角Join 出现的弹框，其中的所有可能跳转的弹框），最底部的组件（不同的弹框最底部的组件不一样，需要区分），底部都需要有一个底部的外边距 20px


## Task：点击index.html右上角 Join 出现的一系列弹框的手机版需要修改
状态：已完成
### 任务内容
登录注册的这一系列弹框（登录、注册、找回密码、2fa验证等等，总之就是点击首页右上角Join 出现的弹框，其中的所有可能跳转的弹框），都需要支持向上滚动显示完整内容，有几个如图：![alt text](image-33.png)、![alt text](image-34.png)、![alt text](image-35.png)都无法向上滚动，这三个只是我测试到的，请完整检查这个系列所有弹框，确保都可以滚动到最底部展示所有内容


## Task：点击index.html右上角 Join 出现的一系列弹框的手机版需要修改
状态：已完成
### 任务内容
如图的弹框![alt text](image-36.png)，reset password 点击没有跳转到reset password弹框。请检查是没有reset password弹框，还是只是没有跳转。如果是没有，请参考signin-reset-password.html中的内容如图：![alt text](image-37.png)来实现。另外signin-login.html页面的reset password点击也没有跳转，请修改成点击后跳转到signin-reset-password.html页面


## Task：点击index.html右上角 Join 出现的一系列弹框的手机版需要修改
状态：已完成
### 任务内容
登录注册的这一系列弹框（登录、注册、找回密码、2fa验证等等，总之就是点击首页右上角Join 出现的弹框，其中的所有可能跳转的弹框），所有的密码展示和隐藏按钮（如图：![alt text](image-38.png)）点击都无效，都无法修改密码明文和密文展示切换。另外signin-2fa.html、signin-join.html、signin-login.html、signin-reset-2fa.html、signin-reset-password.html这几个页面中的密码展示和隐藏按钮的功能也需要修改

## Task：become-seller.html页面的手机版需要修改
状态：已完成
### 任务内容
提交申请的按钮的背景颜色不对，如图![alt text](image-39.png)，请改成![alt text](image-40.png)的背景颜色

## Task：become-seller.html页面的手机版需要修改
状态：已完成
### 任务内容
如图![alt text](image-41.png)的部分，布局不对，需要参考 item-all.html 中的样子进行修改，可以完全复用 item-all.html中的组件来实现，要求最终呈现效果和item-all.html中的对应组件一模一样

## Task：点击index.html 左上角的按钮出现的菜单的手机版需要修改
状态：已完成
### 任务内容
点击index.html 左上角的按钮出现的菜单如图![alt text](image-42.png)，其中的 become a seller 按钮点击了没有效果，需要跳转到become-seller.html页面

## Task：index.html页面的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-43.png)，需要把外部的卡片去掉，请参考 figma 设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=263-995&m=dev，要求 1：1 还原

## Task：search-all.html页面的手机版需要修改
状态：已完成
### 任务内容
search-all.html中，每种卡片中的标签，都要可以点击，点击后的操作，随机跳转到attribute-all.html或者tag-all.html

## Task：index.html页面的手机版需要修改
状态：已完成
### 任务内容
![alt text](image-44.png)如图，demands 的 item 展示不正确，请参考 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=263-1947&m=dev 修改，要求 1：1 还原

## Task：多个页面的手机版的排序按钮需要修改
状态：已完成
### 任务内容
demand-all.html排序按钮太小，右侧需要有间距，compaign-all.html、store-all.html、item-all.html页面有同样的问题，参考attribute-all.html页面的筛选按钮来改

## Task：resource-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
如图的部分![alt text](image-45.png)，点击收藏按钮的时候，不需要任何的效果，现在点击按钮的时候如图的整个部分都会有一个蓝色的点按效果（如图：![alt text](image-46.png)）（收藏和取消收藏功能不能受影响）

## Task：attribute-all.html页面的手机版需要修改
状态：已完成
### 任务内容
如图![alt text](image-47.png)，demands Vertical display 模式下的 item 布局不正确，需要参考 demand-all.html 中的 Vertical display 的 item 修改，请直接复用 demand-all.html 中的 Vertical display 的 item。要求修改完成后，展示的样子和 demand-all.html 中的 Vertical display 的 item一模一样

## Task：blog.html页面的手机版需要修改
状态：已完成
### 任务内容
![alt text](image-48.png)如图的内容布局不对，，参考item-all.html页面来修改，包括顶部的悬停效果，都要参考item-all.html来修改。包括面包屑的布局和位置也要参考item-all.html修改

## Task：多个页面的手机版的 show more 按钮需要修改
状态：已完成
### 任务内容
多个页面的show more（或者是类似的 show more xxx）样式不对，全局的show more（show more xxx）都要改成相同的样式，请把item-detail.html页面的show more按钮封装成组件，然后应用到所有的show more(show more xxx)的位置

## Task:brand-all.html页面的手机版需要修改
状态：已完成
### 任务内容
![alt text](image-49.png)，如图，顶部布局不对，需要完全复用item-all.html中的组件来修改，完全还原item-all.html中的样子

## Task:compaign-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
![alt text](image-50.png)，如图，顶部布局不对，需要完全复用item-all.html中的组件来修改，完全还原item-all.html中的样子

## Task:demand-all.html页面的手机版需要修改
状态：已完成
### 任务内容
如图![alt text](image-51.png)，Horizontal 模式下的 item，左右两边距离屏幕边缘的距离要减少一半

## Task:fastesp-service.html页面的手机版需要修改
状态：已完成
### 任务内容
![alt text](image-52.png)，如图，顶部布局不对，需要完全复用item-all.html中的组件来修改，完全还原item-all.html中的样子

## Task:fastesp-service.html页面的手机版需要修改
状态：已完成
### 任务内容
该页面的 pc 版本，右侧是有一个锚点模块的![alt text](image-53.png)，但是切换成手机版以后这个部分就不见了。移动版也需要这个锚点组件的。移动端这样修改：在页面上有一个浮动按钮如图![alt text](image-17.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=852-28733&m=dev,需要使用设计稿中的图片，并且是只显示图片，完全切圆角，点击按钮以后从右侧出现锚点组件如图![alt text](image-18.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=997-36993&m=dev，锚点页面需要点击标题以后跳转到对应位置。请使用 figma mcp 读取设计稿的内容后修改，修改完成后，请调用 chrome mcp 来确认修改效果，确认和 figma 设计比已经很还原了才算修改结束，post-detail.html页面的手机版已经实现了，可以参考或者复用其中的组件和页面。

## Task:tag-all.html页面的手机版需要修改
状态：已完成
### 任务内容
post的 item，布局不对,如图![alt text](image-54.png)，需要替换成post-all.html中第二个item的组件，最终展示效果需要和post-all.html中第二个item的组件一样

## Task: 多个页面的手机版需要修改
状态：未完成
### 任务内容
检查项目中所有的手机版评分组件，所有的手机版评分组件，都替换成目前项目中已有的单颗星的评分组件（已经是的就不需要修改了）

## Task: compaign-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
这个页面的整体展示宽度，超出了我手机的宽度，如图：![alt text](image-59.png)，整个页面的右侧，有一部分超出屏幕宽度了，请帮我调整为：页面内容右侧到屏幕边缘的间距，和页面内容右侧到屏幕边缘的间距相同

## Task: compaign-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
如图的部分：![alt text](image-55.png)，请改成 compaign-all.html 中的 Horizontal display 模式下的 item，如图：![alt text](image-56.png)，请直接复用参考页面的item 组件，要求和compaign-all.html 中的 Horizontal display 模式下的 item最终呈现效果一致

## Task: compaign-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
Related Items 的部分，需要使用和这个页面的 items 相同的组件，即如图的组件：![alt text](image-57.png)

## Task: 多个页面的手机版需要修改
状态：未完成
### 任务内容
signin-2fa.html、signin-join.html、signin-login.html、signin-reset-2fa.html、signin-reset-password.html，这几个页面的如图的头部：![alt text](image-58.png)，如图，顶部布局不对，需要完全复用item-all.html中的组件来修改，完全还原item-all.html中的样子



