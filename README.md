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
baseObj3.prop3; // 'value3'
```

## getters
**this** into getters will point to **obj** if a getter was invoked by **obj** itself
```js
aBaseObj; // {get foo() { return this.bar }, bar: 42}
obj; // {bar:'baz'}

obj.foo; // 'baz'
```

## setters
**this** into setters will point to **obj** if a setter was invoked by **obj** itself
```js
aBaseObj; // {set foo(value) { this.bar = value }, bar: 42}
ob; // {}

obj.foo = 'baz';
obj; // {bar: 'baz'}

// WARNING
aBaseObj; // {bar: 42}
```
