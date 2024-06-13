import { put } from "@/apihelper";
import styles from "./OptionsSection.module.css";
import { HoursRange, TextInput } from "@/components";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useInput, useMultipleHoursRange } from "@/hooks";
import { SettingModel } from "@/types";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const OptionsSection = () => {
  const [app, updateApp] = useAppContext();
  const data = useLoaderData() as SettingModel;

  const street = useInput([], data.street);
  const city = useInput([], data.city);
  const zipCode = useInput([], data.zipCode);
  const phone = useInput([], data.phone);
  const facebook = useInput([], data.facebook);
  const deliveryRange = useInput([], data.deliveryRange?.toString());
  const deliveryPrice = useInput([], data.deliveryPrice?.toString());
  const email = useInput([], data.email);

  const days = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ];
  const openingHours = useMultipleHoursRange(
    days.map((day, i) => ({
      title: day,
      from: data.openingHours[i].from,
      to: data.openingHours[i].to,
    }))
  );
  const deliveryHours = useMultipleHoursRange(
    days.map((day, i) => ({
      title: day,
      from: data.deliveryHours[i].from,
      to: data.deliveryHours[i].to,
    }))
  );

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    updateApp("settings", data);
  }, []);

  const hours = Array.from({ length: 48 }, (_, i) => i).map((hour) => {
    const isHalf = hour % 2 === 1;

    const hours = Math.floor(hour / 2);
    if (isHalf) {
      return {
        label: `${hours.toString().padStart(2, "0")}:30`,
        value: `${hours.toString().padStart(2, "0")}:30:00`,
      };
    }

    return {
      label: `${hours.toString().padStart(2, "0")}:00`,
      value: `${hours.toString().padStart(2, "0")}:00:00`,
    };
  });

  const handleConfirm = async () => {
    const settings = {
      ...app!.settings,
      street: street.value,
      city: city.value,
      zipCode: zipCode.value,
      phone: phone.value,
      facebook: facebook.value,
      email: email.value,
      deliveryPrice: parseFloat(deliveryPrice.value!),
      deliveryRange: parseFloat(deliveryRange.value!),
      openingHours: openingHours.hours.map((hour) => ({
        from: hour.from,
        to: hour.to,
      })),
      deliveryHours: deliveryHours.hours.map((hour) => ({
        from: hour.from,
        to: hour.to,
      })),
    };

    const res = await put("setting", settings);

    updateApp("settings", res);

    setIsEdit(false);
  };

  const handleCancel = () => {
    street.setValue(app!.settings!.street);
    city.setValue(app!.settings!.city);
    zipCode.setValue(app!.settings!.zipCode);
    phone.setValue(app!.settings!.phone);
    facebook.setValue(app!.settings!.facebook);
    email.setValue(app!.settings!.email);
    deliveryPrice.setValue(app!.settings!.deliveryPrice?.toString());
    deliveryRange.setValue(app!.settings!.deliveryRange?.toString());

    openingHours.setValues(
      days.map((day, i) => ({
        title: day,
        from: app!.settings!.openingHours[i].from,
        to: app!.settings!.openingHours[i].to,
      }))
    );

    deliveryHours.setValues(
      days.map((day, i) => ({
        title: day,
        from: app!.settings!.deliveryHours[i].from,
        to: app!.settings!.deliveryHours[i].to,
      }))
    );

    setIsEdit(false);
  };

  return (
    <div className={classNames(styles["OptionsSection"], "w-full p-4")}>
      <div className="max-w-[700px]">
        <ul className={styles["Items"]}>
          <li>
            <TextInput
              captionTop
              caption="Ulica"
              {...street}
              readonly={!isEdit}
            />
          </li>
          <li>
            <TextInput
              captionTop
              caption="Miasto"
              {...city}
              readonly={!isEdit}
            />
          </li>
          <li>
            <TextInput
              captionTop
              caption="Kod pocztowy"
              {...zipCode}
              readonly={!isEdit}
            />
          </li>
          <li>
            <TextInput
              captionTop
              caption="Telefon"
              {...phone}
              readonly={!isEdit}
            />
          </li>
          <li>
            <TextInput
              captionTop
              caption="Email"
              {...email}
              readonly={!isEdit}
            />
          </li>
          <li>
            <TextInput
              captionTop
              caption="Facebook"
              {...facebook}
              readonly={!isEdit}
            />
          </li>
        </ul>
        <ul className={classNames(styles["Items"], "mt-4")}>
          <li>
            <TextInput
              captionTop
              caption="Cena dostawy za kilometr"
              numeric
              {...deliveryPrice}
              readonly={!isEdit}
            />
          </li>
          <li>
            <TextInput
              captionTop
              caption="Zasięg dostawy (km)"
              numeric
              {...deliveryRange}
              readonly={!isEdit}
            />
          </li>
        </ul>
        <ul className={styles["Hours"]}>
          <li>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Godziny otwarcia</p>
              <ul className="flex flex-col gap-2">
                {openingHours.hours.map((hour, key) => (
                  <li key={key}>
                    <HoursRange
                      readonly={!isEdit}
                      options={hours}
                      fromChange={(value: string) =>
                        openingHours.onFromChange(key, value)
                      }
                      toChange={(value: string) =>
                        openingHours.onToChange(key, value)
                      }
                      {...hour}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className={styles["To"]}>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Godziny dostawy</p>
              <ul className="flex flex-col gap-2">
                {deliveryHours.hours.map((hour, key) => (
                  <li key={key}>
                    <HoursRange
                      readonly={!isEdit}
                      options={hours}
                      fromChange={(value: string) =>
                        deliveryHours.onFromChange(key, value)
                      }
                      toChange={(value: string) =>
                        deliveryHours.onToChange(key, value)
                      }
                      {...hour}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
        <div className="flex gap-4 mt-8">
          {isEdit ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Anuluj
              </Button>
              <Button onClick={handleConfirm}>Zatwierdź</Button>
            </>
          ) : (
            <Button onClick={() => setIsEdit(true)}>Edytuj</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { OptionsSection };
