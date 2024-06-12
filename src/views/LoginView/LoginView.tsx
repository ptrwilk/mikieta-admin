import { post } from "@/apihelper";
import { TextInput } from "@/components";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useInput } from "@/hooks";

const LoginView = () => {
  const [_, updateApp] = useAppContext();

  const login = useInput();
  const password = useInput();

  const handleLogin = async () => {
    try {
      const token = await post("login", {
        login: login.value,
        password: password.value,
      });

      localStorage.setItem("token", token);
      updateApp("authenticated", true);
    } catch (e) {
      password.setValue("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="flex flex-col text-xl gap-2 w-[300px]">
        <p className="text-center font-bold">
          Logowanie do Panelu Restauratora
        </p>
        <TextInput captionTop caption="Login" {...login} />
        <TextInput captionTop caption="Hasło" {...password} />
        <p className="text-sm text-red-600">Niepoprawny login lub hasło</p>
        <Button
          className="mt-4"
          onClick={handleLogin}
          disabled={!login.value || !password.value}
        >
          Zaloguj
        </Button>
      </div>
    </div>
  );
};

export { LoginView };
