package edu.kh.laf.board.model.service;

import java.util.List;

import edu.kh.laf.board.model.dto.Qna;

public interface QnaService {

	/** qna 목록 전체 검색
	 * @return
	 */
	List<Qna> qnaList();

	
	
	
	
	/** qna 상세정보 조회
	 * @param no
	 * @return
	 */
	Qna detailQna(String no);





	/** qna 상세정보 삭제
	 * @param qnaNo
	 * @return
	 */
	int deleteQna(String qnaNo);


}
