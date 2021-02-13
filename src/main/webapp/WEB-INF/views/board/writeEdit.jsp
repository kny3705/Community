<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div>
	<form action="/board/${requestScope.data == null ? 'write' : 'edit'}" method="post">
		<input type="hidden" name="category" value="${param.category}">
		<input type="hidden" name="boardPk" value="${requestScope.data == null ? '0' : requestScope.data.boardPk}">
		<div>
		<input type="text" name="title" placeholder="TITLE" required value="${requestScope.data.title}">
		</div>
		<div><textarea name="ctnt" placeholder="CONTENT" required>${requestScope.data.ctnt}</textarea></div>
		<div><input type="submit" value="${requestScope.data == null ? 'WRITE' : 'EDIT'}"></div>
	</form>
</div>