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
					
			// 保存到服务端
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
			
			// 保存到服务端
			$.post('delete', {id: self.todo_id})
			.success(function(data) {
				if ( data.error ) {
					alert(data.messages)
				}
			})
		}}
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
		
		// 保存到服务端
		$.post('todos', {title: title})
		.success(function(data) {
			if ( data.error ) {
				alert(data.messages)
			} else {
				add(title)
			}
		})
	}
})

dialog({
	title: '提示信息'
	, content: '鼠标双击页面，可以增加便签。'
	, width: 300
	, drag: true
	, ok: {text:'知道了'}
	, style: {
		'dialog': {'box-shadow': '5px 5px 20px #666'}
		, 'title': {'font-weight': 'bold', cursor: 'default'}
		, 'content': {'font-size': '14px'}
		, 'bottom': {}
		, 'close': {}
		, 'cancel': {'display':'none'}
	}
})
}(jQuery, document)