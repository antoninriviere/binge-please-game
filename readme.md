# Ultimate blind test prototype

## URL
[localhost:8080](http://localhost:8080/)

## Local installation

- Create a VHOST (ex: `ultimate-bt.local`) pointing on `/`
- Using the terminal go to `/`
- Install [Node.js](https://nodejs.org/)
- Using the terminal go to `/` and run following commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

#### Webpack Aliases /
> Webpack aliases are defined in /build/webpack.base.conf.js, modify or add here :

```javascript
alias: {
    vue$: 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    styles: path.resolve(__dirname, '../src/styles'),
    Components: path.resolve(__dirname, '../src/scripts/components'),
    Config: path.resolve(__dirname, '../src/scripts/config')
}
```

Let's play bitchies :clown_face:
