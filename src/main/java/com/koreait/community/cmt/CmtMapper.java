package com.koreait.community.cmt;

import org.apache.ibatis.annotations.Mapper;

import com.koreait.community.model.CmtEntity;

@Mapper
public interface CmtMapper {
	int insCmt(CmtEntity p);
}
