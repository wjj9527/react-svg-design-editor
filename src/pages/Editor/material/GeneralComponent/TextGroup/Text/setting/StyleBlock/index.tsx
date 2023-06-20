import React, { useContext } from 'react';
import { StoreContext } from '@/store';
import { findElementById } from '@/utils/findElementById';
import SettingItemBlock from '@/pages/Editor/components/SettingItemBlock';
const {
  Position,
  Size,
  Text,
  FontFamily,
  FontSize,
  Color,
  FontWeight,
  LetterSpacing,
  LineHeight,
  BackgroundColor,
} = SettingItemBlock;

const StyleBlock: React.FC = () => {
  const { state } = useContext(StoreContext);
  const { schema, activeKey } = state;
  const { element } = findElementById(activeKey, schema);
  return (
    <div className="setting-container">
      <Size element={element} />
      <Position element={element} />
      <Text element={element} />
      <FontFamily element={element} />
      <FontSize element={element} />
      <Color element={element} />
      <FontWeight element={element} />
      <LetterSpacing element={element} />
      <LineHeight element={element} />
      <BackgroundColor element={element} />
    </div>
  );
};
export default StyleBlock;
