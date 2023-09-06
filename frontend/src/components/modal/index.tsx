import BottomSheet from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentModal from "./comment";
import { AppDispatch, RootState } from "../../redux/store";
import { clearModal } from "../../redux/slices/modalSlice";

const Modal = () => {
  const modalState = useSelector((state: RootState) => state.modal);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  }, [modalState]);

  const renderContent = () => {
    switch (modalState.modalType) {
      case 0:
        if (modalState.data) {
          return (
            <CommentModal
              post={modalState.data}
              onCommentSend={modalState.onCommentSend}
            />
          );
        }
        return <></>;
      default:
        return <></>;
    }
  };
  const onClose = () => {
    dispatch(clearModal());
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["50%"]}
      index={-1}
      onClose={onClose}
      handleHeight={40}
      enablePanDownToClose
    >
      {renderContent()}
    </BottomSheet>
  );
};

export default Modal;
