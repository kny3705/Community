package com.koreait.community.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.koreait.community.model.BoardDTO;
import com.koreait.community.model.BoardDomain;
import com.koreait.community.model.BoardEntity;

@Service
public class BoardService {
	
	@Autowired
	private BoardMapper mapper;
	
	public int insBoard(BoardEntity p) {
		return mapper.insBoard(p);
	}
	
	public List<BoardDomain> selBoardList(BoardDTO p) {
		return mapper.selBoardList(p);
	}
}
