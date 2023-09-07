import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "../redux/slices/chatSlice";
import { chatsListener } from "../services/chat";
import { RootState } from "../redux/store";
import { QuerySnapshot, Unsubscribe } from "firebase/firestore";
import { Chat } from "../../types";

export const useChats = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const handleChatsChange = useCallback(
    (change: QuerySnapshot) => {
      dispatch(
        setChats(
          change.docs.map((item) => ({ id: item.id, ...item.data() }) as Chat),
        ),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    let listenerInstance: Unsubscribe | undefined;
    if (currentUser != null) {
      listenerInstance = chatsListener(handleChatsChange);
    }

    return () => {
      listenerInstance && listenerInstance();
    };
  }, [handleChatsChange, currentUser]);
};
