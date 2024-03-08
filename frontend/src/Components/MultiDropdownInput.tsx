import { useState } from "react";

export default function MultiDropdownInput<T extends string>({
  options,
  onSelect = () => {},
}: {
  options: T[];
  onSelect?: (selected: T[]) => void;
}) {
  const [selected, setSelected] = useState<V[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (type: T) => () => {
    setSelected((selected) => {
      const newSelected = selected.includes(type)
        ? // Remove if the same option is selected
          selected.filter((x) => x !== type)
        : // Add if option is not added yet
          [...selected, type];

      // Trigger onSelect callback
      onSelect(newSelected);

      return newSelected;
    });
  };

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
          {selected.reduce((selected, item) => {
            return `${selected}${selected.length > 0 ? ",  " : ""}${item}`;
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
            {options.map((type) => {
              return (
                <li
                  className=" text-main py-2 px-4 bg-[#FFFCFA] hover:bg-[#dcd7d3] cursor-pointer"
                  style={
                    selected.includes(type)
                      ? {
                          backgroundColor: "#392A2A",
                          color: "#F9F1E9",
                          borderColor: "#FFFCFA",
                        }
                      : undefined
                  }
                  onClick={handleSelect(type)}
                >
                  {type}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
