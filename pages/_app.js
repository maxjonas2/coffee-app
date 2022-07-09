import "../css/globals.css";
import {
  createContext,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useReducer,
} from "react";
import StoreContextProvider from "../contexts/StoreContext";

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

  function reducer(state, action) {
    switch (action.name) {
      case "SET_FECTHED_STORES":
        return { ...state, fetchedShops: action.content };
      case "SET_NEAR_SHOPS_LOADED":
        return { ...state, nearShopsLoaded: action.content };
      case "SET_IS_FINDING_NEAR_SHOPS":
        return { ...state, isFindingNearShops: action.content };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    fecthedShops: [],
    nearShopsLoaded: false,
    isFindingNearShops: false
  });

  const storeCtxValue = { state, dispatch };

  return (
    <InterfaceContext.Provider value={ctxValue}>
      <StoreContextProvider value={storeCtxValue}>
        {dialog && (
          <DialogContainer
            ref={container}
            content={dialog}
            closeDialog={closeDialog}
          />
        )}
        {/* <BasicHead /> */}
        <Component {...pageProps} />
      </StoreContextProvider>
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
