/** @jsxImportSource @emotion/react */

import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        right: 0,
        fontSize: "3em",
        color: "rgb(255, 0, 0)"
      }}
    >
      <FaSpinner
        className="fa-spin"
        css={{
          margin: "1em",
          animation: "fa-spin 5s infinite linear",
          "@keyframes fa-spin": {
            "0%": {
              transform: "rotate(0deg)"
            },
            "100%": {
              transform: "rotate(359deg)"
            }
          }
        }}
      />
    </div>
  );
};

export default Spinner;
