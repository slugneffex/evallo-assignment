import Modal from "../Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState } from "react";
import OTPForm from "./OTPForm";

// eslint-disable-next-line react-refresh/only-export-components
export const FORM_ENUMS = {
  LOGIN: "login",
  REGISTER: "register",
  OTP: "otp",
};

const AuthForm = () => {
  const [formState, setFormState] = useState(FORM_ENUMS.REGISTER);

  return formState === FORM_ENUMS.LOGIN ? (
    <Modal onClose={() => setFormState(FORM_ENUMS.REGISTER)}>
      <LoginForm></LoginForm>
    </Modal>
  ) : (
    <div className="bg-white 2xl:flex-[0.5] flex-[0.6] p-6 flex flex-col overflow-y-scroll">
      <div className="flex justify-center w-full h-[30%]">
        <img
          src={
            "http://www.evallo.org/static/media/evallo-nav-logo.405bdb450d165f5f57f19fd56c346973.svg"
          }
          alt=""
          className="w-[13vw]"
        />
      </div>
      {formState === FORM_ENUMS.REGISTER ? (
        <RegisterForm setFormState={setFormState} />
      ) : (
        <OTPForm
          toLink={() => setFormState(FORM_ENUMS.REGISTER)}
          email={formState}
          linkText="New Registration ?"
          hasPassword={true}
          url={"verify"}
        />
      )}
    </div>
  );
};

export default AuthForm;
