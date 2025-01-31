"use client";

import React, { useState } from "react";
import { Card } from "../components/ui/card";

interface ElementProps {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
}

const Element = ({ symbol, name, atomicNumber, category }: ElementProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "alkali-metal":
        return "bg-red-200 hover:bg-red-300";
      case "alkaline-earth":
        return "bg-orange-200 hover:bg-orange-300";
      case "transition-metal":
        return "bg-yellow-200 hover:bg-yellow-300";
      case "post-transition-metal":
        return "bg-green-200 hover:bg-green-300";
      case "metalloid":
        return "bg-teal-200 hover:bg-teal-300";
      case "nonmetal":
        return "bg-blue-200 hover:bg-blue-300";
      case "halogen":
        return "bg-indigo-200 hover:bg-indigo-300";
      case "noble-gas":
        return "bg-purple-200 hover:bg-purple-300";
      case "lanthanide":
        return "bg-pink-200 hover:bg-pink-300";
      case "actinide":
        return "bg-rose-200 hover:bg-rose-300";
      case "placeholder":
        return "invisible";
      default:
        return "bg-gray-200 hover:bg-gray-300";
    }
  };

  return (
    <Card
      className={`
        aspect-square flex flex-col items-center justify-center p-2
        transition-colors duration-200 cursor-pointer relative
        ${getCategoryColor(category)}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {category !== "placeholder" && (
        <>
          <span className="text-xs absolute top-1 left-1">{atomicNumber}</span>
          <span className="text-lg font-bold">{symbol}</span>
          {isHovered && (
            <span className="text-xs absolute bottom-1 text-center">
              {name}
            </span>
          )}
        </>
      )}
    </Card>
  );
};

const periodicTableData = [
  // Period 1
  { symbol: "H", name: "Hydrogen", atomicNumber: 1, category: "nonmetal" },
  ...Array(16).fill({
    symbol: "",
    name: "",
    atomicNumber: 0,
    category: "placeholder",
  }),
  { symbol: "He", name: "Helium", atomicNumber: 2, category: "noble-gas" },

  // Period 2
  { symbol: "Li", name: "Lithium", atomicNumber: 3, category: "alkali-metal" },
  {
    symbol: "Be",
    name: "Beryllium",
    atomicNumber: 4,
    category: "alkaline-earth",
  },
  ...Array(10).fill({
    symbol: "",
    name: "",
    atomicNumber: 0,
    category: "placeholder",
  }),
  { symbol: "B", name: "Boron", atomicNumber: 5, category: "metalloid" },
  { symbol: "C", name: "Carbon", atomicNumber: 6, category: "nonmetal" },
  { symbol: "N", name: "Nitrogen", atomicNumber: 7, category: "nonmetal" },
  { symbol: "O", name: "Oxygen", atomicNumber: 8, category: "nonmetal" },
  { symbol: "F", name: "Fluorine", atomicNumber: 9, category: "halogen" },
  { symbol: "Ne", name: "Neon", atomicNumber: 10, category: "noble-gas" },

  // Period 3
  { symbol: "Na", name: "Sodium", atomicNumber: 11, category: "alkali-metal" },
  {
    symbol: "Mg",
    name: "Magnesium",
    atomicNumber: 12,
    category: "alkaline-earth",
  },
  ...Array(10).fill({
    symbol: "",
    name: "",
    atomicNumber: 0,
    category: "placeholder",
  }),
  {
    symbol: "Al",
    name: "Aluminum",
    atomicNumber: 13,
    category: "post-transition-metal",
  },
  { symbol: "Si", name: "Silicon", atomicNumber: 14, category: "metalloid" },
  { symbol: "P", name: "Phosphorus", atomicNumber: 15, category: "nonmetal" },
  { symbol: "S", name: "Sulfur", atomicNumber: 16, category: "nonmetal" },
  { symbol: "Cl", name: "Chlorine", atomicNumber: 17, category: "halogen" },
  { symbol: "Ar", name: "Argon", atomicNumber: 18, category: "noble-gas" },

  // Period 4
  {
    symbol: "K",
    name: "Potassium",
    atomicNumber: 19,
    category: "alkali-metal",
  },
  {
    symbol: "Ca",
    name: "Calcium",
    atomicNumber: 20,
    category: "alkaline-earth",
  },
  {
    symbol: "Sc",
    name: "Scandium",
    atomicNumber: 21,
    category: "transition-metal",
  },
  {
    symbol: "Ti",
    name: "Titanium",
    atomicNumber: 22,
    category: "transition-metal",
  },
  {
    symbol: "V",
    name: "Vanadium",
    atomicNumber: 23,
    category: "transition-metal",
  },
  {
    symbol: "Cr",
    name: "Chromium",
    atomicNumber: 24,
    category: "transition-metal",
  },
  {
    symbol: "Mn",
    name: "Manganese",
    atomicNumber: 25,
    category: "transition-metal",
  },
  {
    symbol: "Fe",
    name: "Iron",
    atomicNumber: 26,
    category: "transition-metal",
  },
  {
    symbol: "Co",
    name: "Cobalt",
    atomicNumber: 27,
    category: "transition-metal",
  },
  {
    symbol: "Ni",
    name: "Nickel",
    atomicNumber: 28,
    category: "transition-metal",
  },
  {
    symbol: "Cu",
    name: "Copper",
    atomicNumber: 29,
    category: "transition-metal",
  },
  {
    symbol: "Zn",
    name: "Zinc",
    atomicNumber: 30,
    category: "transition-metal",
  },
  {
    symbol: "Ga",
    name: "Gallium",
    atomicNumber: 31,
    category: "post-transition-metal",
  },
  { symbol: "Ge", name: "Germanium", atomicNumber: 32, category: "metalloid" },
  { symbol: "As", name: "Arsenic", atomicNumber: 33, category: "metalloid" },
  { symbol: "Se", name: "Selenium", atomicNumber: 34, category: "nonmetal" },
  { symbol: "Br", name: "Bromine", atomicNumber: 35, category: "halogen" },
  { symbol: "Kr", name: "Krypton", atomicNumber: 36, category: "noble-gas" },

  // Period 5
  {
    symbol: "Rb",
    name: "Rubidium",
    atomicNumber: 37,
    category: "alkali-metal",
  },
  {
    symbol: "Sr",
    name: "Strontium",
    atomicNumber: 38,
    category: "alkaline-earth",
  },
  {
    symbol: "Y",
    name: "Yttrium",
    atomicNumber: 39,
    category: "transition-metal",
  },
  {
    symbol: "Zr",
    name: "Zirconium",
    atomicNumber: 40,
    category: "transition-metal",
  },
  {
    symbol: "Nb",
    name: "Niobium",
    atomicNumber: 41,
    category: "transition-metal",
  },
  {
    symbol: "Mo",
    name: "Molybdenum",
    atomicNumber: 42,
    category: "transition-metal",
  },
  {
    symbol: "Tc",
    name: "Technetium",
    atomicNumber: 43,
    category: "transition-metal",
  },
  {
    symbol: "Ru",
    name: "Ruthenium",
    atomicNumber: 44,
    category: "transition-metal",
  },
  {
    symbol: "Rh",
    name: "Rhodium",
    atomicNumber: 45,
    category: "transition-metal",
  },
  {
    symbol: "Pd",
    name: "Palladium",
    atomicNumber: 46,
    category: "transition-metal",
  },
  {
    symbol: "Ag",
    name: "Silver",
    atomicNumber: 47,
    category: "transition-metal",
  },
  {
    symbol: "Cd",
    name: "Cadmium",
    atomicNumber: 48,
    category: "transition-metal",
  },
  {
    symbol: "In",
    name: "Indium",
    atomicNumber: 49,
    category: "post-transition-metal",
  },
  {
    symbol: "Sn",
    name: "Tin",
    atomicNumber: 50,
    category: "post-transition-metal",
  },
  { symbol: "Sb", name: "Antimony", atomicNumber: 51, category: "metalloid" },
  { symbol: "Te", name: "Tellurium", atomicNumber: 52, category: "metalloid" },
  { symbol: "I", name: "Iodine", atomicNumber: 53, category: "halogen" },
  { symbol: "Xe", name: "Xenon", atomicNumber: 54, category: "noble-gas" },

  // Period 6
  { symbol: "Cs", name: "Cesium", atomicNumber: 55, category: "alkali-metal" },
  {
    symbol: "Ba",
    name: "Barium",
    atomicNumber: 56,
    category: "alkaline-earth",
  },
  { symbol: "La", name: "Lanthanum", atomicNumber: 57, category: "lanthanide" },
  {
    symbol: "Hf",
    name: "Hafnium",
    atomicNumber: 72,
    category: "transition-metal",
  },
  {
    symbol: "Ta",
    name: "Tantalum",
    atomicNumber: 73,
    category: "transition-metal",
  },
  {
    symbol: "W",
    name: "Tungsten",
    atomicNumber: 74,
    category: "transition-metal",
  },
  {
    symbol: "Re",
    name: "Rhenium",
    atomicNumber: 75,
    category: "transition-metal",
  },
  {
    symbol: "Os",
    name: "Osmium",
    atomicNumber: 76,
    category: "transition-metal",
  },
  {
    symbol: "Ir",
    name: "Iridium",
    atomicNumber: 77,
    category: "transition-metal",
  },
  {
    symbol: "Pt",
    name: "Platinum",
    atomicNumber: 78,
    category: "transition-metal",
  },
  {
    symbol: "Au",
    name: "Gold",
    atomicNumber: 79,
    category: "transition-metal",
  },
  {
    symbol: "Hg",
    name: "Mercury",
    atomicNumber: 80,
    category: "transition-metal",
  },
  {
    symbol: "Tl",
    name: "Thallium",
    atomicNumber: 81,
    category: "post-transition-metal",
  },
  {
    symbol: "Pb",
    name: "Lead",
    atomicNumber: 82,
    category: "post-transition-metal",
  },
  {
    symbol: "Bi",
    name: "Bismuth",
    atomicNumber: 83,
    category: "post-transition-metal",
  },
  {
    symbol: "Po",
    name: "Polonium",
    atomicNumber: 84,
    category: "post-transition-metal",
  },
  { symbol: "At", name: "Astatine", atomicNumber: 85, category: "halogen" },
  { symbol: "Rn", name: "Radon", atomicNumber: 86, category: "noble-gas" },

  // Period 7
  {
    symbol: "Fr",
    name: "Francium",
    atomicNumber: 87,
    category: "alkali-metal",
  },
  {
    symbol: "Ra",
    name: "Radium",
    atomicNumber: 88,
    category: "alkaline-earth",
  },
  { symbol: "Ac", name: "Actinium", atomicNumber: 89, category: "actinide" },
  {
    symbol: "Rf",
    name: "Rutherfordium",
    atomicNumber: 104,
    category: "transition-metal",
  },
  {
    symbol: "Db",
    name: "Dubnium",
    atomicNumber: 105,
    category: "transition-metal",
  },
  {
    symbol: "Sg",
    name: "Seaborgium",
    atomicNumber: 106,
    category: "transition-metal",
  },
  {
    symbol: "Bh",
    name: "Bohrium",
    atomicNumber: 107,
    category: "transition-metal",
  },
  {
    symbol: "Hs",
    name: "Hassium",
    atomicNumber: 108,
    category: "transition-metal",
  },
  {
    symbol: "Mt",
    name: "Meitnerium",
    atomicNumber: 109,
    category: "transition-metal",
  },
  {
    symbol: "Ds",
    name: "Darmstadtium",
    atomicNumber: 110,
    category: "transition-metal",
  },
  {
    symbol: "Rg",
    name: "Roentgenium",
    atomicNumber: 111,
    category: "transition-metal",
  },
  {
    symbol: "Cn",
    name: "Copernicium",
    atomicNumber: 112,
    category: "transition-metal",
  },
  {
    symbol: "Nh",
    name: "Nihonium",
    atomicNumber: 113,
    category: "post-transition-metal",
  },
  {
    symbol: "Fl",
    name: "Flerovium",
    atomicNumber: 114,
    category: "post-transition-metal",
  },
  {
    symbol: "Mc",
    name: "Moscovium",
    atomicNumber: 115,
    category: "post-transition-metal",
  },
  {
    symbol: "Lv",
    name: "Livermorium",
    atomicNumber: 116,
    category: "post-transition-metal",
  },
  { symbol: "Ts", name: "Tennessine", atomicNumber: 117, category: "halogen" },
  { symbol: "Og", name: "Oganesson", atomicNumber: 118, category: "noble-gas" },
];

const lanthanideData = [
  { symbol: "La", name: "Lanthanum", atomicNumber: 57, category: "lanthanide" },
  { symbol: "Ce", name: "Cerium", atomicNumber: 58, category: "lanthanide" },
  {
    symbol: "Pr",
    name: "Praseodymium",
    atomicNumber: 59,
    category: "lanthanide",
  },
  { symbol: "Nd", name: "Neodymium", atomicNumber: 60, category: "lanthanide" },
  {
    symbol: "Pm",
    name: "Promethium",
    atomicNumber: 61,
    category: "lanthanide",
  },
  { symbol: "Sm", name: "Samarium", atomicNumber: 62, category: "lanthanide" },
  { symbol: "Eu", name: "Europium", atomicNumber: 63, category: "lanthanide" },
  {
    symbol: "Gd",
    name: "Gadolinium",
    atomicNumber: 64,
    category: "lanthanide",
  },
  { symbol: "Tb", name: "Terbium", atomicNumber: 65, category: "lanthanide" },
  {
    symbol: "Dy",
    name: "Dysprosium",
    atomicNumber: 66,
    category: "lanthanide",
  },
  { symbol: "Ho", name: "Holmium", atomicNumber: 67, category: "lanthanide" },
  { symbol: "Er", name: "Erbium", atomicNumber: 68, category: "lanthanide" },
  { symbol: "Tm", name: "Thulium", atomicNumber: 69, category: "lanthanide" },
  { symbol: "Yb", name: "Ytterbium", atomicNumber: 70, category: "lanthanide" },
  { symbol: "Lu", name: "Lutetium", atomicNumber: 71, category: "lanthanide" },
];

const actinideData = [
  { symbol: "Ac", name: "Actinium", atomicNumber: 89, category: "actinide" },
  { symbol: "Th", name: "Thorium", atomicNumber: 90, category: "actinide" },
  {
    symbol: "Pa",
    name: "Protactinium",
    atomicNumber: 91,
    category: "actinide",
  },
  { symbol: "U", name: "Uranium", atomicNumber: 92, category: "actinide" },
  { symbol: "Np", name: "Neptunium", atomicNumber: 93, category: "actinide" },
  { symbol: "Pu", name: "Plutonium", atomicNumber: 94, category: "actinide" },
  { symbol: "Am", name: "Americium", atomicNumber: 95, category: "actinide" },
  { symbol: "Cm", name: "Curium", atomicNumber: 96, category: "actinide" },
  { symbol: "Bk", name: "Berkelium", atomicNumber: 97, category: "actinide" },
  { symbol: "Cf", name: "Californium", atomicNumber: 98, category: "actinide" },
  { symbol: "Es", name: "Einsteinium", atomicNumber: 99, category: "actinide" },
  { symbol: "Fm", name: "Fermium", atomicNumber: 100, category: "actinide" },
  {
    symbol: "Md",
    name: "Mendelevium",
    atomicNumber: 101,
    category: "actinide",
  },
  { symbol: "No", name: "Nobelium", atomicNumber: 102, category: "actinide" },
  { symbol: "Lr", name: "Lawrencium", atomicNumber: 103, category: "actinide" },
];

export default function PeriodicTable() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-18 gap-1">
        {periodicTableData.map((element, index) => (
          <Element
            key={`element-${index}`}
            symbol={element.symbol}
            name={element.name}
            atomicNumber={element.atomicNumber}
            category={element.category}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-14 gap-1">
        {/* Lanthanides */}
        {lanthanideData.map((element, index) => (
          <Element
            key={`lanthanide-${index}`}
            symbol={element.symbol}
            name={element.name}
            atomicNumber={element.atomicNumber}
            category={element.category}
          />
        ))}

        {/* Actinides */}
        {actinideData.map((element, index) => (
          <Element
            key={`actinide-${index}`}
            symbol={element.symbol}
            name={element.name}
            atomicNumber={element.atomicNumber}
            category={element.category}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-5 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-200"></div>
          <span>Alkali Metals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-200"></div>
          <span>Alkaline Earth Metals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-200"></div>
          <span>Transition Metals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-200"></div>
          <span>Post-transition Metals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-teal-200"></div>
          <span>Metalloids</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200"></div>
          <span>Nonmetals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-indigo-200"></div>
          <span>Halogens</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-200"></div>
          <span>Noble Gases</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-200"></div>
          <span>Lanthanides</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-rose-200"></div>
          <span>Actinides</span>
        </div>
      </div>
    </div>
  );
}
