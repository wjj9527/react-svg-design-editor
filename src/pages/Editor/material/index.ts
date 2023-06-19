import GeneralComponent from './GeneralComponent'
const elementOptions = [
  GeneralComponent
]

let elementComponents = {}
let elementDefaultValues = {}

elementOptions.forEach(item=>{
  item.children.forEach(i=>{
    i.children.forEach(j=>{
      const {component,defaultValue,type} = j
      // @ts-ignore
      elementComponents[type] = component
      // @ts-ignore
      elementDefaultValues[type] = defaultValue
    })
  })
})

export {
  elementComponents,
  elementDefaultValues,
  elementOptions
}
