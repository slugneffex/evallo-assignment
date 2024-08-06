/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Heading from "../Headings";
import Button from "../Button";
import Input, { IWraper } from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const schema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password doesn't match",
  });

const OTPForm = ({
  noRegistrationLink = false,
  linkText,
  toLink = () => {},
  hasPassword = false,
  email,
  url,
}) => {
  const [otpBoxes, setOtpBoxes] = useState(Array(6).fill(null));
  const inputRefs = useRef([]);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    ...(hasPassword ? { resolver: zodResolver(schema) } : {}),
  });
  const navigate = useNavigate();

  function handleOtpInputs(index) {
    return (ev) => {
      const { value } = ev.target;

      const enteredValue = otpBoxes.toSpliced(index, 1, value);
      const newValue = enteredValue[index];

      newValue?.length <= 1 && setOtpBoxes(enteredValue);

      const focusIndex = newValue === "" ? index - 1 : index + 1;
      inputRefs.current[focusIndex]?.focus();
    };
  }

  async function onVerifyOtp(data) {
    try {
      const {
        data: { user },
      } = await api.post(`/auth/${url}/${email}`, {
        ...data,
        otp: otpBoxes.join(""),
      });

      toast.success("Logged In");
      navigate("/", { replace: true });
      localStorage.setItem("USER", JSON.stringify(user));
    } catch (res) {
      toast.error(res?.response?.data?.message || "Request Failed");
    }
  }

  const [icon, setIcon] = useState([false, false]);
  const [type, setType] = useState(["password", "password"]);

  const handleToggle = (index) => {
    const newIconState = [...icon];
    const newTypeState = [...type];

    if (type[index] === "password") {
      newIconState[index] = true;
      newTypeState[index] = "text";
    } else {
      newIconState[index] = false;
      newTypeState[index] = "password";
    }

    setIcon(newIconState);
    setType(newTypeState);
  };

  
  return (
    <>
      <Heading>
        <div className="flex gap-2 items-center justify-between">
          <span>OTP</span>
          {!noRegistrationLink && (
            <span
              onClick={toLink}
              className="text-base hover:underline cursor-pointer"
            >
              {linkText}
            </span>
          )}
        </div>
      </Heading>
      <form onSubmit={handleSubmit(onVerifyOtp)}>
        <div className="flex flex-col mb-6">
          <div className="flex gap-4 justify-center my-8">
            {otpBoxes.map((_, index) => {
              return (
                <input
                  autoFocus={index === 0}
                  type="number"
                  key={index}
                  className="p-4 2xl:w-16 2xl:h-16 w-12 h-12 border border-primary outline-none text-center text-2xl font-medium"
                  onChange={handleOtpInputs(index)}
                  value={otpBoxes[index]}
                  placeholder="0"
                  ref={(ele) => (inputRefs.current[index] = ele)}
                />
              );
            })}
          </div>

          {hasPassword && (
            <IWraper register={register} errors={errors}>
              <div className="relative">
                <Input label={"Password"} type={type[0]} name="password" />
                <span
                  className="absolute right-2 top-[68%] -translate-y-1/2 transform "
                  onClick={() => handleToggle(0)}
                >
                  {icon[0] ? (
                    <IoEyeOffOutline
                      className="cursor-pointer"
                      size={20}
                      color="lightgrey"
                    />
                  ) : (
                    <MdOutlineRemoveRedEye
                      className="cursor-pointer"
                      size={20}
                      color="lightgrey"
                    />
                  )}
                </span>
              </div>
              <div className="relative">
                <Input
                  label={"Re-Type Password"}
                  type={type[1]}
                  name="confirmPassword"
                />
                <span
                  className="absolute right-2 top-[68%] -translate-y-1/2 transform "
                  onClick={() => handleToggle(1)}
                >
                  {icon[1] ? (
                    <IoEyeOffOutline
                      className="cursor-pointer"
                      size={20}
                      color="lightgrey"
                    />
                  ) : (
                    <MdOutlineRemoveRedEye
                      className="cursor-pointer"
                      size={20}
                      color="lightgrey"
                    />
                  )}
                </span>
              </div>
            </IWraper>
          )}
        </div>

        <Button type="submit" className={"mx-0 w-full"} disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Verify"}
        </Button>
      </form>
    </>
  );
};

export default OTPForm;
