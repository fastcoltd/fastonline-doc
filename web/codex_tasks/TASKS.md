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


## Task：index.html页面的手机版需要修改
状态：已完成
### 任务内容
Best items 中的 item，需要修改，其中的收藏和取消收藏按钮，需要使用项目中现有的收藏和取消收藏组件。如果已经使用了，请检查为什么收藏状态颜色变成了白色，我需要的收藏状态是红色


## Task：item-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
页面滚动时，悬停在顶部的内容如图：![alt text](image-94.png)，我希望悬停的内容中，不要包括图片，只需要悬停如图![alt text](image-95.png)的内容


## Task：item-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
点击左上角的按钮，出现如图![alt text](image-96.png)的菜单时，底层的页面（也就是item-detail.html页面），整体会向右移动一些，我希望出现菜单时，底部页面整体不要移动。另外帮我检查其他的会出现这个菜单的页面，我需要修改后，所有会出现这个菜单的页面，出现菜单后，页面内容都是不会移动的


## Task：store-detail.html页面的手机版和 pc 版需要修改
状态：已完成
### 任务内容
其中 Overview 的部分，如图![alt text](image-97.png)的三个按钮点击以后，下面的曲线图没有任何变化，我需要点击以后发生变化（数据发生变化，而不是样式）。另外检查整个项目，只要有这个样式的地方，点击如图的按钮都需要发生数据变化


## Task：store-detail.html页面的 pc 版需要修改
状态：已完成
### 任务内容
如图![alt text](image-98.png)的部分，顶部的文字部分需要进行修改，参考移动端的做法，![alt text](image-99.png)如图的文字放在同一行中，整体的宽度正好充满外层卡片宽度，底部的部分如图![alt text](image-129.png)，我也希望能够充满外层卡片的宽度。另外这个组件，我希望封装成一个独立的组件（新建一个），然后项目中的所有 pc 版页面，使用了类似的柱状图的地方，都需要用新的组件来替换（已知item-detail.html页面需要，其他页面需要你都找出来）


## Task：index.html页面的手机版需要修改
状态：已完成
### 任务内容
![alt text](image-100.png)如图的部分，也就是 Popular demands 的 item，其中的如图![alt text](image-101.png)部分的文字太小了，请参考Hot campaigns 的 item 中的如图![alt text](image-102.png)部分的文字大小来修改。修改后，要保证布局合理美观


## Task：post-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
页面中有个浮动的按钮如图![alt text](image-103.png)。点击以后会出现一个锚点页面如图![alt text](image-104.png)，我希望修改这个锚点页面。我希望锚点页面中的内容能够纵向居中显示（关闭按钮![alt text](image-105.png)不需要改动保持原位），仅仅是改变内容的布局，其他任何东西都不需要修改。另外如果内容超出一个屏幕的高度，需要可以上下滚动。修改完成后，请检查项目中所有的锚点页面（都有相同样式的浮动按钮点击后出现），布局都按照前面的要求来修改


## Task：post-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
正文内容的部分，左右边距，需要和顶部的标题部分一致。如图![alt text](image-106.png)，也就是内容的左侧，需要和左侧的红线对齐，右侧需要和右侧的红线对齐


## Task：多个页面的手机版需要修改，以post-detail.html为例
状态：已完成
### 任务内容
点击左上角如图![alt text](image-107.png)的按钮后，会出现一个菜单如图![alt text](image-108.png)，点击菜单的![alt text](image-109.png)如图中的任意一项，比如 Design或者 Trading，会进入一个二级菜单页面如图![alt text](image-110.png)，这个最后出现的二级菜单页需要修改。这个二级菜单有一个现象：点击任意一个选项，都会出现如图的![alt text](image-111.png)Trading 2 上的蓝色矩形背景，我希望不要出现，不管点击哪里都不要出现


## Task：brand.html页面的手机版需要修改
状态：已完成
### 任务内容
Demands 这个 tab 的 item，如图![alt text](image-112.png)，其中的如图![alt text](image-113.png)部分的文字太小，请参考 Content tab 的 item 中的如图![alt text](image-114.png)部分的文字大小来修改


## Task：index.html页面的 pc 版需要修改
状态：未完成
### 任务内容
页面中的Hot campaigns 部分、Popular demands 部分，这两个部分的 item 中，有':'的地方，都需要改成':&nbsp'，Hot campaigns部分的 item 中的 'Sales:5633'，需要改成'Sales:&nbsp5633'，以此类推。或者修改样式，因为静态页面后续会替换掉其中 5633 的部分，我担心替换的时候把&nbsp5633都替换掉了，这样:和内容之间就没有空格了，请帮我找一个最佳的方案。另外这两个部分的 item，应该是独立组件，我希望修改后，项目中所有用到这两个部分组件的地方，都是修改后的样子


## Task：store-detail.html页面的手机版和 pc 版需要修改
状态：未完成
### 任务内容
手机版如图的部分![alt text](image-118.png)，pc 版如图的部分![alt text](image-119.png)，No 这个文本前面的按钮，为选中的状态，方向反了，应该是拇指朝下的按钮才对。请帮我修改。选中状态的样子是对的，不需要修改


## Task：store-detail.html页面的手机版和 pc 版需要修改
状态：未完成
### 任务内容
pc 版：![alt text](image-120.png)，手机版：![alt text](image-121.png)，点击以后，需要增加一条内容，即手机版：增加一条如图![alt text](image-122.png)的内容，pc 版：增加一条如图：![alt text](image-123.png)的内容


## Task：post-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
![alt text](image-124.png)如图的部分，需要改成其他组件，改成 5 颗星的那种组件（项目中已经有了）。另外请检查 5 颗星的组件是否有选择评分功能，这里需要支持选择评分功能，如果组件不支持选择评分，请修改组件支持选择评分。由于 5 颗星组件其他地方也有用到，我希望修改后，其他地方不受影响，只有需要选择评分的地方，由参数来设置是否支持选择评分。其实就是 pc 版本的评分组件如图：![alt text](image-125.png)，请确认改组件是否支持选择评分。pc 版本这个地方也需要支持选择评分


## Task：post-detail.html页面的手机版和 pc 版需要修改
状态：未完成
### 任务内容
顶部如图的部分![alt text](image-126.png)，点击后，需要跳转到blog.html页面


## Task：store-detail.html页面的 pc 版需要修改
状态：未完成
### 任务内容
![alt text](image-127.png)如图的部分中，see more 按钮的功能是点击后展开上面 2 行展示不下的内容。请帮我修改：![alt text](image-128.png)如图的文本，内容增加一倍，最多按 2 行展示，超出的部分展示成...，点击 see more 后，展示完整的文本，并且 see more 按钮隐藏


## Task：compaign-detail.html页面的 pc 版需要修改
状态：未完成
### 任务内容
如图![alt text](image-130.png)部分的 item 中的标签，即如图![alt text](image-131.png)的部分，需要参考![alt text](image-132.png)中的标签来修改，我希望直接复用![alt text](image-133.png)中的标签


## Task：demand-detail.html页面的 pc 版需要修改
状态：未完成
### 任务内容
![alt text](image-134.png)，请看如图右侧的红线，顶部的内容在悬停后，最右侧的部分，我希望能够和下面的内容对齐，也就是最右上角的![alt text](image-135.png)如图的部分，需要和下面的 item（如图![alt text](image-136.png)） 的右侧对齐


## Task：search-all.html页面的 pc 版需要修改
状态：未完成
### 任务内容
任意一种的 item，都需要展示一个，比如选择了items，只需要第一个如图![alt text](image-137.png)的 item，选择Campaigns 只需要第一个如图 ![alt text](image-138.png)的 item，选择其他的分类也以此类推。选择 all 的时候，只需要各个类型的 item 展示一个就行了。另外这个部分的修改，不能影响到移动端（移动端已经调整好了）


## Task：search-all.html页面的 pc 版需要修改
状态：未完成
### 任务内容
Items 分类的 item，如图![alt text](image-139.png)。其中的 Hot 标签，和标题需要在同一行。需要始终在标题第一行的前面。另外收藏和取消收藏按钮，位置需要调整到和标题第一行纵向居中对齐的位置（标题目前最多显示 2 行的，需要改成标题只占一行，展示不下的以...展示），另外收藏按钮需要向左移动一些，不能遮挡右上角的标签。另外标题的展示，不能和收藏按钮重合，只能在收藏按钮的左边（最小间距为 20px）

## Task：search-all.html页面的 pc 版需要修改
状态：未完成
### 任务内容
Campaigns 分类的 item，如图![alt text](image-140.png)。其中的 AD 标签，和标题需要在同一行。需要始终在标题第一行的前面。另外收藏和取消收藏按钮，位置需要调整到和标题第一行纵向居中对齐的位置（标题目前最多显示 2 行的，需要改成标题只占一行，展示不下的以...展示），另外收藏按钮需要向左移动一些，不能遮挡右上角的标签。另外标题的展示，不能和收藏按钮重合，只能在收藏按钮的左边（最小间距为 20px）

## Task：search-all.html页面的 pc 版需要修改
状态：未完成
### 任务内容
Posts 分类的 item，如图![alt text](image-141.png)。收藏和取消收藏按钮，位置需要调整到和标题第一行纵向居中对齐的位置（标题目前最多显示 2 行的，需要改成标题只占一行，展示不下的以...展示），另外收藏按钮需要向左移动一些，不能遮挡右上角的标签。另外标题的展示，不能和收藏按钮重合，只能在收藏按钮的左边（最小间距为 20px）

## Task：search-all.html页面的 pc 版需要修改
状态：未完成
### 任务内容
Stores 分类的 item，如图![alt text](image-142.png)。收藏和取消收藏按钮，位置需要调整到和标题第一行纵向居中对齐的位置（标题目前最多显示 2 行的，需要改成标题只占一行，展示不下的以...展示），另外收藏按钮需要向左移动一些，不能遮挡右上角的标签。另外标题的展示，不能和收藏按钮重合，只能在收藏按钮的左边（最小间距为 20px）

## Task：search-all.html页面的 pc 版需要修改
状态：未完成
### 任务内容
Demands 分类的 item，如图![alt text](image-143.png)。收藏和取消收藏按钮，位置需要调整到和标题第一行纵向居中对齐的位置（标题目前最多显示 2 行的，需要改成标题只占一行，展示不下的以...展示），另外收藏按钮需要向左移动一些，不能遮挡右上角的标签。另外标题的展示，不能和收藏按钮重合，只能在收藏按钮的左边（最小间距为 20px）


### Task：补全faq-detail.html页面（检查项目中是否有该文件，没有则需要创建源文件和编译后的文件），包括 pc 版和手机版
状态：未完成
### 任务内容
![alt text](image-144.png)，如图为设计稿的内容，我希望faq-detail.html，header、top-menu、footer 部分都和 index.html 页面一致，其中的页面的内容，请参考设计稿来实现。要求使用项目中的已有组件来实现，比如收藏和取消收藏，比如点赞和点踩需要使用![alt text](image-145.png)![alt text](image-146.png)，比如他分享需要使用![alt text](image-147.png)


### Task：新增brand-service.html页面，需要支持pc版和手机版
状态：未完成
### 任务内容
pc 版 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=732-32628&m=dev，手机版 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=732-32930&m=dev。请按照设计稿来实现。另外我希望，无论 pc 版还是手机版，都需要优先复用现有组件，来保证样式的统一性。我觉得可以参考 item-all.html 页面，绝大部分都是一样的，可以复用，除了 pc 端的https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=732-32903&m=dev 和移动端的 https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=732-32981&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=732-32992&m=dev，其他都可以复用，复用请复制一份，需要完全不影响 item-all.html 页面（无论手机版还是电脑版都不能影响）


### Task：新增system-post-detail.html页面，需要支持pc版和手机版
状态：未完成
### 任务内容
绝大多数内容和 post-detail.html 是一样的。pc 端的区别有两个：1.顶部的部分，post-detail.html 页面如图![alt text](image-148.png)，而system-post-detail.html页面如图：![alt text](image-149.png) 2.post-detail.html 页面的锚点组件在右侧，而system-post-detail.html页面的锚点组件在左侧；手机端有 1 个区别：post-detail.html 的头部如图![alt text](image-150.png)，而system-post-detail.html页面的头部如图：![alt text](image-151.png)。请帮我实现。我希望复制一份post-detail.html的代码出来（为了完全不影响post-detail.html页面，无论手机版还是电脑版都不能影响）

### Task：index.html页面的pc版和手机版都需要进行修改
状态：未完成
### 任务内容
需要完善购买流程：在已登录的情况下，点击 Best Items 的 buy now 按钮，需要进入购买流程（目前无论登录没登录，点击以后都展示登录弹框，需要修改）。购买流程如下：pc 端：![alt text](image-152.png)，手机端：![alt text](image-153.png)，pc 端是以弹框的形式呈现，手机端是以新页面的形式呈现（手机端流程走完，需要回到 index.html 页面），一下是 figmg 设计稿，请按照设计稿 1：1 还原，pc 端：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78158&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=4151-81393&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=4151-83592&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=4151-83819&m=dev；手机端：
https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78110&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78196&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78196&m=dev

### Task：检查 search-all 中的 item。标题和内容的间距
状态：未完成
### 任务内容
提醒用户，检查 search-all 中的 item。标题和内容的间距，无需修改任何代码
