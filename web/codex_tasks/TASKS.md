# 网站改版任务列表

## 执行规则

1. 一次只执行一个任务。
2. 每个任务执行完成后，diff 总结回复给我，我会确认任务是否完成，如果有问题我会继续让你修改，如果我确认完成，请把本文件中对应的任务状态标记为已完成，然后把本次任务的 diff 总结，以 markdown 格式记录到./tasks_record/下，然后使用 git 命令，把内容进行提交并 push。
3. 每个任务完成后不要直接做下一个任务，除非我明确要求继续。
4. 以下所有任务中，如果没有特殊说明，都是修改手机版本，不允许影响到 pc 版本。
5. 每一轮修改结束后（只是你的修改结束，并不是指任务完成，任务完成需要我来确认），除非任务中有明确说明使用 chrome mcp，否则都不需要调用 chrome mcp 确认效果，我会自己确认，修改完成后即可向我汇报，我会确认是否修改完成。
6. 修改结束后，都需要告诉我，任务的内容是什么，修改的页面是哪个，比如 index.html，然后调用脚本/Users/xiexianbin/bin/feishu_private.sh来发送消息通知
7. 如果任务中有 figma 的链接，请使用 figma mcp 读取链接的设计信息

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
状态：未完成
### 任务内容
该页面的 pc 版本，右侧是有一个锚点模块的（如图![alt text](image-16.png)），但是切换成手机版以后这个部分就不见了。移动版也需要这个锚点组件的。移动端这样修改：在页面上有一个浮动按钮如图![alt text](image-17.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=852-28733&m=dev，点击按钮以后从右侧出现锚点组件如图![alt text](image-18.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=997-36993&m=dev，请使用 figma mcp 读取设计稿的内容后修改，修改完成后，请调用 chrome mcp 来确认修改效果，确认和 figma 设计比已经很还原了才算修改结束

## Task：post-detail.html的手机版需要修改
状态：未完成
### 任务内容
Reviews 模块中，如图的部分![alt text](image-19.png)，其中的评分组件需要使用一颗星的评分组件（如图![alt text](image-20.png)），对应的设计稿为：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=852-28674&m=dev。请先确认项目中是否已经有该组件，如果有请直接使用，如果没有，请封装一个组件，然后应用到这里

## Task：post-detail.html的手机版需要修改
状态：未完成
### 任务内容
Reviews 模块中，如图的部分![alt text](image-21.png)，需要参考图片![alt text](image-22.png)进行修改。大小、间距、边框样式都需要修改，1：1 还原

## Task：post-detail.html的手机版需要修改
状态：未完成
### 任务内容
Related items 模块中，每一页只需要展示一行，每行展示两个，目前的效果如图![alt text](image-23.png)，需要改成如图![alt text](image-24.png)的效果

## Task：resource-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
如图的部分![alt text](image-25.png)的布局不对，左侧距离边框、距离底部内容的间距都不对，请参考item-all.html的手机版的相同位置进行布局修改

## Task:resource-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
该页面的 pc 版本，左侧是有一个锚点模块的![alt text](image-30.png)，但是切换成手机版以后这个部分就不见了。移动版也需要这个锚点组件的。移动端这样修改：在页面上有一个浮动按钮如图![alt text](image-17.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=852-28733&m=dev，点击按钮以后从右侧出现锚点组件如图![alt text](image-18.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=997-36993&m=dev，请使用 figma mcp 读取设计稿的内容后修改，修改完成后，请调用 chrome mcp 来确认修改效果，确认和 figma 设计比已经很还原了才算修改结束

## Task：resource-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
Other Pages 部分，每一页只需要展示 1 行数据，现在的效果如图![alt text](image-26.png)，应该修改成如图![alt text](image-27.png)的效果

## Task：service.html页面的手机版需要修改
状态：未完成
### 任务内容
如图的部分![alt text](image-28.png)的布局不对，左侧距离边框、距离底部内容的间距都不对，请参考item-all.html的手机版的相同位置进行布局修改

## Task：service.html页面的手机版需要修改
状态：未完成
### 任务内容
该页面的 pc 版本，右侧是有一个锚点模块的![alt text](image-29.png)，但是切换成手机版以后这个部分就不见了。移动版也需要这个锚点组件的。移动端这样修改：在页面上有一个浮动按钮如图![alt text](image-17.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=852-28733&m=dev，点击按钮以后从右侧出现锚点组件如图![alt text](image-18.png)，对应 figma 设计稿：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=997-36993&m=dev，请使用 figma mcp 读取设计稿的内容后修改，修改完成后，请调用 chrome mcp 来确认修改效果，确认和 figma 设计比已经很还原了才算修改结束

## Task：store-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
如图的部分![alt text](image-31.png)的布局不对，左侧距离边框、距离底部内容的间距都不对，请参考item-all.html的手机版的相同位置进行布局修改

## Task：store-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
整个页面的布局，请按照 figma 设计稿进行调整：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=998-42164&m=dev，其中各个模块的内容都已经有了，但是手机版布局乱了，需要按照设计稿的布局进行修改

## Task：demand-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
如图的部分![alt text](image-32.png)的布局不对，左侧距离边框、距离底部内容的间距都不对，请参考item-all.html的手机版的相同位置进行布局修改

## Task：demand-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
列表中的所有 item 中的评分组件，都需要使用单💗的组件。项目中已经有现成的组件可以使用，请使用。另外整个组件的布局（所有组件的布局），仅仅是布局修改，请参考：figma https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1152-44658&m=dev 进行修改，再次强调，仅仅是修改布局


## Task：demand-detail.html页面的手机版需要修改
状态：未完成
### 任务内容
如图的部分，请参考 figma：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1019-39493&m=dev 的设计进行修改，包括样式、间距、布局等等。后面的是选择图片后的效果：https://www.figma.com/design/tSDKDZHIeanGhze3wX8rwx/FASTRESP-NEW?node-id=1158-46145&m=dev，也一并参考修改
