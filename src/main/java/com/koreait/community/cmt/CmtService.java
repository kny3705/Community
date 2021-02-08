package com.koreait.community.cmt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.koreait.community.model.CmtEntity;

@Service
public class CmtService {
	@Autowired
	private CmtMapper mapper;
	
	public int insCmt(CmtEntity p) {
		return mapper.insCmt(p);
	}
}
