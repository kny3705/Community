<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div>
	<form action="/board/write" method="post">
		<input type="hidden" name="category" value="${param.category}">
		<input type="hidden" name="boardPk" value="0">
		<div><input type="text" name="title" placeholder="TITLE" required></div>
		<div><textarea name="ctnt" placeholder="CONTENT" required></textarea></div>
		<div><input type="submit" value="SUBMIT"></div>
	</form>
</div>