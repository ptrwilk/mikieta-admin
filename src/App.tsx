import { HeaderView } from "./views/HeaderView/HeaderView";
import { OrderView } from "./views/OrderView/OrderView";
import { ProductsView } from "./views/ProductsView/ProductsView";

function App() {
  return (
    <div className="flex flex-col gap-12">
      <HeaderView />
      <OrderView />
      <ProductsView />
    </div>
  );
}

export default App;
