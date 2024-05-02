import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [fileSizeError, setFileSizeError] = useState(false); // Define fileSizeError state
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    // Check if file size exceeds 2MB
    if (file.size > 2 * 1024 * 1024) {
      setFileSizeError(true);
      toast.error("Image size cannot exceed 2 MB");
      return;
    }

    setFileSizeError(false);

    try {
      const resizedImage = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 300;
            const MAX_HEIGHT = 300;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            const resizedDataUrl = canvas.toDataURL("image/jpeg");
            resolve(resizedDataUrl);
          };
        };
      });

      setData((prev) => ({
        ...prev,
        profilePic: resizedImage,
      }));
    } catch (error) {
      toast.error("Error resizing image: " + error);
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast(dataApi.message, {autoClose: 1500,});
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <TextField
                type="text"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                id="standard-basic"
                label="Name"
                variant="standard"
                inputProps={{ maxLength: 20 }}
              />
            </div>
            <div className="grid">
              <TextField
                type="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                id="standard-basic"
                label="Email"
                variant="standard"
              />
            </div>

            <div>
              <FormControl sx={{ m: 0, width: "100%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: 0, width: "100%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-confirm-password">
                  Confirm Password
                </InputLabel>
                <Input
                  id="standard-adornment-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>

            <button
              disabled={fileSizeError}
              className={`bg-fuchsia-600 hover:bg-amber-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 ${
                fileSizeError ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Sign Up
            </button>
          </form>

          <p className="my-5">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-fuchsia-600 hover:text-amber-500 "
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
