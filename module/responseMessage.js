module.exports = {//서버들끼리의 원활한 소통을 위해서 응답메세지를 통일
    NULL_VALUE: "필요한 값이 없습니다",
    INTERNAL_SERVER_ERROR : "INTERNAL_SERVER_ERROR",
    OUT_OF_VALUE: "파라미터 값이 잘못되었습니다",
    ID_OR_PW_NULL_VALUE: "아이디/비밀번호 값이 없습니다.",
    CREATED_USER: "회원 가입 성공",
    DELETE_USER: "회원 탈퇴 성공",

    ALREADY_USER: "이미 회원입니다.",
    NO_USER: "존재하지 않는 회원입니다.",
    MISS_MATCH_PW: "비밀번호가 맞지 않습니다.",
    LOGIN_SUCCESS: "로그인 성공",
    LOGIN_FAIL: "로그인 실패",
    LOGOUT_SUCCESS: "로그아웃 성공",
    LOGOUT_FAIL: "로그아웃 실패",
    DB_ERROR:"db error",
    REFRESH_UPDATE_ERROR: 'refreshtoken DB등록 오류',
    NOT_CORRECT_REFRESH_TOKEN: 'refreshtoken이 만료되었습니다.',
    USER_INSERT_FAIL: 'user insert fail',
    USER_UPDATE_FAIL : 'user update fail',
    USER_UPDATE_SUCCESS : 'user_update_success',
    USER_SELECT_FAIL : 'user select fail',
    USER_SELECT_SUCCESS : 'user select success',
    SIGNUP_SUCCESS: '회원 가입 성공',
    SIGNUP_FAIL: '중복된 ID혹은 EMAIL이 존재합니다.',
    REFRESH_UPDATE_ERROR:'refresh update fail',
    EMPTY_TOKEN:'토큰이 없습니다.',
    EXPRIED_TOKEN:'만료된 토큰입니다.',
    INVALID_TOKEN:'잘못된 형식의 토큰입니다.',
    REFRESH_TOKEN:'토큰 발급 완료!',
    USER_DELETE_FAIL:'user 계정 삭제 실패',
    USER_DELETE_SUCCESS:'user 계정 삭제 성공!',
    ADMIN : 'admin',

    NOT_MATCH: "작성자와 일치하지 않습니다",

    X_CREATE_SUCCESS: (x) => `${x} 작성 성공`,
    X_CREATE_FAIL: (x) => `${x} 작성 실패`,
    X_READ_ALL_SUCCESS: (x) => `${x} 전체 조회 성공`,
    X_READ_ALL_FAIL: (x) => `${x} 전체 조회 실패`,
    X_READ_SUCCESS: (x) => `${x} 조회 성공`,
    X_READ_FAIL: (x) => `${x} 조회 실패`,
    X_UPDATE_SUCCESS: (x) => `${x} 수정 성공`,
    X_UPDATE_FAIL: (x) => `${x} 수정 실패`,
    X_DELETE_SUCCESS: (x) => `${x} 삭제 성공`,
    X_DELETE_FAIL: (x) => `${x} 삭제 실패`,  
    X_EMPTY: (x) => `존재하지 않는 ${x} 입니다.`,
    NO_X: (x) => `존재하는 ${x} 입니다.`,
    ALREADY_X: (x) => `존재하는 ${x} 입니다.`,

    NOT_VERIFIED : "인증되지 않은 ID 입니다.",

    
};