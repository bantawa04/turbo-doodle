import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";
const Loading = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function withPublic(Component: any) {
  return function WithPublic(props: any) {
    const { currentUser } = useAuth();

    const router = useRouter();

    if (currentUser) {
      router.replace("/");
      return <Loading>
        <h1>Loading...</h1></Loading>;
    }
    return <Component auth={currentUser} {...props} />;
  };
}

export function withProtected(Component: any) {
  return function WithProtected(props: any) {
    const { currentUser, loading } = useAuth();
    const router = useRouter();
    console.log("loading", loading);
    useEffect(() => {
      if (!loading) {
        if (!currentUser) {
          router.replace("/login");
          return;
        }
      }
    }, [currentUser, loading]);
    
    if (loading) return <Loading> <h1>Loading...</h1></Loading>;
    return <Component auth={currentUser} {...props} />;
  };
}
