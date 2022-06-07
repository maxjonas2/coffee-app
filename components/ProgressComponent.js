import { useEffect, useState } from "react";

export default function ProgressComponent({ setDialog }) {
  const [value, setValue] = useState(0);

  let timerRef;

  useEffect(() => {
    if (value >= 100) {
      setDialog(null);
      return () => clearTimeout(timerRef);
    }

    timerRef = setTimeout(() => {
      setValue((value) => value + 5);
    }, 1000);

    return () => clearTimeout(timerRef);
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
