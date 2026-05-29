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

## Task：post-detail.html页面的手机版需要修改
状态：已完成
### 任务内容
如图![alt text](image-73.png)的部分，Hot 和 Limited time scale 标签，需要放在标题后面。不论标题多长，一行还是两行，都需要跟在标题后面，而不是另起一行

## Task：post-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
![alt text](image-77.png)如图的部分，左右两边距离浏览器边缘的间距不对，我希望左侧改成和这个部分上面的面包屑左侧对齐，右侧的间距等于左侧的间距

## Task：demand-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
如图![alt text](image-75.png)的部分，在页面没有滚动的情况下，背景有一个卡片的样式，但是随着页面滚动，这个部分会悬停在页面顶部，悬停时，就变成了如图：![alt text](image-76.png)，卡片不见了，取而代之的是充满了整个宽度，我希望悬停时，也能够保持和没有滚动时一样的样式（有卡片背景，并且所有的布局间距都不变）

## Task：store-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
![alt text](image-79.png)如图的内容中，其中如图![alt text](image-80.png)的部分，左右两侧，我希望能够和顶部的![alt text](image-81.png)左右对齐。我希望项目中所有的![alt text](image-79.png)这个组件，都能按照上面的要求来修改（所有的地方改完以后都是展示得一模一样）。另外我希望把这整个部分，就是包括顶部的文字，还有下面的柱状图，都封装到一个组件中，然后项目中所有的柱状图，都是用这个组件（需要你找出项目中所有的柱状图组件），我希望所有柱状图的部分，都是相同的样子

## Task：search-all.html页面的手机版需要修改
状态：未完成
### 任务内容
这个页面中，Items tab 的组件中的 buy now 按钮的样式，和Demands tab 的 item 的 buy now 按钮样式不一样，我希望改成一样的，请按照Items tab 的组件中的 buy now 按钮的样式修改。另外我希望项目中所有的 buy now 按钮的样式，都按照 Items tab 的组件中的 buy now 按钮的样式修改

## Task：item-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
![alt text](image-85.png)如图的部分，发货这个部分，位置不对，实际应该靠右，请参考 figma 设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=722-21807&m=dev

## Task：item-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
![alt text](image-86.png)如图的部分，其中的内容的间距不对，纵向每个部分的间距都不对，请参考 figma 设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=722-21806&m=dev

## Task：index.html页面的手机版需要修改
状态：未完成
### 任务内容
如图![alt text](image-87.png)，是 Popular demands 部分的的 item，和设计稿不一样，我需要按照设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=263-1947&m=dev，我希望 1：1 还原，另外我希望改完以后，所有用到这个组件的地方，都是修改后的效果


## Task：index.html页面的手机版需要修改
状态：未完成
### 任务内容
这个页面中的不同模块的 item 中的标签的高度不一致，如图![alt text](image-88.png)、![alt text](image-89.png)、![alt text](image-90.png)，都是不同的大小，我希望这个页面中所有类型的 item，只要包含标签组件的，都按照 figma 设计稿修改https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=263-1968&m=dev，请按照设计稿封装标签组件，然后应用到各个类的的 item 中

## Task：search-all.html页面的手机版需要修改
状态：未完成
### 任务内容
这个页面中，几种 item 中的标签，都不是相同的样式，请复用项目中已有的标签组件，应用到该页面的所有类型的 item 中

## Task：post-detail.html、resource-detail.html等多个页面的手机版需要修改
状态：未完成
### 任务内容
![alt text](image-74.png)如图，锚点页面的左侧，不要有圆角（上下都不需要），另外整个页面的高度，我希望充满整个浏览器高度，上下距离浏览器边缘不要有间距。项目中所有的有锚点页面的地方，都需要进行相同的修改。请检查项目中所有的有锚点的页面（都有共同的特征，都有一个长得一样的浮动按钮，点击以后出现锚点页面）然后进行修改

## Task：post-detail.html页面的手机版或者 pc 版需要修改
状态：未完成
### 任务内容
页面的面包屑，从手机版切换到 pc 版，pc 版的面包屑变成了如图![alt text](image-91.png)，左侧和浏览器的最左侧对齐了，我希望 pc 端面包屑是和 top-menu 部分的左侧对齐的，如图![alt text](image-92.png)。另外有个信息：直接刷新 pc 端页面是正常的，只有从手机版变成 pc 版，位置才会变得不对

## Task：brand-all.html页面，pc 端需要修改修改
状态：未完成
### 任务内容
页面左侧的锚点组件，在浏览器窗口高度足够时，无论滚动或者没有滚动展示效果都如图![alt text](image-72.png)，但是在浏览器窗口不够高时，默认效果如图![alt text](image-71.png)，滚动后如图![alt text](image-72.png)，可以看到默认情况下纵向被压缩了一些，我希望不论任何浏览器高度，滚动和不滚动的效果都是一致的 

## Task：所有 pc 版本的 top-menu 部分需要修改
状态：未完成
### 任务内容
如图![alt text](image-93.png)的浮动菜单中，点击了某一项，比如我点击了 A，需要跳转到brand.html页面。点击所有的选项都是到brand.html页面


## Task：index.html页面的手机版和 pc（电脑）版 都需要修改
状态：未完成
### 任务内容
电脑版中和手机版，Best stores 中的 item 中的标签，点击以后，需要随机跳转到tag-all.html页面或者attribute-all.html页面
