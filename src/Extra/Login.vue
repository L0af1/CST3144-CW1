<template>
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <h1>Welcome</h1>
          <p>Get ready for Knowledge!</p>
        </div>
  
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>
  
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>
  
          <div v-if="password" class="requirements-box">
            <p>Password must contain:</p>
            <ul>
              <li
                v-for="(req, index) in requirements"
                :key="index"
                :class="{ met: req.test(password) }"
              >
                {{ req.label }}
              </li>
            </ul>
          </div>
  
          <button
            type="submit"
            :disabled="!isPasswordValid"
            :class="{ disabled: !isPasswordValid }"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const email = ref("");
  const password = ref("");
  

  const requirements = [
    { label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
    { label: "Contains uppercase letter (A-Z)", test: (pwd) => /[A-Z]/.test(pwd) },
    { label: "Contains lowercase letter (a-z)", test: (pwd) => /[a-z]/.test(pwd) },
    { label: "Contains number (0-9)", test: (pwd) => /[0-9]/.test(pwd) },
    { label: "Contains special character", test: (pwd) => /[.!@#$%^&*(),?":{}|<>]/.test(pwd) }
  ];
  
  const isPasswordValid = computed(() => requirements.every((req) => req.test(password.value)));
  
  const handleLogin = () => {
    console.log("Login with:", { email: email.value, password: password.value });
    router.push("/tutors");
  };
  </script>
  
  <style scoped>

  .login-container {
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg,white,white);
    padding: 1rem;
  }
  

  .login-box {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  

  .login-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .login-header h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  .login-header p {
    color: #666;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  .form-group label {
    display: block;
    font-weight: 500;
    color: #444;
    margin-bottom: 0.3rem;
  }
  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .requirements-box {
    background: #f8f9fb;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  .requirements-box p {
    font-size: 0.85rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }
  .requirements-box ul {
    list-style: none;
    padding: 0;
  }
  .requirements-box li {
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 0.25rem;
    position: relative;
    padding-left: 18px;
  }
  .requirements-box li::before {
    content: "✗";
    position: absolute;
    left: 0;
    color: #ccc;
  }
  .requirements-box li.met {
    color: #16a34a;
    font-weight: 600;
  }
  .requirements-box li.met::before {
    content: "✓";
    color: #16a34a;
  }
  
  button {
    width: 100%;
    background-color: #2563eb;
    color: white;
    font-weight: 600;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  button:hover {
    background-color: #1d4ed8;
    box-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
  }
  button.disabled {
    background-color: #cbd5e1;
    color: #666;
    cursor: not-allowed;
    box-shadow: none;
  }
  </style>