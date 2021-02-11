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
var cmtForm = document.querySelector('#cmtForm') //댓글 리스트 위치

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
var cmtList = document.querySelector('#cmtList')	//댓글 리스트 위치
var modal = document.querySelector('#modal')
var modCtnt = document.querySelector('#modCtnt') //수정내용
var modBtn = document.querySelector('#modBtn') 	 //수정버튼

if(modal) {
	//모달 닫기 버튼
	var modalClose = document.querySelector('#modClose')
	modalClose.addEventListener('click', function () {
		modal.classList.add('hide')
	})
}

function selCmtList() {
	fetch(`/cmt?boardPk=${data.dataset.pk}`)
	.then(res => res.json())
	.then(json => {
		clearView()
		createView(json)
	})
	
	function clearView() {
		cmtList.innerHTML = ''
	}
	
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
	function createRecord(item) {	//한 줄 레코드 만드는 함수
		var tr = document.createElement('tr')
		var td_1 = document.createElement('td')
		var td_2 = document.createElement('td')
		var td_3 = document.createElement('td')
		
		td_1.innerText = item.ctnt
		td_2.innerText = item.writerNm
		
		//자신이 쓴 댓글이라면 삭제, 수정버튼 추가
		var loginUserPk = parseInt(data.dataset.loginuserpk)
		if(loginUserPk === item.writerPk) {
			//delete
			function delAjax() {
				fetch(`/cmt?boardPk=${item.boardPk}&seq=${item.seq}`, {
					method: 'delete'
				}).then(res => res.json())
				.then(json => {
					if(json === 1) {
						selCmtList()
					} else {
						alert('삭제를 실패하였습니다.')
					}
				})
			}
			
			//update
			function modAjax(param) {
				fetch('/cmt', {
					method: 'put',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(param)
				}).then(res => res.json())
				.then(json => {
					if(json === 1) {
						modal.classList.add('hide')
						selCmtList()
					} else {
						alert('수정을 실패하였습니다.')
					}
				})
			}
			
			var delBtn = document.createElement('input')
			delBtn.type = 'button'
			delBtn.value = '삭제'
			delBtn.addEventListener('click', function() {
				if(confirm('삭제 하시겠습니까?')) {
					delAjax()
				}
			})
			
			var editBtn = document.createElement('input')
			editBtn.type = 'button'
			editBtn.value = '수정'
			editBtn.addEventListener('click', function() {
				modCtnt.value = item.ctnt
				modal.classList.remove('hide')
				
				modBtn.onclick = function() {
					var param = {
						boardPk: item.boardPk,
						seq: item.seq,
						ctnt: modCtnt.value
					}
					modAjax(param)
				}
			})
			
			td_3.append(delBtn)
			td_3.append(editBtn)
		}
		
		
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