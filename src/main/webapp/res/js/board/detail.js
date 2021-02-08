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

// 댓글
var cmtForm = document.querySelector('#cmtForm')
if(cmtForm) {
	var ctnt = cmtForm.ctnt
	var btn = cmtForm.btn
	btn.addEventListener('click', ajax)
	
	function ajax() {
		var ctntVal = ctnt.value
		if(ctntVal === '') {
			alert('댓글 내용이 없습니다.')
			return
		}
		
		var param = {
			boardPk: data.dataset.pk,
			ctnt: ctntVal
		}
		
		fetch('/cmt', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(param)
		}).then(res => {
			res.json().then(json => {
				console.log(json)
			})
		})
	}
}