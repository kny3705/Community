package com.koreait.community.cmt;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.koreait.community.model.CmtDomain;
import com.koreait.community.model.CmtEntity;

@Mapper
public interface CmtMapper {
	int insCmt(CmtEntity p);
	List<CmtDomain> selCmtList(CmtEntity p);
}
