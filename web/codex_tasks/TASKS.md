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



## Task：index.html页面中，购物流程的 pc 版需要修改
状态：已完成
### 任务内容
![alt text](image-192.png)如图是实际运行的效果，其中![alt text](image-193.png)的颜色，需要参考设计稿修改：figma：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78183&m=dev


## Task：index.html页面中，购物流程的 pc 版需要修改
状态：已完成
### 任务内容
![alt text](image-192.png)如图是实际运行的效果，其中![alt text](image-194.png)的样式，需要参考设计稿修改：figma：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78186&m=dev


## Task：index.html页面中，购物流程的 pc 版需要修改
状态：已完成
### 任务内容
![alt text](image-192.png)如图是实际运行的效果，其中Accept & Buy按钮的宽度，需要根据 figma 设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78195&m=dev


## Task：index.html页面中，购物流程的 pc 版需要修改
状态：已完成
### 任务内容
![alt text](image-195.png)如图是实际运行的效果，其中![alt text](image-196.png)需要参考 figma 设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=4151-81329&m=dev


## Task：index.html页面中，购物流程的 pc 版需要修改
状态：已完成
### 任务内容
![alt text](image-197.png)如图是实际运行的效果，其中view 按钮和 download 按钮的样式，需要参考 figma 设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=4151-83795&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=4151-83796&m=dev


## Task：index.html页面中，购物流程的 手机版需要修改
状态：已完成
### 任务内容
![alt text](image-198.png)如图是实际运行的效果，其中的view 按钮和 download 按钮的样式，需要参考 figma 设计稿修改：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78262&m=dev、https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1902-78263&m=dev


## Task：index.html页面中，购物流程的手机版需要修改
状态：已完成
### 任务内容
现在的手机版购物流程，相较于 pc 端，是缺少了一步的，我希望和 pc 端对齐。缺少的那一步，没有对应的 ui 设计稿，请根据现有的手机版购物流程的风格，来实现缺少的那一步


## Task：index.html页面中，购物流程的手机版和 pc 版需要修改
状态：已完成
### 任务内容
购物流程中，有上传图片和文件的部分，就是类似图片：![alt text](image-199.png)的地方，需要支持图片和文件的上传，图片上传以后，点击图片需要可以放大查看。文件则不需要，只需要展示文件名称。


## Task：store-detail.html的手机版和 pc 版需要修改
状态：待完善
### 任务内容
![alt text](image-201.png)这是 pc 版本的样式的截图，其中有红线，这个部分，其中图表的部分，右侧需要对齐 Products:4.3 的右侧，即对齐图中的红线。![alt text](image-202.png)这是手机版的样式的截图，其中有红线，这个部分，其中图表的部分，右侧需要对齐 Products:4.3 的右侧，即对齐图中的红线


## Task：compaign-detail.html的手机版需要修改
状态：已完成
### 任务内容
其中的如图的部分![alt text](image-203.png)和![alt text](image-204.png)，两个 item组件，其中的 BUY NOW 按钮，右侧需要和收藏组件的右侧对齐


## Task：demand-all.html的手机版需要修改
状态：已完成
### 任务内容
这个页面，Vertical 模式和 Horizontal 模式的 item，即如图![alt text](image-205.png)和![alt text](image-206.png)，其中的字体都需要放大，参考index.html 中 Popular demands 的 item 的字体进行修改


## Task：attribute-all.html的手机版需要修改
状态：已完成
### 任务内容
![alt text](image-207.png)如图的部分，![alt text](image-208.png)和![alt text](image-209.png)需要调换位置，即修改后，模式切换组件和筛选按钮在同一行纵向居中对齐。修改完成后，需要修改模式切换组件的宽度，需要撑满剩余宽度


## Task：tag-all.html的手机版需要修改
状态：已完成
### 任务内容
![alt text](image-210.png)如图的部分，![alt text](image-211.png)和![alt text](image-212.png)需要调换位置，即修改后，模式切换组件和筛选按钮在同一行纵向居中对齐。修改完成后，需要修改模式切换组件的宽度，需要撑满剩余宽度



## Task：resource-detail.html的手机版需要修改
状态：已完成
### 任务内容
![alt text](image-213.png)如图的部分，不能换行，需要在同一行显示



## Task：resource-detail.html的手机版和 pc 版需要修改
状态：已完成
### 任务内容
![alt text](image-214.png)如图的部分，pc 和手机版都需要修改，，点击以后需要有选中和取消选中效果，参考 item-detail.html 页面的 Reviews 部分的![alt text](image-215.png)来做，直接拷贝过来就行


## Task：brand-all.html的 pc 版需要修改
状态：已完成
### 任务内容
左侧的锚点组件部分，如图![alt text](image-216.png)，在页面滚动到最底部时，因为 footer 的出现，锚点组件被挤压，如图![alt text](image-217.png)，我希望footer 的出现不要挤压锚点组件，而是让锚点组件顺势往上滚动，即使顶部滚动到看不见也没关系


## Task：brand-all.html的手机版需要修改
状态：已完成
### 任务内容
![alt text](image-218.png)，锚点组件，需要铺满整个可用高度，即等比例占满整个高度


## Task：header 组件的登录后的样式， pc 版需要修改
状态：已完成
### 任务内容
登录成功后，右上角会有这么个图标![alt text](image-219.png)，我希望把这个图标去掉，其他内容的布局不要发生改变，仅仅是去掉这个图标。因为 header 是通用组件，我希望修改后，整个项目中的 header 都是修改后的效果


## Task：header 组件的登录后的样式， pc 版需要修改
状态：已完成
### 任务内容
登录成功后，点击最右上角的![alt text](image-221.png)会出现如图![alt text](image-220.png)的浮窗，这个浮窗顶部需要修改：需要在![alt text](image-223.png)之下，增加如图的内容![alt text](image-222.png)，字体和图标需要和邮箱字体一致。其中所需要的图片，可以从手机版本登录后点击头像跳转的页面中获取


## Task：index.html 的手机版需要修改 
状态：已完成
### 任务内容
Best items 中第三个 item 的 Buy Now 按钮，需要展示成可以点击的样式，因为现在点击后是会触发登录弹框或者触发购买流程，但是样式上看起来像是不可以点击的，请看看有没有可以点击的样式，如果没有，请做成红框白色背景红字，类似![alt text](image-225.png)的样子，请注意仅仅需要修改样式，大小布局等等所有都不需要修改也不允许修改


## Task：faq-detail.html 的pc版需要修改 
状态：未完成
### 任务内容
![alt text](image-226.png)，如图，header 部分，位置不对，从页面的最左侧开始展示了，应该和其他页面一样，参考 index.html 页面的 header 修改。另外我想问下，这难道用的不是全局的 header 组件吗？按理说需要和 index.html 中用的是相同的 header 组件，位置、内容所有细节，应该和 index.html 中是完全一样的


## Task：需要新增一个 faq-list页面 
状态：未完成
### 任务内容
请新增一个 faq-list 页面，header、top-menu、footer 都和 index.html 是一样的，可以直接复用组件，并且样式需要一模一样。然后其中的内容部分，则是一个列表，列表的 item 如图：![alt text](image-227.png)，这个图片是项目运行的截图，也就是说，项目中已经有这个代码了，我需要你找到代码然后复用，我不确定之前有没有封装成组件，如果有责直接复用组件，如果没有则封装成组件然后复用。该页面需要适配手机版和 pc 版本
