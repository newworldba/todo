// 显示 todo 列表

!function($, document) {
	var win = $(window)
	var maxWidth = win.width() - 320
	var maxHeight = win.height() - 200

	// 随机数
	function rand(min, max) {
		min = min || 0
		max = max || 99999
		return Math.round(Math.random() * (max - min)) + min
	}

	// 随机点
	function randPoint() {
		return {left: rand(10, maxWidth), top: rand(10, maxHeight)}
	}

	$.get('todos')
	.success(function(list) {
		// 将 todo 列表，以弹窗形式显示在页面上
		$(list).each(function(i, item){
			var dialog = Todo.add(item.title)
			if (item.completed) {
				dialog.ok()
			}
			
			// 设置一个随机位置
			var p = randPoint()
			p.margin = 0
			
			dialog.$el.css(p)
		})
	})

}(jQuery, document)