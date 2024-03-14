import { useNavigate } from "react-router-dom";
import { useModal } from "../Context/ModalContext";
import Button from "./Button";
import useCloseModal from "../Hooks/useCloseModal";

export default function TransactionSuccessModal() {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  useCloseModal(() => {
    console.log("RUN");
    // navigate("/app/home");
  });

  return (
    <div className="bg-[#FFFCFA] py-12 px-16 font-body w-full max-w-[40rem] rounded-lg flex items-center justify-center flex-col">
      <i className="bx bx-check text-hero text-light border-[4px] rounded-full border-light p-2 mb-6"></i>
      <h2 className="text-main text-large text-center font-semibold">
        Transaction Successful
      </h2>
      <p className="text-center text-light text-heading">
        Thank you for your purchase{" "}
      </p>
      <Button
        className="px-8 py-3 bg-main text-body rounded-md mt-8 hover:bg-light"
        onClick={() => {
          closeModal();
        }}
      >
        Back to Home
      </Button>
    </div>
  );
}
