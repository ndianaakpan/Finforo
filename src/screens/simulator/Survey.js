import React, { useState } from "react";
import styles from "./Survey.css"
import { useNavigate } from "react-router-dom";

import { Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

function Survey() {
  return (
    <div className="bg">
    <main className="p-3 mb-2">
      <div className="text-center d-flex justify-content-between flex-wrap">
        <div className="mx-auto">
          <h1 className="p-4 text-light">Investment Simulator</h1>
          <p className="p-3 text-light text-wrap">Lorem ipsum, or lipsum as it is sometimes known,...</p>
        </div>

        <div className="mx-auto border border-dark border-2 rounded d-flex bg-light bg-gradient">
          <div>
            <div className="p-3 text-center">
              <h2 className="p-3">How much money did you spend last week?</h2>
              <div className="input-group">
                <input className="mx-auto" type="text" id="name" />
              </div>
              <button type="submit" className="submit-btn bg-danger text-light rounded m-3">
                Submit
              </button>
              
            </div>
          </div>
        </div>
      </div>
     

    </main>
    </div>
  );
}
export default Survey;