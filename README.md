<p align="center">
  <img height="200px" src="./projects/demo/src/assets/ngx-flexbox-logo.svg
  ">
</p>
<br>

# ngx-flexbox

This lib was created as an alternative to @angular/flexlayout, and was heavily inspired by it.

NGX-FLEXBOX provides an easy layout API using Flexbox CSS. This module provides Angular developers with component layout features using a custom Layout API, mediaQuery observables, and injected DOM flexbox-2016 CSS stylings.

---

### Getting Started

Start by installing the Angular Layout library from [npm](https://www.npmjs.com/package/@philipibovo/ngx-flexbox)

`npm i -s @philipibovo/ngx-flexbox`

Next, you'll need to import the Layout module in your app's module.

**app.module.ts**

```ts

import { NgxFlexboxModule } from '@philipibovo/ngx-flexbox';
...

@NgModule({
    ...
    imports: [ NgxFlexboxModule ],
    ...
});
```

After that is configured, you can use the ngx-flexbox attributes in your HTML tags for flex layout:

```html
<div pbFxLayout="row" pbFxLayoutAlign="start space-between"></div>
```

Check out [all of the available options](https://philipi.bovo.me/ngx-flexbox) for using ngx-flexbox in your application.

---

### Browser Support

&nbsp;
<a href="http://caniuse.com/#feat=flexbox" target="_blank">
![caniuseflexbox](https://cloud.githubusercontent.com/assets/210413/21288118/917e3faa-c440-11e6-9b08-28aff590c7ae.png)
</a>

---

### License

The sources for this package are in the [ngx-flexbox](https://github.com/philipibovo/ngx-flexbox) repository. <br/>
Please file issues and pull requests against that repo.

License: MIT
