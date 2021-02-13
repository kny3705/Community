package com.koreait.community.user;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.koreait.community.Const;
import com.koreait.community.SecurityUtils;
import com.koreait.community.model.UserEntity;

@Service
public class UserService {
	
	@Autowired
	private UserMapper mapper;
	
	@Autowired
	private SecurityUtils sUtils;
	
	//1:회원가입성공, 0:실패
	public int join(UserEntity p) {
		if(p.getUserId() == null || p.getUserId().length() < 2 || chkId(p)==1) {
			return 0;
		}
		//비밀번호 암호화
		String salt = sUtils.getSalt();
		String hashPw = sUtils.getHashPw(p.getUserPw(), salt);
		p.setSalt(salt);
		p.setUserPw(hashPw);
		return mapper.insUser(p);
	}
	
	//1:로그인 성공, 2:아이디 없음, 3:비밀번호가 틀림
	public int login(UserEntity p, HttpSession hs) {
		UserEntity dbData = mapper.selUser(p);
		if(dbData == null) { 
			return 2;
		}
		
		//sUtils.getSalt();를 하게되면 완전히 새로운 것을 가져 온다
		//그러므로 db에 있는 같은 salt를 사용하여야 함
		String salt = dbData.getSalt();
		String hashPw = sUtils.getHashPw(p.getUserPw(), salt);
		if(!hashPw.equals(dbData.getUserPw())) {
			return 3;
		}
		dbData.setUserPw(null);
		dbData.setSalt(null);
		dbData.setRegDt(null);
		dbData.setProfileImg(null);
		hs.setAttribute(Const.KEY_LOGINUSER, dbData);
		return 1;
	}

	//1:아이디 있음, 0:아이디 없음
	public int chkId(UserEntity p) {
		UserEntity dbData = mapper.selUser(p);
		if(dbData == null) {
			return 0;
		}
		return 1;
	}
	
	public UserEntity selUser(UserEntity p) {
		return mapper.selUser(p);
	}
	
	public int uploadProfile(MultipartFile mf, HttpSession hs) {
		int userPk = sUtils.getLoginUserPk(hs);
		String profileImg = "user/" + userPk;
		String basePath = hs.getServletContext().getRealPath("/res/img/" + profileImg);
		File folder = new File(basePath);
		if(!folder.exists()) {
			folder.mkdirs();
		}
		String originalFileName = mf.getOriginalFilename();
		String ext = FilenameUtils.getExtension(originalFileName);
		String fileNm = UUID.randomUUID().toString() + "." + ext;
		profileImg += "/" + fileNm;
		try {
			byte[] fileData = mf.getBytes();
			File target = new File(basePath + "/" + fileNm);
			FileCopyUtils.copy(fileData, target);
		} catch (IOException e) {
			e.printStackTrace();
			return 0;
		}
		
		UserEntity p = new UserEntity();
		p.setUserPk(userPk);
		p.setProfileImg(profileImg);
		
		return mapper.updUser(p);
	}
}
