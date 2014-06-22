!function($, document) {
function add(text) {
	return dialog({
		title: '待完成'
		, content: text
		, width: 300
		, lock: false
		, drag: true
		, ok: {text:'搞定', callback: function() {
			var self = this
			
			self.title('已完成')
			self.$el.find('.mod-dialog-bottom').hide()
			
			// 完成
			$.post('complete', {id: self.todo_id})
			.success(function(data) {
				if ( data.error ) {
					alert(data.messages)
				}
			})
			
			return false
		}}
		, cancel: {text:'取消', callback: function() {
			var self = this
			
			// 删除
			$.post('delete', {id: self.todo_id})
			.success(function(data) {
				if ( data.error ) {
					alert(data.messages)
				}
			})
		}}
		, movedown: function(){
			// 移动
			var self = this
			var point = self.$el.offset()
			$.post('move', {id: self.todo_id, point: point.left+','+point.top})
			.success(function(data) {
				if ( data.error ) {
					alert(data.messages)
				}
			})
		}
		, style: {
			'dialog': {'box-shadow': '5px 5px 20px #666'}
			, 'title': {'font-weight': 'bold', cursor: 'default'}
			, 'content': {'font-size': '14px'}
			, 'bottom': {}
			, 'close': {}
			, 'ok': {'color':'green'}
			, 'cancel': {'display':'none'}
		}
	})
}

window.Todo = {
	add: add
}

// 添加
$(document).dblclick(function(){
	var title = prompt('请输入便签内容：')
	
	if (title) {
		
		// 添加
		$.post('todos', {title: title})
		.success(function(data) {
			var dialog
			if ( data.error ) {
				alert(data.messages)
			} else {
				dialog = add(title)
				dialog.todo_id = data.todo_id
			}
		})
	}
})

// 显示 todo 列表
$.get('todos')
.success(function(list) {
	// 将 todo 列表，以弹窗形式显示在页面上
	$(list).each(function(i, item){
		var dialog = Todo.add(item.title)
		dialog.todo_id = item.id
		
		if (item.completed) {
			dialog.title('已完成')
			dialog.$el.find('.mod-dialog-bottom').hide()
		}
		// 设置一个位置
		item.point = item.point || '0,0'
		var arr = item.point.split(',')
		dialog.$el.css({margin:0, left: parseInt(arr[0]), top: parseInt(arr[1])})
	})
})
}(jQuery, document)