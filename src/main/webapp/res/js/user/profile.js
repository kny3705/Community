var profileImg = document.querySelector('#profileImg')

function profileUpload() {
	if(profileImg.value === '') {
		alert('이미지를 선택해 주세요')
		return
	}
	
	var formData = new FormData();
	formData.append('profileImg', profileImg.files[0])
	
	fetch('/user/profile', {
		method: 'post',
		body: formData
	}).then(res => res.json())
	.then(json => {
		if(json === 1) {
			location.reload()
		} else {
			alert('이미지 업로드에 실패하였습니다.')
		}
	})
}