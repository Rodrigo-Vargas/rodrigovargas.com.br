---
   date: '2018-12-25'
   excerpt: My solution to that algorhytm
   locale: en
   title: FreeCodeCamp Falsy Bouncer Algorhytm
---

## Introduction

Hi guys, in that article I will explain one way to do that algorhytm. But first, it is how it looks like in the end.

```js
   /*
      url: https://www.freecodecamp.com/challenges/falsy-bouncer
      name: Falsy Bouncer
      description:  Remove all falsy values from an array.
                     Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.
   */

   function bouncer(arr) {
      return arr.filter(function(val){
         return val;
      });
   }

   bouncer([7, "ate", "", false, 9]);
```

## Explanation

The function "filter" from JavaScript, make things simple in that case. This function will iterate the array "arr" and executing the anonymous function that i pass as argument to it. This function that i'm talking about would be:

```js
function(val){
   return val;
}
```

The parameter "val" is automatically fullfilled by the "filter" function and represent the current iteration value.

If that anonymous function return "false", or other values that represent false to JavaScript, like an empty string or "null", the "filter" function will discard that element in the filtered array. If "true" or something equivalent to true, like a value, will be returned, the original value will be present in the filtered array.

To simplify things, we can just return the value and let JavaScript do the evaluation of value.

That is it guys, let me know if you have any suggestion or doubts about that algorhytm. See you later.
