import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/userApi";

function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [pswd, setPswd] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!loginId || !pswd) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const data = await loginApi({ loginId, pswd });
      navigate("/main"); 
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Cookmate 로그인</h2>
      <input 
        type="text" 
        placeholder="아이디" 
        value={loginId} 
        onChange={(e) => setLoginId(e.target.value)} 
      />
      <br /><br />
      <input 
        type="password" 
        placeholder="비밀번호" 
        value={pswd} 
        onChange={(e) => setPswd(e.target.value)} 
      />
      <br /><br />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default LoginPage;