import { get, getOrders, putOrder } from "@/apihelper";
import { OrderTable, PagingOption } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { OrderModel, OrderedProductModel, PagedResult } from "@/types";
import { useEffect, useState } from "react";

const OrderSection = () => {
  const [app, updateApp] = useAppContext();

  const [selectedRow, setSelectedRow] = useState<PagingOption>({
    label: "10",
    value: 0,
  });
  const [selectedPage, setSelectedPage] = useState<number>(1);

  useEffect(() => {
    updateOrders(Number(selectedRow.label), 1);
  }, [app!.selectedStatus]);

  const handleRowClick = async (item: OrderModel) => {
    if (item.id === app!.selectedOrder?.id) {
      return;
    }

    const products = (await get(
      `order/${item.id}/products`
    )) as OrderedProductModel[];

    updateApp("selectedOrder", { ...item, products });
  };

  const handleUpdate = async (item: OrderModel) => {
    const index = app!.orders.data.findIndex((x) => x.id === item.id);

    if (index !== undefined) {
      const order = (await putOrder(item)) as OrderModel;

      const newOrders = [...app!.orders.data];
      newOrders[index] = order;

      updateApp("orders", {
        data: newOrders,
        maxPageCount: app!.orders.maxPageCount,
        maxRowCount: app!.orders.maxRowCount,
      });
    }
  };

  const updateOrders = async (limit: number, page: number) => {
    const orders = (await getOrders({
      limit: limit,
      page: page,
      orderStatus: app!.selectedStatus,
    })) as PagedResult<OrderModel>;
    updateApp("orders", orders);
  };

  const handleRowChange = async (option: PagingOption) => {
    await updateOrders(Number(option.label), 1);

    setSelectedPage(1);
    setSelectedRow(option);
  };

  const handlePageChange = async (page: number) => {
    await updateOrders(Number(selectedRow.label), page);

    setSelectedPage(page);
  };

  return (
    <OrderTable
      items={app!.orders.data}
      selectedItem={app?.selectedOrder}
      paging={{
        maxPages: app!.orders.maxPageCount,
        maxRows: app!.orders.maxRowCount,
        selectedRow: selectedRow.value,
        selectedPage: selectedPage,
        onRowsChange: handleRowChange,
        onPageChange: handlePageChange,
      }}
      onRowClick={handleRowClick}
      onUpdate={handleUpdate}
    />
  );
};

export { OrderSection };
