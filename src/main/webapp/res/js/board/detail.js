var data = document.querySelector('#data')
var delBtn = document.querySelector('#delBtn')
if(delBtn) {
	delBtn.addEventListener('click', function() {
		if(confirm('게시글을 삭제 하시겠습니까?')) {
			ajax()
		}
	})
	
	function ajax() {
		var { pk, category } = data.dataset
		
		fetch(`/board/del/${pk}`, {
			method: 'delete'
		})
		.then(() => {
			location.href = `/board/list?category=${category}`
		})
	}
}