package edu.kh.laf.mypage.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.laf.board.model.dto.Qna;
import edu.kh.laf.board.model.dto.Review;
import edu.kh.laf.mypage.model.mapper.MypageMapper;
import edu.kh.laf.mypage.model.mapper.MypageReviewMapper;

@Service
public class MypageReviewServiceImpl implements MypageReviewService {
	@Autowired
	private MypageReviewMapper mapper;

	/** 내 리뷰 조회
	 *
	 */
	@Override
	public List<Review> myReview(Long memberNo) {
		return mapper.myReview(memberNo);
	}


	
	

}
