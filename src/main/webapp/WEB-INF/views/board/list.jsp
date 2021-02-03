<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<h1>카테고리 이름</h1>
<div>
<c:if test="${sessionScope.loginUser != null}">
	<a href="/board/write?category=${param.category}">
		<button>글쓰기</button>
	</a>
</c:if>
</div>
<div>
<c:choose>
	<c:when test="${fn:length(requestScope.list) == 0}">
		<div>글이 없습니다.</div>
	</c:when>
	<c:otherwise>
		<table class="basic-table">
			<thead>
				<tr>
					<th>글번호</th>
					<th>제목</th>
					<th>조회수</th>
					<th>작성일</th>
					<th>작성자</th>
				</tr>
			</thead>
			<tbody>
			<c:forEach items="${list}" var="item">
				<tr>
					<td>${item.seq}</td>
					<td>${item.title}</td>
					<td>${item.hits}</td>
					<td>${item.regDt}</td>
					<td>${item.writerNm}</td>
				</tr>
			</c:forEach>
			</tbody>
		</table>
	</c:otherwise>
</c:choose>
</div>
<div>
	페이징
</div>