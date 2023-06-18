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





	/** qna writeQna
	 * @param qna
	 * @return
	 */
	int writeQna(Qna qna);





	/** 비밀글 비밀번호 유효성 검사
	 * @param qna
	 * @return
	 */
	Qna confirmLockNo(Qna qna);





	/** qna 수정하기
	 * @param qna
	 * @return
	 */
	int updateQna(Qna qna);





	/** qna 답변달기
	 * @param qna
	 * @return
	 */
	int answerQna(Qna qna);


}
