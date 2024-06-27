<script setup>
import router from "@/router"
import { computed, ref } from 'vue'
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();

const Email = ref("");
const Password = ref("");
const LoginForm = ref(null);
const TextSnackbar = ref("");
const SnackBarAtivator =ref (false);
const Visible = ref(false);

const Login = async () => {
  try {
    const { valid } = await LoginForm.value.validate();

    if(valid){
      const loginParams = {
        "email": Email.value.trim(),
        "password": Password.value
      }

      await authStore.login(loginParams);

      router.push("/ambiente");
    }

    // if (!Email.value || !Password.value) {
    //   TextSnackbar.value = "E-mail e senha são obrigatórios.";
    //   SnackBarAtivator.value = true;
    // } else if (valid && Email.value === EmailEsperado && Password.value === SenhaEsperada) {
    //   router.push("/home");        
    // } else {
    //   TextSnackbar.value = "Certifique-se de que seu e-mail e/ou senha estão corretos";
    //   SnackBarAtivator.value = true;
    // }
  } catch {
    TextSnackbar.value = "Não foi possível efetuar o login. Verifique suas credenciais e tente novamente.";
    SnackBarAtivator.value = true;
  }
}

const inputRulesValidation = computed(() => {
  return {
    emailValid: value => value ? (/.+@.+\..+/.test(value) ? true : "Email inválido") : "Email é obrigatório",
    passwordValid: value => !!value || "Senha é obrigatória"
  };
});

const togglePasswordVisibility = () => {
  Visible.value = !Visible.value;
}
</script>

<template>
  <div class="container">
    <div class="col blue-bg">
      <img src="/src/assets/imgs/Logo_ideal.png" class="img-logo" >
    </div>
    <div class="col">
      <div class="login-card mx-auto">
                <div class="text-center">
                  <h2 class="d-flex flex-column">
                    <span>Olá,</span>
                    <span class="blue">Seja Bem-Vindo(a)!</span>
                    <span>Faça seu <b class="blue">Login</b></span>
                  </h2>
                </div>
                <v-form class="loginform mt-6" ref="LoginForm" >
                  <v-text-field v-model="Email" label="Digite seu e-mail" variant="underlined"  
                  ></v-text-field>
                  <v-text-field
                      v-model="Password"
                      label="Digite sua Senha"
                      :append-inner-icon="Visible ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="Visible ? 'text' : 'password'"
                      variant="underlined"
                      @keyup.enter="Login"
                      :rules="[inputRulesValidation.passwordValid]"
                      @click:append-inner="togglePasswordVisibility"
                  >
                  </v-text-field>
                  <div class="centered-element mt-9">
                    <v-btn class="login-btn" @click="Login" block>Entrar</v-btn>
                  </div>
                </v-form>
            </div>
    </div>
  </div>
  <v-snackbar class="v-snackbarContent"
      v-model="SnackBarAtivator"
      :timeout="4000"
      color="red"
    >
      {{TextSnackbar}}

      <template class="v-snackbarContent" v-slot:actions> 
        <v-btn
          color="white"
          variant="text"
          @click="SnackBarAtivator=false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
</template>

<style scoped> 
.container{
  display: flex;
  width: 100%;
  height: 100%;
}
.col{
  display: flex;
  justify-content: center;
  align-items: center;
  width:50%;
}
.blue-bg {
  background-color: #24BDFE;
}
.login-card {
  width: 25rem;
}
.blue {
  color: #24BDFE;
}
.login-btn{
  background-color: #24BDFE;
  color: white;
  width: 50px !important;
}
.img-logo{
  height: 350px;
  width: 400px;
}
</style>


