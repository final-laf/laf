SELECT * FROM `member`;

  SELECT   MEMBER_NO, MEMBER_ID, MEMBER_PW, MEMBER_NAME, MEMBER_GENDER, 
    	   MEMBER_AGE, MEMBER_EMAIL, MEMBER_PHONE, MEMBER_BIRTH, MEMBER_GRADE,
    	   DATE_FORMAT(MEMBER_ENROLL_DATE, '%Y년%m월%d일') AS MEMBER_ENROLL_DATE,
    	   MEMBER_DEL_FL, 
    	   DATE_FORMAT(MEMBER_DEL_DATE, '%Y년%m월%d일') AS MEMBER_DEL_DATE,
    	   MEMBER_SOCIAL, MEMBER_POINT,
    	   MEMBER_TOTALPAY, MEMBER_NOT, REFUND_NAME, REFUND_BANK, REFUND_ACCOUNT
  FROM `member`
  WHERE MEMBER_DEL_FL = 'N'
  AND MEMBER_ID = 'admin';	
  
  SELECT   *
  FROM `member`
  WHERE MEMBER_DEL_FL = 'N'
  AND MEMBER_ID = 'admin';	
  
 
 
 INSERT INTO `member` 
 VALUES (NULL, 'user01', 'pass01!', '유저일', NULL, NULL, 
 'user01@kh.or.kr', '01012341234', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, DEFAULT, DEFAULT, DEFAULT, NULL, NULL, NULL);
 
 INSERT INTO `member` 
 VALUES (NULL, 'user02', 'pass02!', '유저이', NULL, NULL, 
 'user02@kh.or.kr', '01043214321', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, 2000, 35000, DEFAULT, NULL, NULL, NULL);
 
 INSERT INTO `member` 
 VALUES (NULL, 'user03', 'pass03!', '유저삼', NULL, NULL, 
 'user03@kh.or.kr', '01055558888', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, 2000, 55000, DEFAULT, NULL, NULL, NULL);
 
 INSERT INTO `member` 
 VALUES (NULL, 'user04', 'pass04!', '유저사', NULL, NULL, 
 'user04@kh.or.kr', '01044444444', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, 5000, 90000, DEFAULT, NULL, NULL, NULL);
 
 INSERT INTO `member` 
 VALUES (NULL, 'user05', 'pass05!', '유저오', NULL, NULL, 
 'user05@kh.or.kr', '01055555555', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, 2000, DEFAULT, DEFAULT, NULL, NULL, NULL);
 
 INSERT INTO `member` 
 VALUES (NULL, 'user06', 'pass06!', '유저육', NULL, NULL, 
 'user06@kh.or.kr', '01066666666', NULL, 2, DEFAULT, 
 DEFAULT, NULL, NULL, 10000, 125000, DEFAULT, NULL, NULL, NULL);

COMMIT;
 

INSERT INTO `member`
VALUES (NULL, 
		'user06', 
		'pass06!', 
		'유저육', 
		NULL, 
		NULL,
		'user06@kh.or.kr', 
		'01066666666', 
		NULL, 
		2, 
		DEFAULT, 
		DEFAULT, 
		NULL, 
		NULL, 
		10000, 
		125000, 
		DEFAULT, 
		NULL, 
		NULL, 
		NULL);



INSERT INTO `member`
VALUES (NULL, 
		'#{memberId}', 
		'#{memberPw}', 
		'#{memberName}', 
		NULL, 
		NULL,
		'#{memberEmail}', 
		01044386606, 
		NULL, 
		2, 
		DEFAULT, 
		DEFAULT, 
		NULL, 
		NULL, 
		10000, 
		125000, 
		DEFAULT, 
		NULL, 
		NULL, 
		NULL);

COMMIT;

	
SELECT COUNT(*) FROM `member`
		WHERE member_id  = 'user01'
		AND member_del_fl  = 'N';




DROP TABLE IF EXISTS `confirm_email`;

CREATE TABLE `confirm_email` (
	`authority_key_no`	bigint	NOT NULL PRIMARY KEY auto_increment	COMMENT '인증 키 번호',
	`authority_key`	varchar(6)	NOT NULL	COMMENT '인증 키',
	`authority_email`	varchar(30)	NOT NULL	COMMENT '인증 이메일',
	`authority_time`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '인증 날짜(시간)'
);



COMMIT;

SELECT * FROM `confirm_email`;


INSERT INTO `confirm_email`
VALUES (null, 152444, 'user01@kh.or.kr', default);


UPDATE  'confirm_email' 
SET authority_key = 152444,
	authority_time = datetime
	
WHERE authority_email = 'user01@kh.or.kr';


UPDATE `confirm_email`
SET authority_key = 152444,
	authority_time = datetime
WHERE authority_email = 'user01@kh.or.kr';


