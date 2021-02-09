//---------- [Board] ----------
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

//---------- [Comment] ----------
//insert
var cmtForm = document.querySelector('#cmtForm')

if(cmtForm) {
	var btn = cmtForm.btn
	btn.addEventListener('click', ajax)
	
	function ajax() {
		var ctntVal = cmtForm.ctnt.value
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
				if(json === 1) {
					selCmtList()
				} else {
					alert('댓글 등록에 실패하였습니다.')
				}
			})
		})
	}
}

//select
var cmtList = document.querySelector('#cmtList')

function selCmtList() {
	fetch(`/cmt?boardPk=${data.dataset.pk}`)
	.then(res => res.json())
	.then(json => {
		console.log(json)
		createView(json)
	})
	
	function createView(json) {
		if(json.length === 0) {
			return
		}
		
		var table = createTable()
		json.forEach(function(item) {
			table.append(createRecord(item))
		})
		
		cmtList.append(table)
	}
	function createRecord(item) {
		var tr = document.createElement('tr')
		var td_1 = document.createElement('td')
		var td_2 = document.createElement('td')
		var td_3 = document.createElement('td')
		
		td_1.innerText = item.ctnt
		td_2.innerText = item.writerNm
		
		tr.append(td_1)
		tr.append(td_2)
		tr.append(td_3)
		
		return tr
	}
	function createTable() {
	var table =document.createElement('table')
	table.innerHTML = `
	<tr>
		<th>내용</th>
		<th>작성자</th>
		<th>비고</th>
	</tr>
	`
	return table
	}
}
selCmtList()