import { useEffect } from "react";
import { useModal } from "../Context/ModalContext";

export default function useCloseModal(onClose: () => void = () => {}) {
  const { modalState } = useModal();

  useEffect(() => {
    if (modalState === "open") return;
    onClose();
  }, [modalState]);
  return;
}
