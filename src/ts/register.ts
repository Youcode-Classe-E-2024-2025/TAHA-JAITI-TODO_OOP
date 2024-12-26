
export const createRegister = () => {
    const registerElement = document.createElement('div');
    registerElement.id = 'registerContainer';
    registerElement.className = 'h-full w-full flex items-center justify-center';
    registerElement.innerHTML = `
            <div class="bg-gray-800 p-8 rounded-md shadow-md w-96">
            <h2 class="text-2xl font-bold text-purple-500 mb-6">Register for TaskFlow</h2>
            <form id="registerForm" class="space-y-4">
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-300">Username</label>
                    <input type="text" id="username" name="username" required
                        class="input" />
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
                    <input type="email" id="email" name="email" required
                        class="input" />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
                    <input type="password" id="password" name="password" required
                        class="input" />
                </div>
                <button type="submit"
                    class="btn_primary">
                    Register
                </button>
            </form>
            <p class="mt-4 text-sm text-gray-400">
                Already have an account? <a href="/login" id="registerLink" class="w-full text-purple-500 hover:text-purple-400">Login here</a>
            </p>
        </div>
        `
    return registerElement;
};

export const handleRegister = async () => {
    const registerForm = document.getElementById('registerForm') as HTMLFormElement;

    if (registerForm){
        const data = new FormData(registerForm);
        const username = data.get('username') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const role = "employee";

        // send a reuqest the server
        try {
            const response = await fetch('http://localhost/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, email, password, role})
            });

            const result = await response.json();

            if (response.ok){
                console.log('Register successful', result);
            }

        } catch (err) {
            console.error('Error', err);
            alert('Error registering');
        }
    }
};