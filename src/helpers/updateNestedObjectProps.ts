/* eslint-disable @typescript-eslint/no-explicit-any */

/* 
  This function is created to process scpecific server api data. The function recieves
  an object with different number of keys, where keys' values may be objects of some interface
  or an array of objects of the same interface. The function receives two generic types as 
  parameters - to define the type of incoming object keys' values and resulting. The also 
  recieve a targetObj and a callback as its parameters. The targetObj is a object, which 
  properties are handled, and the callback is a function, that should return an updated object. 
  The function then just goes over all the targetObj properties, for every prop, checks if it's
  value is an object or an array of object. And calls the callback, for the object, or for the
  every element of the objects array. Then it constructs a new updated resultObj, with the same
  key names, but updated values and returns it.
*/

type NestedObject<PropObject> = {
  [key: string]: PropObject | PropObject[] | undefined;
};

export default function updateNestedObjectProps<TargetPropObject, ResultPropObject>(
  targetObj: NestedObject<TargetPropObject>,
  callback: (targetPropObject: TargetPropObject) => ResultPropObject,
): NestedObject<ResultPropObject> {
  const resultObj: Partial<NestedObject<ResultPropObject>> = {};
  for (const property in targetObj) {
    if (!Array.isArray(targetObj[property])) {
      resultObj[property] = callback(targetObj[property] as TargetPropObject);
    } else {
      const updatedPropObjects = (targetObj[property] as TargetPropObject[]).map((obj) => {
        return callback(obj);
      });
      resultObj[property] = updatedPropObjects;
    }
  }
  return resultObj as Record<any, ResultPropObject>;
}
