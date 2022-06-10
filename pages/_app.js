import "../css/globals.css";
import { createContext, useState, useEffect, useRef, forwardRef } from "react";
import BasicHead from "../components/Head";

export const InterfaceContext = createContext();

function App({ Component, pageProps }) {
  const container = useRef();

  function closeDialogHandler(e) {
    if (Object.is(e.target, container.current)) {
      container.current.removeEventListener("click", closeDialog);
      setDialog(null);
    }
  }

  const [dialog, setDialog] = useState(null);
  const ctxValue = { dialog, setDialog };

  function closeDialog(e) {
    if (Object.is(e.target, container.current)) {
      setDialog(null);
    }
  }

  useEffect(() => {
    if (!dialog) return;
    container.current.addEventListener("click", closeDialog);
  }, [dialog]);

  return (
    <InterfaceContext.Provider value={ctxValue}>
      {dialog && (
        <DialogContainer
          ref={container}
          content={dialog}
          closeDialog={closeDialog}
        />
      )}
      <BasicHead />
      <Component {...pageProps} />
    </InterfaceContext.Provider>
  );
}

const DialogContainer = forwardRef(({ content, closeDialog }, ref) => {
  return (
    <div className="dialog-container" ref={ref}>
      {content}
    </div>
  );
});

export default App;
