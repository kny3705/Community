<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div>
	<a href="/board/list?category=${requestScope.data.category}">리스트로 돌아가기</a>
</div>
<c:if test="${sessionScope.loginUser.userPk == requestScope.data.userPk}">
	<div>
		<button>수정</button>
		<button id="delBtn">삭제</button>
	</div>
</c:if>
<div id="data" data-pk="${requestScope.data.boardPk}" data-category="${requestScope.data.category}">
	<div>글번호 : ${requestScope.data.seq}</div>
	<div>조회수 : ${requestScope.data.hits}</div>
	<div>제목 : <c:out value="${requestScope.data.title}"/></div>
	<div>작성일 : <c:out value="${requestScope.data.regDt}"/></div>
	<div>작성자 : <c:out value="${requestScope.data.writerNm}"/></div>
	<div><c:out value="${requestScope.data.ctnt}"/></div>
</div>

<script src="/res/js/board/detail.js"></script>