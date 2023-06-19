import GeneralComponent from './GeneralComponent'
const elementOptions = [
  GeneralComponent
]

let elementComponents = {}
let elementDefaultValues = {}
let elementSetting = {}
elementOptions.forEach(item=>{
  item.children.forEach(i=>{
    i.children.forEach(j=>{
      const {component,defaultValue,type,setting} = j
      // @ts-ignore
      elementComponents[type] = component
      // @ts-ignore
      elementDefaultValues[type] = defaultValue
      // @ts-ignore
      elementSetting[type] = setting
    })
  })
})

export {
  elementComponents,
  elementDefaultValues,
  elementOptions,
  elementSetting
}
