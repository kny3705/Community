<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div>
	<div><a href="/user/login">Go To Login</a></div>
	
	<form id="form">
		<div><input type="text" name="idField" placeholder="ID"><input type="button" value="중복체크" id="chkIdBtn"></div> <!-- required 써도 됨 - 자바스크립트 연습 -->
		<div id="idChkMsg"></div>
		<div><input type="password" name="pwField" placeholder="PASSWORD"></div>
		<div><input type="password" name="pwCheckField" placeholder="COMFIRM PASSWORD"></div>
		<div><input type="text" name="nmField" placeholder="NAME"></div>
		<div>Gender : 
			<label>Woman<input type="radio" name="genderField" value="0" checked></label>
			<label>Man<input type="radio" name="genderField" value="1"></label>
		</div>
		<div><input type="button" value="Join" id="joinBtn"></div>
	</form>
</div>