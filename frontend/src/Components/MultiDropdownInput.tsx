import { useState } from "react";

export default function MultiDropdownInput<
  T extends { label: string; id: number }
>({
  options,
  onSelect = () => {},
  defaultValue = [],
}: {
  options: T[];
  onSelect?: (selected: T[]) => void;
  defaultValue?: T["id"][];
}) {
  const [selectedId, setSelected] = useState<T["id"][]>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionId: T["id"]) => () => {
    setSelected((selectedId) => {
      const isAlreadySelected = selectedId.includes(optionId);

      const newSelected = isAlreadySelected
        ? // Remove if the same option is selected
          selectedId.filter((id) => id !== optionId)
        : // Add if option is not added yet
          [...selectedId, optionId];

      // Trigger onSelect callback
      onSelect(options.filter((option) => newSelected.includes(option.id)));

      return newSelected;
    });
  };

  const selectedItems = options.filter((option) =>
    selectedId.includes(option.id)
  );

  const handleOpen = () => {
    setIsOpen((current) => !current);
  };
  return (
    <div className="relative">
      <div
        className="px-4 py-2 border-[1.5px] border-main rounded-md cursor-pointer flex justify-between items-center group"
        onClick={handleOpen}
      >
        <p>
          {selectedItems.reduce((selected, item) => {
            return `${selected}${selected.length > 0 ? ",  " : ""}${
              item.label
            }`;
          }, "") || "Select Category"}
        </p>
        <i
          className="bx bx-chevron-down text-title text-main transition-all duration-300 group-hover:text-main/50"
          style={{
            rotate: isOpen ? "180deg" : "0deg",
          }}
        ></i>
      </div>
      <div
        className="absolute w-full grid transition-all duration-300"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="divide-y-[1px] divide-main mt-4 border-[1.5px] border-main rounded-md overflow-hidden">
            {options.map((option) => {
              return (
                <li
                  className=" text-main py-2 px-4 bg-[#FFFCFA] hover:bg-[#dcd7d3] cursor-pointer"
                  style={
                    selectedId.includes(option.id)
                      ? {
                          backgroundColor: "#392A2A",
                          color: "#F9F1E9",
                          borderColor: "#FFFCFA",
                        }
                      : undefined
                  }
                  onClick={handleSelect(option.id)}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
