package edu.kh.laf.member.model.mapper;

import edu.kh.laf.member.model.dto.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
	
	
    Member selectMember(long id);
    
	/** 로그인
	 * @param inputMember
	 * @return loginMember
	 */
	Member login(Member inputMember);

	/** 회원 가입 서비스
	 * @param inputMember
	 * @return result
	 */
	int signUp(Member inputMember);

	/** 아이디 중복 검사
	 * @param memberId
	 * @return result
	 */
	int checkId(String memberId);

	/** 이메일 중복 검사
	 * @param email
	 * @return result
	 */
	int checkEmail(String email);
}
