import { SyntheticEvent, useState, useReducer, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { IUser } from "../interfaces/user";
import { baseUrl } from "../config";

interface ValidationState {
    usernameValid: boolean;
    passwordValid: boolean;
    passwordChecks: {
        hasUppercase: boolean;
        hasLowercase: boolean;
        hasSpecialChar: boolean;
        hasNumber: boolean;
        hasValidLength: boolean;
    };
}

const initialValidationState: ValidationState = {
    usernameValid: false,
    passwordValid: false,
    passwordChecks: {
        hasUppercase: false,
        hasLowercase: false,
        hasSpecialChar: false,
        hasNumber: false,
        hasValidLength: false,
    },
};

function validationReducer(state: ValidationState, action: Partial<ValidationState>): ValidationState {
    return { ...state, ...action };
}

export default function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Omit<IUser, "id"> & { password: string; password_confirmation: string }>({
        email: "",
        firstname: "",
        lastname: "",
        username: "",
        image: "",
        password: "",
        password_confirmation: "",
    });

    const [errorData, setErrorData] = useState<string | null>(null);
    const [usernameMessage, setUsernameMessage] = useState("");
    const [existingUsers, setExistingUsers] = useState<IUser[] | null>(null);
    const [validationState, dispatch] = useReducer(validationReducer, initialValidationState);

    useEffect(function fetchUsers() {
        async function getUsers() {
            try {
                const response = await axios.get<IUser[]>(`${baseUrl}/all_users`);
                setExistingUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        getUsers();
    }, []);

    function validateUsername(username: string) {
        if (!existingUsers) return;

        const isExistingUser = existingUsers.some((user) => user.username === username);
        if (isExistingUser) {
            setUsernameMessage("The username already exists");
            dispatch({ usernameValid: false });
        } else {
            setUsernameMessage("You can use this username");
            dispatch({ usernameValid: true });
        }
    }

    function validatePassword(password: string) {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%&*]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasValidLength = password.length >= 8 && password.length <= 20;

        const isPasswordValid = hasUppercase && hasLowercase && hasSpecialChar && hasNumber && hasValidLength;


        dispatch({
            passwordValid: isPasswordValid,
            passwordChecks: { hasUppercase, hasLowercase, hasSpecialChar, hasNumber, hasValidLength },
        });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "username") validateUsername(value);
        if (name === "password") validatePassword(value);
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        if (!validationState.usernameValid || !validationState.passwordValid) {
            setErrorData("Please ensure all fields are valid.");
            return;
        }

        if (formData.password !== formData.password_confirmation) {
            setErrorData("Passwords do not match.");
            return;
        }

        try {
            const { password_confirmation, ...userData } = formData;
            const response = await axios.post<IUser>(`${baseUrl}/signup`, userData);
            console.log(response.data);
            navigate("/login");
        } catch (e: any) {
            setErrorData(e.response.data.error);
        }
    }

    function handleUpload() {
        window.cloudinary
            .createUploadWidget(
                {
                    cloudName: "ded4jhx7i",
                    uploadPreset: "Codestream",
                    cropping: true,
                    croppingAspectRatio: 1,
                },
                function (err: any, result: { event: string; info: { secure_url: string } }) {
                    if (result.event !== "success") return;

                    setFormData((prev) => ({
                        ...prev,
                        image: result.info.secure_url,
                    }));
                }
            )
            .open();
    }

    return (
        <>
            <div className="section">
                <div className="container">
                    {/* Username */}
                    <div className="field mt-4">
                        <label className="label">Username *</label>
                        <input
                            className="input"
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            value={formData.username}
                        />
                        {usernameMessage && (
                            <small className={validationState.usernameValid ? "has-text-success" : "has-text-danger"}>
                                {usernameMessage}
                            </small>
                        )}
                    </div>

                    {/* First Name */}
                    <div className="field mt-4">
                        <label className="label">First Name *</label>
                        <input
                            className="input"
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            onChange={handleChange}
                            value={formData.firstname}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="field mt-4">
                        <label className="label">Last Name *</label>
                        <input
                            className="input"
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            onChange={handleChange}
                            value={formData.lastname}
                        />
                    </div>

                    {/* Email */}
                    <div className="field mt-4">
                        <label className="label">Email *</label>
                        <input
                            className="input"
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>

                    {/* Image */}
                    <div className="field mt-4">
                        <button className="button is-primary" onClick={handleUpload}>
                            Upload Image
                        </button>
                        <textarea
                            className="textarea"
                            placeholder="Image URL"
                            name="image"
                            onChange={handleChange}
                            value={formData.image}
                        />
                    </div>

                    {/* Password */}
                    <div className="field mt-4">
                        <label className="label">Password *</label>
                        <input
                            className="input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                        <ul>
                            {Object.entries(validationState.passwordChecks).map(([check, passed]) => {
                                const checkMessages: Record<string, string> = {
                                    hasUppercase: "One uppercase letter",
                                    hasLowercase: "One lowercase letter",
                                    hasSpecialChar: "One special character (e.g., !@#$%)",
                                    hasNumber: "One number",
                                    hasValidLength: "Password length must be between 8 and 20 characters",
                                };

                                return (
                                    <li key={check} className={passed ? "has-text-success" : "has-text-danger"}>
                                        {passed ? "✅" : "❌"} {checkMessages[check]}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Confirm Password */}
                    <div className="field mt-4">
                        <label className="label">Confirm Password *</label>
                        <input
                            className="input"
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            value={formData.password_confirmation}
                        />
                        {errorData && <p className="has-text-danger">{errorData}</p>}
                    </div>

                    {/* Submit */}
                    <button className="button is-primary mt-4" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}