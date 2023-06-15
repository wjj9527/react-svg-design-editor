// @ts-ignore
export const findElementById=(
  id:string,
  schema:any,
) =>{
  if (schema.id === id) {
    return { element: schema, parent: null };
  }
  if (schema.itemNodes) {
    for (let i = 0; i < schema.itemNodes.length; i++) {
      const child = schema.itemNodes[i];
      if (child.id === id) {
        return { element: child, parent: schema };
      } else {
        // @ts-ignore
        const result = findElementById(id,child, );
        if (result.element !== null) {
          return result;
        }
      }
    }
  }
  return { element: null, parent: null };
}
