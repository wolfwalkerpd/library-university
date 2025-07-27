import { HexColorInput, HexColorPicker } from "react-colorful";
import { useState } from "react";

interface Props {
  value?: string;
  OnPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, OnPickerChange }: Props) => {
  const [color, setColor] = useState("#aabbcc");
  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={OnPickerChange}
          className="hex-input"
        />
      </div>
        <HexColorPicker color={value} onChange={OnPickerChange} />
    </div>
  );
};

export default ColorPicker;
