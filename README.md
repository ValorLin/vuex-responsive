# vuex-responsive
A vuex responsive solution.

## Install
```
npm i vuex-responsive -S
```

## Usage
Setup:
```js
import vuexResponsive from 'vuex-responsive';

const store = new Vuex.Store({
  plugins: [vuexResponsive]
});
```

Use it in your component:
```html
<template>
    <div>
    <div v-show="responsive.xs">xs</div>
    <div v-show="responsive.sm">sm</div>
    <div v-show="responsive.md">md</div>
    <div v-show="responsive.lg">lg</div>
    <div v-show="responsive.xl">xl</div>
    <div v-show="responsive.only.xs">xs only</div>
    <div v-show="responsive.only.sm">sm only</div>
    <div v-show="responsive.only.md">md only</div>
    <div v-show="responsive.only.lg">lg only</div>
    <div v-show="responsive.only.xl">xl only</div>
    </div>
</template>
<script>
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters} = createNamespacedHelpers('responsive');

    export default {
        name: 'demo',
        computed: {...mapGetters(['responsive'])}
    }
</script>
```

