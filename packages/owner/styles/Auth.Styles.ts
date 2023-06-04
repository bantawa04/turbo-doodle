import styled from "styled-components";

export const LoginContainer = styled.div`
  background: #ccc;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LoginFormWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  min-height: 100px;
  padding: 2rem;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
`;
