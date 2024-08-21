import React, { useState } from "react";
import { Collapse, Checkbox, Button } from "antd";
import {
  CaretRightOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { FilterOptions } from "@/types/types";

// const { Panel } = Collapse;

const filterOptions: FilterOptions = {
  size: ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
  fabric: [
    "Cotton Blend",
    "Elastane",
    "Nylon",
    "Organic Cotton",
    "Poly Cotton",
    "Polyester",
    "Pure Cotton",
  ],
  color: [
    "Black",
    "Blue",
    "Brown",
    "Dark Blue",
    "Dark Green",
    "Green",
    "Grey",
    "Light Blue",
    "Light Green",
    "Maroon",
    "Multicolor",
    "Navy Blue",
    "Orange",
    "Purple",
    "Red",
    "Silver",
    "White",
    "Yellow",
  ],
  gender: ["Male", "Female", "Unisex"],
  pattern: [
    "Animal Print",
    "Cartoon",
    "Colorblock",
    "Graphic Print",
    "Printed",
    "Self Design",
    "Solid",
    "Striped",
    "Typography",
  ],
  discount: [
    "30% or more",
    "40% or more",
    "50% or more",
    "60% or more",
    "70% or more",
  ],
  occasion: ["Casual", "Formal", "Party", "Sports", "Ethnic"],
};

const FilterContent = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    size: [],
    fabric: [],
    color: [],
    discount: [],
    pattern: [],
    gender: [],
    occasion: [],
  });

  const [showAllColors, setShowAllColors] = useState<boolean>(false);

  const handleFilterChange =
    (category: keyof FilterOptions) => (checkedValues: string[]) => {
      setSelectedFilters({
        ...selectedFilters,
        [category]: checkedValues,
      });
    };

  const clearAll = (category: keyof FilterOptions) => {
    setSelectedFilters({
      ...selectedFilters,
      [category]: [],
    });
  };

  const removeFilter = (category: keyof FilterOptions, value: string) => {
    setSelectedFilters({
      ...selectedFilters,
      [category]: selectedFilters[category].filter((item) => item !== value),
    });
  };

  const toggleShowAllColors = () => {
    setShowAllColors(!showAllColors);
  };

  const renderSelectedFilters = () => {
    return Object.keys(selectedFilters).flatMap((category) =>
      selectedFilters[category as keyof FilterOptions].map((value) => (
        <div
          key={`${category}-${value}`}
          className="inline-block m-1 py-[1px] px-2 bg-[#e0e0e0] rounded text-sm"
        >
          {value}
          {/* @ts-ignore */}
          <CloseOutlined
            className="ml-[5px] cursor-pointer text-sm"
            onClick={() => removeFilter(category as keyof FilterOptions, value)}
          />
        </div>
      ))
    );
  };

  const items = Object.keys(filterOptions).map((category) => ({
    key: category,
    label: category.toUpperCase(),
    children: (
      <>
        <div
          onClick={() => clearAll(category as keyof FilterOptions)}
          style={{ cursor: "pointer", marginBottom: "10px", color: "blue" }}
        >
          {selectedFilters[category as keyof FilterOptions].length ? (
            <>
              {/* @ts-ignore */}
              <CloseOutlined /> Clear all
            </>
          ) : (
            ""
          )}
        </div>
        <Checkbox.Group
          className="flex flex-col" // Add custom class
          value={selectedFilters[category as keyof FilterOptions]}
          onChange={handleFilterChange(category as keyof FilterOptions)}
        >
          {filterOptions[category as keyof FilterOptions]
            .slice(
              0,
              category === "color" && !showAllColors
                ? 7
                : filterOptions[category as keyof FilterOptions].length
            )
            .map((option) => (
              <Checkbox key={option} value={option}>
                {option}
              </Checkbox>
            ))}
        </Checkbox.Group>
        {category === "color" &&
          filterOptions[category as keyof FilterOptions].length > 7 && (
            <Button
              type="link"
              onClick={toggleShowAllColors}
              style={{ paddingLeft: 0 }}
            >
              {showAllColors ? "Show less" : "Show more"}
            </Button>
          )}
      </>
    ),
  }));
  const handleSearch = async () => {
    console.log(selectedFilters, "selectedFilters");
    // const products = await fetchProducts(selectedFilters);
    // console.log(products, "products");
  };
  return (
    <div>
      <div className="flex sticky top-0 z-[9] bg-white justify-between px-4 py-2">
        <p>Filters</p>
        <div className="flex gap-4 items-center">
          <Button
            style={{ background: "#2563eb", color: "white" }}
            //  @ts-ignore
            icon={<SearchOutlined />}
            //  @ts-ignore
            iconPosition="start"
            onClick={handleSearch}
          >
            Search
          </Button>
          <p
            className="text-blue-600"
            style={{ cursor: "pointer" }}
            onClick={() =>
              setSelectedFilters({
                size: [],
                fabric: [],
                color: [],
                discount: [],
                pattern: [],
                gender: [],
                occasion: [],
              })
            }
          >
            Clear all
          </p>
        </div>
      </div>
      <div className="border-b">{renderSelectedFilters()}</div>
      <Collapse
        items={items}
        expandIcon={({ isActive }) => (
          //  @ts-ignore
          <CaretRightOutlined rotate={isActive ? 270 : 90} />
        )}
        expandIconPosition="end"
        bordered={false}
      />
    </div>
  );
};

export default FilterContent;
