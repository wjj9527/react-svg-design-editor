import AttributeBlock from "./AttributeBlock";
import StyleBlock from "./StyleBlock";
import DataSourceBlock from "./DataSourceBlock";
import SettingWrapper from "@/pages/Editor/components/SettingWrapper";
const config = [
  {
    label:'样式',
    key:'StyleBlock',
    component:StyleBlock
  },
  {
    label:'属性',
    key:'AttributeBlock',
    component:AttributeBlock
  },
  {
    label:'数据',
    key:'DataSourceBlock',
    component:DataSourceBlock
  },
]

export default <SettingWrapper config={config}/>
