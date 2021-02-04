init()

function init() {
	var checkIdBtn = document.querySelector('#chkIdBtn')
	
	if(checkIdBtn) {
		checkIdBtn.addEventListener('click', checkId)
	}
	
	var joinBtn = document.querySelector('#joinBtn')
	if(joinBtn) joinBtn.addEventListener('click', join)
	
	var loginBtn = document.querySelector('#loginBtn')
	if(loginBtn) loginBtn.addEventListener('click', login)
}

function checkEmpty(el, field) {
	if(el.value) return false
	
	alert(`${field}을(를) 입력해 주세요.`)
	el.focus()
	return true
}

function checkId() {
	console.log(".1111")
	var form = document.querySelector('#form')
	var { idField } = form
	
	if(checkEmpty(idField, '아이디')) return
	
	ajax()
	
	function ajax() {
		fetch(`/user/chkId/${idField.value}`)
			.then(res => res.json())
			.then(json => proc(json))
	}
	
	function proc(json) {
		var msgField = form.querySelector('#idChkMsg')
		console.log(json.result)
		if(json.result === 1) {
			msgField.innerText = '중복된 아이디가 있습니다.';
		} else {
			msgField.innerText = '사용할 수 있는 아이디 입니다.'
		}
	}
}

function getPostInit(param) {
	return {
		method: 'post',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(param)
	}
}

function join() {
	var form = document.querySelector('#form')
	
	var { idField, pwField, pwCheckField, nmField, genderField } = form
	
	if (checkEmpty(idField, '아이디')
		|| checkEmpty(pwField, '비밀번호')
		|| checkEmpty(nmField, '이름')) return
	
	if(pwField.value !== pwCheckField.value) {
		alert('비밀번호를 확인해 주세요.')
		pwField.focus()
		return
	}
	
	ajax()
	
	function ajax() {
		var param = {
			userId: idField.value,
			userPw: pwField.value,
			nm: nmField.value,
			gender: genderField.value
		}
		
		fetch('/user/join', getPostInit(param))
			.then(res => res.json())
			.then(json => proc(json))
	}
	
	/* processing */
	function proc(json) {
		if(json.result === 0) {
			alert('회원가입에 실패 하였습니다.')
			return
		}
		alert('회원가입을 축하 합니다.')
		location.href = "/user/login"
	}
}

function login() {
	var form = document.querySelector('#form')
	
	var { idField, pwField } = form
	
	if(checkEmpty(idField, '아이디') || checkEmpty(pwField, '비밀번호')) return
	
	ajax()
	
	function ajax() {
		var param = { 
			userId: idField.value,
			userPw: pwField.value
			}
		
		fetch('/user/login', getPostInit(param))
			.then(res => res.json())
			.then(json => proc(json))
	}
	
	function proc(json) {
		switch(json.result) {
			case 1:
				location.href = "/board/home"
				return
			case 2:
				alert('가입되지 않은 아이디 입니다.')
				return
			case 3:
				alert('비밀번호를 확인해 주세요.')
				return
		}
	}
}