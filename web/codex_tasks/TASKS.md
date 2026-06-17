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



## Task：多个页面的手机版需要修改
状态：已完成
### 任务内容
多个页面的手机版的 show more 按钮需要修改，以item-detail.html为例，如图![alt text](image-174.png)，现在项目中，所有的手机版的 show more 按钮都是如图的样子，需要全部统一修改（应该使用的是同一个组件，修改组件即可），请参考 figma 设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=813-25755&m=dev，需要撑满屏幕宽度（左右边距还是要的）


## Task：brand.html页面的手机版需要修改
状态：已完成
### 任务内容
Adobe-Hot Demands 部分的 item，如图![alt text](image-175.png)，BID NOW 按钮距离上面的 tag 的距离太远了。我希望修改成：最多展示 2 行 tag（tag 部分，固定能够展示两行的高度即可），BID NOW 顶部紧贴 tag 部分的底部即可（间距 10px）


## Task：brand.html页面的手机版需要修改
状态：已完成
### 任务内容
Adobe - Hot Posts 部分的第一个 item，![alt text](image-176.png)，点击右侧的![alt text](image-177.png)，关闭后又会自动打开，我希望打开和关闭状态，可以固定住，而不是跳动。第二个和第三个 item 如图![alt text](image-178.png)，点击箭头点开和关闭，内容没有变化，我希望展开状态如图 ![alt text](image-176.png)，关闭状态如图![alt text](image-178.png)


## Task：brand.html页面的手机版需要修改
状态：待沟通
### 任务内容
Social Accounts Hot items 部分的 item（这个 item 是全局的 item 组件，我希望修改后，全局使用这个组件的地方都修改了），需要进行修改，请参考 figma 设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=722-20389&m=dev



## Task：brand-all.html页面的手机版需要修改
状态：已完成
### 任务内容
面包屑部分需要进行微调：底部的 padding 需要增加 20px


## Task：brand-all.html页面的手机版需要修改
状态：已完成
### 任务内容
左侧的字母锚点部分，需要稍微调整下位置，左侧需要和面包屑的左侧对齐


## Task：store-all.html页面的手机版需要修改
状态：已完成
### 任务内容
Horizontal 模式下的 item，其中的 tag，现在如图![alt text](image-179.png)，需要增加到 12 个，最多展示 1 行，超出的部分展示...即可


## Task：compaign-all.html页面的手机版需要修改
状态：已完成
### 任务内容
Vertical 模式下的 item 需要改用其他组件，请使用 index.html 中的Hot campaigns 部分的组件（即如图的组件：![alt text](image-181.png)）


## Task：index.html页面的手机版需要修改
状态：已完成
### 任务内容
Popular demands 部分的 item，需要进行调整，需要在右上角增加一个收藏组件，收藏组件请复用 Best items 部分的组件中的收藏组件

## Task：index.html页面的手机版需要修改
状态：未完成
### 任务内容
Popular demands 部分的 item![alt text](image-182.png)如图，其中的 tag 部分，第二行的 tag，下半部分像是被裁切掉了，没有展示出来。我希望 tag 部分能够完整展示


## Task：index.html页面的手机版需要修改
状态：未完成
### 任务内容
Host posts 部分的 item组件，需要使用其他的组件，请使用 post-all.html 页面的组件。我希望替换后，index.html 页面的Host posts 部分的 item组件能够和post-all.html 页面展示得一模一样


## Task：item-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
![alt text](image-184.png)如图的部分，需要参考 figma 设计稿来修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=722-21849&m=dev，主要是修改按钮高度、按钮文字的样式大小、Total price 部分的字体大小和字体样式


## Task：item-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
![alt text](image-185.png)如图的部分，需要参考 figma 设计稿来修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=722-21842&m=dev，主要是修改高度和字体、图标大小



## Task：compaign-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
这个页面中的 item 组件，右侧为什么会有滚动条？如图![alt text](image-186.png)，我希望去掉滚动条


## Task：search-all.html页面的pc版需要修改
状态：未完成
### 任务内容
两个地方需要修改，1：![alt text](image-188.png) 2.![alt text](image-189.png)，其中的标题前面的标签，需要和标题放在标题前面，和标题纵向居中对齐


## Task：blog.html页面的手机版需要修改
状态：未完成
### 任务内容
点击右侧锚点按钮后出现的页面如图：![alt text](image-190.png)，现在这个页面无法关闭，我希望在底部增加一个关闭按钮，点击以后关闭如图的页面。关闭按钮的位置和样式，请参考post-detail.html 页面的锚点页面（如图![alt text](image-191.png)）中的关闭按钮来实现

### Task：index.html页面的pc版和手机版都需要进行修改
状态：未完成
### 任务内容
需要完善购买流程：在已登录的情况下，点击 Best Items 的 buy now 按钮，需要进入购买流程（目前无论登录没登录，点击以后都展示登录弹框，需要修改）。购买流程如下：pc 端：![alt text](image-152.png)，手机端：![alt text](image-153.png)，pc 端是以弹框的形式呈现，手机端是以新页面的形式呈现（手机端流程走完，需要回到 index.html 页面），一下是 figmg 设计稿，请按照设计稿 1：1 还原，pc 端：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78158&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=4151-81393&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=4151-83592&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=4151-83819&m=dev；手机端：
https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78110&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78196&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78242&m=dev。目前的情况是，已经实现了购买流程，pc 端和手机端都实现了，但是样式跟 figma 设计稿差别太大了，我希望你能够按照 figma 设计稿，来修改 pc 端和手机端的购物流程中的所有 ui