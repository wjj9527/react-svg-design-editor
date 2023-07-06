import AttributeBlock from './AttributeBlock';
import StyleBlock from './StyleBlock';
import SettingWrapper from '@/pages/Editor/components/SettingWrapper';
import StyleSetting from '@/pages/Editor/components/StyleSetting';
import EventSetting from '@/pages/Editor/components/EventSetting';
const styleConfig: any = [
  'Size',
  'Position',
  'Text',
  'FontFamily',
  'FontSize',
  'Color',
  'FontWeight',
  'LetterSpacing',
  'LineHeight',
  'BackgroundColor',
];

const config = [
  {
    label: '样式',
    key: 'StyleBlock',
    component: <StyleSetting config={styleConfig} />,
  },
  {
    label: '属性',
    key: 'AttributeBlock',
    component: <AttributeBlock />,
  },
  {
    label: '数据',
    key: 'DataSourceBlock',
    component: <EventSetting changeStyleConfig={styleConfig} />,
  },
];

export default <SettingWrapper config={config} />;
