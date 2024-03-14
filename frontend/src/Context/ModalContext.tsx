import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type TModalContextValues = {
  showModal: (modalName: string) => void;
  closeModal: () => void;
  triggerRevalidation: () => void;
  shouldRevalidate: number;
  modalState: "open" | "close";
};

const ModalContext = createContext<TModalContextValues | null>(null);

type TModalElements = {
  element: ReactElement;
  name: string;
  // Will trigger a rerender whenever a change occurs
  // triggerRevalidation: boolean;
};

export function ModalProvider({
  children,
  elements,
}: {
  children: ReactNode;
  elements: TModalElements[];
}) {
  const [selected, setSelected] = useState<TModalElements>(elements[0]);
  const [show, setShow] = useState(false);
  const [shouldRevalidate, setShouldRevalidate] = useState(0);

  const showModal = (modalName: string) => {
    const selectedModalElement = elements.find(
      (element) => element.name === modalName
    );
    if (!selectedModalElement)
      throw new Error(`Unknown Modal Name : ${modalName}`);
    setSelected(selectedModalElement);
    setShow(true);
  };

  const triggerRevalidation = () => {
    setShouldRevalidate(Math.random());
  };

  const closeModal = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <ModalContext.Provider
      value={{
        modalState: show ? "open" : "close",
        showModal,
        closeModal,
        triggerRevalidation,
        shouldRevalidate,
      }}
    >
      <div
        className="fixed inset-0 bg-black/50 z-[120] grid place-items-center transition-all duration-300 opacity-0 cursor-pointer"
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0",
        }}
        onClick={() => {
          closeModal();
          triggerRevalidation();
        }}
      ></div>
      <div
        className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[140] transition-all duration-300"
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0",
        }}
      >
        {selected.element}
      </div>

      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal must be used inside of it's Provider's scope");
  return context;
}
