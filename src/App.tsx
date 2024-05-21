import { Toaster } from "./components/ui/toaster";
import { HeaderView } from "./views/HeaderView/HeaderView";
import { OrderView } from "./views/OrderView/OrderView";
import { ProductsView } from "./views/ProductsView/ProductsView";
import { MenuView } from "./views/MenuView/MenuView";

function App() {
  return (
    <div className="flex flex-col">
      <HeaderView />
      <div className="flex">
        <MenuView className="flex-shrink-0" />
        <div className="mt-12 flex-grow">
          <OrderView />
          <ProductsView />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
