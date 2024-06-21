import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/context/AppContext";

const TopSection = () => {
  const [_, updateApp] = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    updateApp("authenticated", false);
  };

  return (
    <div className="flex justify-between items-center px-4 h-[50px] bg-white">
      <p className="text-xl font-bold">Panel restauratora</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full h-8 w-8">A</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            Wyloguj
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { TopSection };
