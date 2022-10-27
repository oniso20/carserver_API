# Car storage API

## **getAllModels()**

return the names of all models in storage as an array of strings

The name is added to the array only ones. If nothin found, returns aan empty array

## **getCar(key, value)**

get all car object in an array that matches the given key-value pair.

- returns car objects in the array
- if there is no match, an empty array is returned

### Example

```js
getCar('model', 'Fast GT')
getCar('license, 'ABC-1')
```

## **getAllCars()**

return all car objects in an array or an empty array
