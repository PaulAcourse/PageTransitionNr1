<template>
  <router-view v-slot="{ Component }">
  <navigation :links="routes"></navigation>
  <transition
      @enter="enter"
      @leave="leave"
      :css="false"
      mode="out-in">
    <component :is="Component" />

  </transition>
  </router-view>
</template>

<script>

import navigation from "./components/navigation"
import router from './router/'

import {gsap} from "gsap";
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText);

gsap.defaults({
  duration: 1,
  ease: 'power3.inOut',
});


const enterTextAnimation = text => {
  const tl = gsap.timeline();

  tl.fromTo(
      text,
      {
        yPercent: '100',
        opacity: 0,
      },
      {
        yPercent: '0',
        opacity: 1,
        stagger: 0.014,
      }
  );

  return tl;
};

const leaveTextAnimation = text => {
  const tl = gsap.timeline();

  tl.to(text, {
    yPercent: '-100',
    opacity: 0,
    stagger: 0.014,
  });

  return tl;
};

const lineSplit = lines => {
  const line = new SplitText(lines, {
    type: 'lines, words, chars',
    linesClass: 'split-line',
  });

  return line;
};

const wipeY = (el, origin, value) => {
  const tl = gsap.timeline();

  tl.to(el, {
    scaleY: value,
    transformOrigin: origin,
    force3D: true,
    ease: 'power3.inOut',
  });

  return tl;
};

const wipeFromY = (el, origin, value) => {
  const tl = gsap.timeline();

  tl.from(el, {
    scaleY: value,
    transformOrigin: origin,
    force3D: true,
  });

  return tl;
};

const skewOutUp = element => {
  const tl = gsap.timeline();

  tl.to(element, {
    y: '-60',
    opacity: 0,
    skewY: 2,
  });

  return tl;
};

const skewInUp = element => {
  const tl = gsap.timeline();

  tl.from(element, {
    y: '60',
    opacity: 0,
    skewY: 2,
  });

  return tl;
};

const scaleOut = el => {
  const tl = gsap.timeline();

  tl.from(el, {
    scale: 1.2,
    y: 80,
    duration: 1.2,
    ease: 'power3.inOut',
  });

  return tl;
};




export default {
  name: 'App',
  router,



  components: {
    navigation
  },

  data() {
    return {

     routes: this.$router.options.routes

    }
  },



  methods: {
    leave(el, done) {
      const heroTitle = lineSplit('.hero__title');
      const heroText = lineSplit('.hero__text');

      const master = gsap.timeline({
        onStart: () => {
          document.body.classList.add('body--overflow');
        },
        onComplete: () => {
          done();
        },
      });

      master
          .add(leaveTextAnimation(heroTitle.chars))
          .add(skewOutUp(heroText.lines), '<')
          .add(skewOutUp('.hero .btn'), '<')
          .add(wipeY('.hero__overlay', 'center bottom', 1), '-=1.3');
    },
    enter(el, done) {
      const heroTitle = lineSplit('.hero__title');
      const heroText = lineSplit('.hero__text');

      const master = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove('body--overflow');
          done();
        },
      });

      master
          .add(enterTextAnimation(heroTitle.chars))
          .add(skewInUp(heroText.lines), '-=0.95')
          .add(skewInUp('.hero .btn'), '<')
          .add(wipeFromY('.hero__overlay', 'center top', 1), '-=1.2')
          .add(scaleOut('.hero__right img'), '<');
    },
  }
}
</script>



<style lang="scss">
@font-face {
  src: url('https://assets.codepen.io/2479807/GrandSlang-Roman.woff');
  font-family: 'Grand Slang';
}

@font-face {
  src: url('https://assets.codepen.io/2479807/gilroy-semibold.woff2');
  font-family: 'Gilroy Semi-Bold';
}

:root {
  /* base values */
  --base-text-size: 1.6rem;
  --type-scale: 1.4;

  /* type scale */
  --paragraph: 16px;
  --paragraph--small: 14px;
  --paragraph--big: 20px;
  --h5: calc(var(--base-text-size) * var(--type-scale));
  --h4: calc(var(--h5) * var(--type-scale));
  --h3: calc(var(--h4) * var(--type-scale));
  --h2: calc(var(--h3) * var(--type-scale));
  --h1: calc(var(--h2) * var(--type-scale));

  /* line height */
  --heading-line-height: 1.25;
  --body-line-height: 1.5;

  /* spacing scale */
  --spacing-scale: 0.5;
  --paragraph-spacing: 1.6rem;
  --h5-spacing: 3.2rem;
  --h4-spacing: 3.2rem;
  --h3-spacing: 3.2rem;
  --h2-spacing: 3.2rem;
  --h1-spacing: 3.2rem;
}

@media (max-width: 96rem) {
  :root {
    --base-text-size: 1.2rem;
    --type-scale: 1.4;
    --paragraph: 14px;
  }
}

@media (max-width: 60rem) {
  :root {
    --base-text-size: 1rem;
    --type-scale: 1.4;
    --paragraph: 12px;
  }
}

body {

  font-family: 'Gilroy', sans-serif;
  font-size: 1.6rem;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-background);
  height: 100%;
  font-weight: 400;
}

strong {
  font-family: 'Gilroy', sans-serif;
}

%heading {
  font-family: 'Grand Slang', sans-serif;
  font-weight: 400;
  line-height: 1.25;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  @extend %heading;
}

h1 {
  font-size: var(--h1);
  margin-bottom: var(--h1-spacing);
}

h2 {
  font-size: var(--h2);
  margin-bottom: var(--h2-spacing);
}

h3 {
  font-size: var(--h3);
  margin-bottom: var(--h3-spacing);
}

h4 {
  font-size: var(--h4);
  margin-bottom: var(--h4-spacing);
}

h5 {
  font-size: var(--h5);
  margin-bottom: var(--h5-spacing);
}

p {
  margin-bottom: var(--paragraph-spacing);
}



html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  background-color: var(--color-background);
}

main {
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
  background-color: transparent;
}
ul {
  list-style: none;
}

img,
embed,
iframe,
object,
video {
  display: block;
  max-width: 100%;
  border-style: none;
}

input,
textarea,
select,
button {
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
}

.container {
  max-width: 96rem;
  margin-left: auto;
  margin-right: auto;

  &--big {
    max-width: 140rem;
  }
}

.btn {
  display: inline-block;
  cursor: pointer;
  padding: 16px 40px;
  transition: 0.3s ease background-color;
  color: var(--color-button-text);
  background-color: var(--color-secondary);
  border: solid 1px var(--color-secondary);
  border-radius: 100px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 14px;
  margin-top: 4rem;

  &:hover {
  }
}


body {
  transition: 0.5s ease background, 0.5s ease color;
}

:root {
  /* colors */
  --color-primary: #1f1f1f;
  --color-secondary: #fdca87;
  --color-white: #f7f7ff;
  --color-background: #fff;
  --color-text: #264653;
  --color-text-dark: #1f1f1f;
  --color-light-background: #f2f7f8;
  --color-button-text: #fff;
}

.dark-mode {
  --color-primary: #1f1f1f;
  --color-secondary: #fdca87;
  --color-white: #f7f7ff;
  --color-background: #1f1f1f;
  --color-text: #f7f7ff;
  --color-text-dark: #f7f7ff;
  --color-light-background: #333333;
  --color-button-text: #1f1f1f;
}

.body--overflow {
  height: 100vh;
  overflow: hidden;
}


.header {
  padding: 2vw 5vw;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;

  .logo {
    width: 3.2rem;

    circle {
      fill: var(--color-secondary);
    }
  }

  nav {
    display: flex;
    align-items: center;
  }

  .links {
    display: flex;
    align-items: center;

    a {
      margin-right: 6.4rem;
    }
  }
}


.hero {
  height: 100vh;
  display: flex;

  > * {
    height: 100vh;
    width: 50%;
  }

  @media (max-width: 45rem) {
    flex-direction: column;

    > * {
      height: 50vh;
      min-height: 50rem;
      width: 100%;
    }
  }

  &__left {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 3vw 5vw;
  }

  &__text {
    max-width: 50ch;
    font-size: 2rem;
  }

  &__right {
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
      z-index: -1;
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: var(--color-secondary);
    transform: scaleY(0);
    will-change: transform;
  }

  &__title {
    .split-parent {
      word-spacing: 1vw;
      line-height: 1;
      overflow: hidden;
      flex: none;
    }
  }
}
</style>
