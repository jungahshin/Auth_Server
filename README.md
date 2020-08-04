# Auth Server Project

- **다음과 같은 조건을 갖춘 Auth Server를 개발했다**
  - 이메일 인증
  - RDBMS 사용 (Mysql)
  - 비밀번호 찾기
  - Password Encryption
  - 로그인 및 회원가입 기능

<br/>

### password Encryption

**비밀번호 보안모듈인 pbkdf2 사용(with SHA512)**

단반향 암호 알고리즘인 sha512를 사용하여 암호화하였지만, 단방향 암호화에 사용되는 해시함수는 다음과 같은 문제점을 가지고 있다.

1. 무차별 대입공격(brute-force attack)에 취약하다.

2. 레인보우 공격(rainbow attack)

   항상 동일한 값을 갖는다면 탈취한 값을 기반으로 rainbow table을 만들어 공격한다.


<br/>

**salting이란?**

위의 해시함수가 가지는 다양한 문제점들을 보완하기 위한 하나의 방법이다.

- 임의의 문자열을 추가하여 암호화하는 방식이다.
- 레인보우 공격(rainbow attack)을 기반으로 테이블을 만들어도 salting 값을 알아내기 힘들다.

따라서, 프로젝트에서는 hashedPw를 만드는 데에 보안모뮬인 pbkdf2(with SHA512)를 사용하되 + randomBytes로 생성된 값을 base64로 encoding하여 생성된 salt값을 넣어주었다.

```javascript
const hashedPw = await crypto.pbkdf2(pw, salt,1000, 32, 'SHA512');
```

<br/>

### 로그인 유지는 JWT 인증방식을 사용!

**JWT 인증방식을 사용하는 이유는?**

1. JWT는 발급한 후 토큰 검증만 하기 때문에 추가적인 저장소가 필요 없다.
2. 서버를 확장하거나 유지, 보수하는데에 유리하다.
3. 토큰 기반으로 하는 다른 인증 시스템에 접근이 가능하다.

아래 코드와 같이 토큰을 발급하여 로그인 관리한다.

```javascript
const token = jwtUtils.sign(selectUserResult[0]);
```

<br/>

**물론 JWT 인증방식의 단점도 존재한다.**

1. 세션/쿠키의 경우 세션ID가 변질되었다고 판단이 된다면 해당하는 세션을 지우면 되지만, JWT는 한 번 발급이 되면 유효기간이 완료될 때 까지는 계속 사용이 가능하기 때문에 유효기간이 지나기 전까지 정보들을 탈취할 수 있다.

<br/>

**Refresh Token**

Access Token(JWT)를 통한 인증 방식의 문제로 탈취당할 경우 보안에 취약하다는 점이 있다. 유효기간이 짧은 Token의 경우, 사용자는 새로운 Token을 발급받기 위해 로그인을 자주 시도해야 하고 유효기간을 늘리면 탈취당했을 때에 보안에 취약해지게 된다. 따라서, **'유효기간을 짧게 하면서도 보안을 챙길 수 있는'** 방식으로 나온 것이 Refresh Token이다.

<br/>



### 메일 보내기

메일을 보내는 기능은 node의 nodemailer라는 모듈을 사용하여 구현했다.
