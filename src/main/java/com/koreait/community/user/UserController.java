package com.koreait.community.user;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.koreait.community.Const;
import com.koreait.community.SecurityUtils;
import com.koreait.community.model.UserEntity;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService service;
	
	@Autowired
	private SecurityUtils sUtils;
	
	@GetMapping("/login")
	public void login() {
		//옛날 방식
		//Model model, @RequestParam(required = false, defaultValue="0")int err
		//required = false를 안주면 err를 무조건 줘야함
	}
	
	@ResponseBody
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody UserEntity p, HttpSession hs) {
		System.out.println("id : " + p.getUserId());
		System.out.println("pw : " + p.getUserPw());
		
		Map<String, Object> returnValue = new HashMap<>();
		returnValue.put("result", service.login(p, hs));
		
		return returnValue;
	}
	
	@GetMapping("/logout")
	public String logout(HttpSession hs) {
		hs.invalidate();
		return "redirect:/user/login";
	}
	
	@GetMapping("/join")
	public void join() {}
	
	@ResponseBody
	@PostMapping("/join")
	public Map<String, Object> join(@RequestBody UserEntity p) {
		Map<String, Object> returnValue = new HashMap<>();
		returnValue.put("result", service.join(p));
		return returnValue;
	}
	
	@ResponseBody
	@GetMapping("/chkId/{userId}")
	public Map<String, Object> chkId(UserEntity p) {
		System.out.println("userId : " + p.getUserId());
		Map<String, Object> returnValue = new HashMap<>();
		returnValue.put("result", service.chkId(p));
		return returnValue;
	}
	
	@GetMapping("/profile")
	public void profile(Model model, UserEntity p, HttpSession hs) {
		p.setUserPk(sUtils.getLoginUserPk(hs));
		model.addAttribute(Const.KEY_DATA, service.selUser(p));
	}
	
	@ResponseBody
	@PostMapping("/profile")
	public int profile(MultipartFile profileImg, HttpSession hs) {
		return service.uploadProfile(profileImg, hs);
	}
}
