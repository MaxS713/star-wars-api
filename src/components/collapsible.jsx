import { useState } from "react";
import "./collapsible.css";

function Collapsible({ currentName, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="name-and-button">
        <li className="result-name">{currentName}</li>
        <button
          type="button"
          className={`toggle ${open ? "active" : "inactive"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide Data..." : "Show Data..."}
        </button>
      </div>
      {open && (
        <div className={open ? "content-show" : "content-parent"}>
          <div className="content">{children}</div>
        </div>
      )}
    </>
  );
}

export default Collapsible;
