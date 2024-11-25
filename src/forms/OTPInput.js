import React from "react";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../UserContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export default function() {
  const { email, otp, setPage } = useContext(UserContext);
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  async function resendOTP() {
    if (disable) return;

    try {
      await axios.post(`${BASE_URL}/send_recovery_email`, {
        OTP: otp,
        recipient_email: email,
      });
      setDisable(true);
      alert("A new OTP has successfully been sent to your email.");
      setTimer(60);
    } catch (error) {
      console.log(error);
    }
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="OTP d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white p-4 shadow-lg mx-auto w-100 max-w-lg rounded">
        <div className="mx-auto d-flex flex-column w-100 max-w-md gap-4">
          <div className="d-flex flex-column align-items-center text-center gap-2">
            <div className="fw-semibold fs-3">
              <h3>Email Verification</h3>
            </div>
            <div className="d-flex flex-row text-secondary fw-medium small">
              <h5>We have sent a code to your email {email}</h5>
            </div>
          </div>

          <div>
            <form>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex flex-row justify-content-between mx-auto w-50">
                  <div className="w-25">
                    <input
                      maxLength="1"
                      className="form-control text-center fs-5 rounded border"
                      type="text"
                      onChange={(e) =>
                        setOTPinput([
                          e.target.value,
                          OTPinput[1],
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    />
                  </div>
                  <div className="w-25">
                    <input
                      maxLength="1"
                      className="form-control text-center fs-5 rounded border"
                      type="text"
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          e.target.value,
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    />
                  </div>
                  <div className="w-25">
                    <input
                      maxLength="1"
                      className="form-control text-center fs-5 rounded border"
                      type="text"
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          e.target.value,
                          OTPinput[3],
                        ])
                      }
                    />
                  </div>
                  <div className="w-25">
                    <input
                      maxLength="1"
                      className="form-control text-center fs-5 rounded border"
                      type="text"
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          OTPinput[2],
                          e.target.value,
                        ])
                      }
                    />
                  </div>
                </div>

                <div className="d-flex flex-column gap-3">
                  <div>
                    <button
                      type="button"
                      onClick={() => verfiyOTP()}
                      className="btn btn-primary w-100 py-3"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="d-flex justify-content-center gap-2 small text-secondary fw-medium">
                    {/*<h5>Didn't receive code?</h5>*/}
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      style={{
                        color: disable ? "gray" : "blue",
                        pointerEvents: disable ? "none" : "auto",
                        textDecoration: disable ? "none" : "underline",
                      }}
                      onClick={() => resendOTP()}
                    >
                      {disable
                        ? `Didn't receive code? Resend OTP in ${timerCount}s`
                        : "Resend OTP"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
