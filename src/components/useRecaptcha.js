import { useEffect, useState } from "react";

const useRecaptcha = () => {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    const loadRecaptcha = async () => {
      await load("recaptcha", {
        url: "https://www.gstatic.com/firebasejs/9.0.0/recaptcha.js"
      });
      setRecaptchaLoaded(true);
    };

    loadRecaptcha();
  }, []);

  return recaptchaLoaded;
};

export default useRecaptcha;