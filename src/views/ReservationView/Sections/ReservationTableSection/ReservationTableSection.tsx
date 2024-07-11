import { getReservations, putReservation } from "@/apihelper";
import { PagingOption, ReservationTable } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { PagedResult, ReservationModel } from "@/types";
import { useEffect, useState } from "react";

const ReservationTableSection = () => {
  const [app, updateApp] = useAppContext();

  const [selectedRow, setSelectedRow] = useState<PagingOption>({
    label: "10",
    value: 0,
  });
  const [selectedPage, setSelectedPage] = useState<number>(1);

  useEffect(() => {
    updateOrders(Number(selectedRow.label), 1);
  }, [app!.selectedReservationStatus]);

  const handleUpdate = async (item: ReservationModel, callApi: boolean) => {
    const index = app?.reservations.data.findIndex((x) => x.id === item.id);

    if (index !== undefined && index !== -1) {
      const newReservations = [...app!.reservations.data];

      if (callApi) {
        const reservation = (await putReservation(item)) as ReservationModel;

        newReservations[index] = reservation;
      } else {
        newReservations[index] = item;
      }

      updateApp("reservations", {
        data: newReservations,
        maxPageCount: app!.reservations.maxPageCount,
        maxRowCount: app!.reservations.maxRowCount,
      });
    }
  };

  const updateOrders = async (limit: number, page: number) => {
    const reservations = (await getReservations({
      limit: limit,
      page: page,
      reservationStatus: app!.selectedReservationStatus,
    })) as PagedResult<ReservationModel>;
    updateApp("reservations", reservations);
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
    <ReservationTable
      items={app!.reservations.data}
      paging={{
        maxPages: app!.reservations.maxPageCount,
        maxRows: app!.reservations.maxRowCount,
        selectedRow: selectedRow.value,
        selectedPage: selectedPage,
        onRowsChange: handleRowChange,
        onPageChange: handlePageChange,
      }}
      onUpdate={handleUpdate}
    />
  );
};

export { ReservationTableSection };
