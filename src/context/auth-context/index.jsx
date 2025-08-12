import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, logInService, registerService } from "@/services";
import { LoaderCircle } from "lucide-react";
import React, { createContext, Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import icon2 from "../../assets/icon2.png";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [authInformation, setAuthInformation] = useState({
    authentication: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleRegisterUser = async (event) => {
    setButtonLoading(true);
    event.preventDefault();
    const response = await registerService(signUpFormData).catch((error) => {
      toast(error.response.data.message);
      setButtonLoading(false);
    });
    if (response) {
      setLoading(true);
      setSignUpFormData(initialSignUpFormData);
      toast("You created an account successfully");
    }
    setLoading(false);
    setButtonLoading(false);
    console.log(response);
  };
  const handleLoginUser = async (event) => {
    setButtonLoading(true);
    event.preventDefault();
    const response = await logInService(signInFormData).catch((error) => {
      toast(error.response.data.message);
      setButtonLoading(false);
    });
    if (response) {
      setLoading(true);
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
      setAuthInformation({
        authentication: true,
        user: response.data.user,
      });
      setSignInFormData(initialSignInFormData);
      toast(
        `Welcome,${
          response.data.user.role === "instructor" ? " instructor " : " "
        }${response.data.user.userName}`
      );
    }
    setLoading(false);
    setButtonLoading(true);
  };
  const handleCheckAuthUser = async () => {
    setLoading(true);
    try {
      const response = await checkAuthService();
      if (response.success) {
        setAuthInformation({
          authentication: true,
          user: response.data.user,
        });
        setLoading(false);
      } else {
        setAuthInformation({
          authentication: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      if (!error?.response?.data?.success) {
        setAuthInformation({
          authentication: false,
          user: null,
        });
        setLoading(false);
      }
    }
  };
  const resetCredentials = () => {
    setAuthInformation({
      authentication: false,
      user: null,
    });
  };
  const handleLogOut = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  useEffect(() => {
    handleCheckAuthUser();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
    };
  });
  console.log(windowWidth);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        authInformation,
        resetCredentials,
        loading,
        handleLogOut,
        windowWidth,
        buttonLoading,
      }}
    >
      <Fragment>
        <main>
          {loading ? (
            <div>
              <div className="h-screen w-full flex items-center justify-center">
                <img src={icon2} />
              </div>
              <span
                className={`capitalize absolute w-full  bottom-10 text-center font-bold text-xl`}
              >
                by ahmed talaat
              </span>
            </div>
          ) : (
            children
          )}
        </main>
        <Toaster />
      </Fragment>
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
