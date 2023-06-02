import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useCookies } from 'react-cookie';
import { setUser } from "@/redux/reducers/userSlice";

export default function useReduxState({ children }) {
  const dispatch=useDispatch();
  const [cookies] = useCookies(['user']);

  useEffect(()=>{
    dispatch(setUser(cookies.user))
  },[])

  return (
    <>{children}</>
  )
}
