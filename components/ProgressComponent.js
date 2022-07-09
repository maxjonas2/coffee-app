import { useEffect, useRef, useState } from "react";

export default function ProgressComponent({ setDialog }) {
  const [value, setValue] = useState(0);

  const timerRef = useRef(0);

  useEffect(() => {
    if (value >= 100) {
      setDialog(null);
      return () => clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setValue((value) => value + 5);
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [value]);

  return (
    <div className="flow">
      <progress max={100} value={value}></progress>
      <div>
        <button className="btn-normal" onClick={() => setDialog(null)}>
          Close
        </button>
      </div>
    </div>
  );
}
