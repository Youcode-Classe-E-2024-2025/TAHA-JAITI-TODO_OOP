var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createLogin, handleLogin } from "./login.js";
import { createRegister, handleRegister } from "./register.js";
import { createHeader } from "./header.js";
import { errPage } from "./404.js";
const root = document.getElementById("root");
if (!root) {
    throw new Error("Root element not found");
}
function getSessionData() {
    return {
        userId: sessionStorage.getItem("user_id") || null,
        role: sessionStorage.getItem("role") || null,
    };
}
function clearRoot() {
    root.innerHTML = "";
    root.appendChild(createHeader());
}
function renderLogin() {
    const { userId } = getSessionData();
    if (!userId) {
        root.appendChild(createLogin());
    }
    else {
        navigate("/");
    }
}
function renderRegister() {
    const { userId } = getSessionData();
    if (!userId) {
        root.appendChild(createRegister());
    }
    else {
        navigate("/");
    }
}
function renderErrPage() {
    clearRoot();
    root.innerHTML += errPage();
}
function logOut() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost/api/logout", { method: "GET" });
            if (!response.ok) {
                throw new Error("Logout failed");
            }
            const result = yield response.json();
            alert(result.message);
            sessionStorage.clear();
            navigate("/login");
        }
        catch (error) {
            console.error("Error logging out:", error);
            alert("An error occurred during logout.");
        }
    });
}
const routes = {
    "/": { render: clearRoot, requiresAuth: false },
    "/login": { render: renderLogin, requiresAuth: false },
    "/register": { render: renderRegister, requiresAuth: false },
    "/logout": { render: logOut, requiresAuth: true },
};
function router() {
    const path = window.location.pathname;
    const route = routes[path];
    const { userId } = getSessionData();
    if (route) {
        clearRoot();
        if (route.requiresAuth && !userId) {
            alert("You must be logged in to access this page.");
            navigate("/login");
            return;
        }
        route.render();
    }
    else {
        renderErrPage();
    }
}
function navigate(path) {
    window.history.pushState({}, "", path);
    router();
}
function handleNavigation(event) {
    const target = event.target;
    if (target.tagName === "A" && target.hasAttribute("href")) {
        const path = target.getAttribute("href");
        if (path && path.startsWith("/")) {
            event.preventDefault();
            navigate(path);
        }
    }
    if (target.tagName === "FORM") {
        const form = target;
        event.preventDefault();
        if (form.id === "loginForm") {
            handleLogin()
                .then(() => navigate("/"))
                .catch((error) => console.error("Login failed:", error));
        }
        if (form.id === "registerForm") {
            handleRegister()
                .then(() => navigate("/login"))
                .catch((error) => console.error("Register failed:", error));
        }
    }
}
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", router);
document.addEventListener("click", handleNavigation);
document.addEventListener("submit", handleNavigation);
