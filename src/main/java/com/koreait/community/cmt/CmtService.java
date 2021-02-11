package com.koreait.community.cmt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.koreait.community.model.CmtDomain;
import com.koreait.community.model.CmtEntity;

@Service
public class CmtService {
	@Autowired
	private CmtMapper mapper;
	
	public int insCmt(CmtEntity p) {
		return mapper.insCmt(p);
	}
	
	public List<CmtDomain> selCmtList(CmtEntity p) {
		return mapper.selCmtList(p);
	}
	
	public int updCmt(CmtEntity p) {
		return mapper.updCmt(p);
	}
	
	public int delCmt(CmtEntity p) {
		return mapper.delCmt(p);
	}
}
