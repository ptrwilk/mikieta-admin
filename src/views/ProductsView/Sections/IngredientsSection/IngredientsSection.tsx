import { del, put } from "@/apihelper";
import { IngredientsTable } from "@/components/IngredientsTable/IngredientsTable";
import { useAppContext } from "@/context/AppContext";
import { IngredientModel } from "@/types";

const IngredientsSection = () => {
  const [app, updateApp] = useAppContext();

  const handleAddOrUpdate = async (item: IngredientModel) => {
    const index = app?.ingredients?.findIndex((x) => x.id === item.id);

    const ingredient = (await put("ingredient", item)) as IngredientModel;

    const newIngredients = [...app!.ingredients];

    if (index !== undefined && index !== -1) {
      newIngredients[index] = ingredient;
    } else {
      newIngredients.push(ingredient);
    }

    updateApp("ingredients", newIngredients);
  };

  const handleDelete = async (item: IngredientModel) => {
    await del(`ingredient/${item.id}`);

    const newIngredients = app!.ingredients.filter((x) => x.id !== item.id);

    updateApp("ingredients", newIngredients);
  };

  return (
    <IngredientsTable
      className="w-full"
      items={app!.ingredients}
      onAddOrUpdate={handleAddOrUpdate}
      onDelete={handleDelete}
    />
  );
};

export { IngredientsSection };
