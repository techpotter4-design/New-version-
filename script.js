// ===============================
// SUPABASE
// ===============================

const SUPABASE_URL = "https://fnqpttomidxtzqrzszat.supabase.co";
const SUPABASE_KEY = "sb_publishable_MBMM38ist7gawg30G_4jXg_yHcpPdQN";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// ===============================
// ELEMENTS
// ===============================

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const googleLogin = document.getElementById("googleLogin");

// ===============================
// SWITCH FORMS
// ===============================

if (showRegister) {
    showRegister.onclick = () => {
        loginForm.classList.remove("active");
        registerForm.classList.add("active");
    };
}

if (showLogin) {
    showLogin.onclick = () => {
        registerForm.classList.remove("active");
        loginForm.classList.add("active");
    };
}

// ===============================
// SHOW / HIDE PASSWORD
// ===============================

document.querySelectorAll(".toggle-password").forEach(toggle => {

    toggle.addEventListener("click", () => {

        const input = toggle.previousElementSibling;
        const icon = toggle.querySelector("i");

        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        }

    });

});

// ===============================
// GOOGLE LOGIN
// ===============================

if (googleLogin) {

    googleLogin.addEventListener("click", async () => {

        const { error } = await supabaseClient.auth.signInWithOAuth({

            provider: "google",

            options: {
                redirectTo: window.location.origin
            }

        });

        if (error) {
            alert(error.message);
        }

    });

}

// ===============================
// REGISTER
// ===============================

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirm = document.getElementById("confirmPassword").value;

        if (password !== confirm) {
            alert("Passwords do not match.");
            return;
        }

        const { error } = await supabaseClient.auth.signUp({

            email: email,
            password: password

        });

        if (error) {

            alert(error.message);

        } else {

            alert("Registration successful! Please check your email.");

            registerForm.reset();

            registerForm.classList.remove("active");
            loginForm.classList.add("active");

        }

    });

}

// ===============================
// LOGIN
// ===============================

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const { error } = await supabaseClient.auth.signInWithPassword({

            email: email,
            password: password

        });

        if (error) {

            alert(error.message);

        } else {

            window.location.href = "dashboard.html";

        }

    });

}

// ===============================
// CHECK SESSION
// ===============================

(async () => {

    const { data } = await supabaseClient.auth.getSession();

    if (data.session) {

        console.log("Logged in:", data.session.user.email);

    }

})();