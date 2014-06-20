!function($, document) {
function add(text) {
	return dialog({
		title: '待完成'
		, content: text
		, width: 300
		, lock: false
		, drag: true
		, ok: {text:'搞定', callback: function() {
			this.title('已完成')
			this.$el.find('.mod-dialog-bottom').hide()
			return false
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

$(document).dblclick(function(){
	var text = prompt('请输入便签内容：')
	if (text) {
		add(text)
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