
var list = document.querySelectorAll('.list-item')

list.forEach(item => {
		item.addEventListener('click', function() {
			var { pk } = this.dataset
			location.href = `/board/detail?boardPk=${pk}`
		})
	}
)