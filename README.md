# Object.setPrototypesOf
multiple inheritance using Proxies

## how
```js
const obj = {};

const baseObj1 = {prop: 'value'};
const baseObj2 = {prop2: 'value2'};
const baseObj3 = {prop3: 'value3'};

Object.setPrototypesOf(obj, baseObj1, baseObj2, baseObj3);
```

## get
```js
obj.prop; // 'value
obj.prop2; // 'value2
obj.prop3; // 'value3
```

## set
```js
obj.prop = 'new value';
obj.prop2 = 'new value2';
obj.prop3 = 'new value3';

obj; // {prop: 'new value', prop2: 'new value2', prop3: 'new value3'}

// WARNING
baseObj1.prop; // 'value'
baseObj2.prop2; // 'value2'
baseObj3.prop3; '// value3'
```
