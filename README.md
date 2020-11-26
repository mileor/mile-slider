# Mile slider

Simple, customizable, responsive carousel on vanilla JS. 
[Demo](https://mileor.github.io/mile-slider/)

### Install

`npm install mile-slider`

### Usage

1. Add a link to the css file:
```
<link rel="stylesheet" href="https://unpkg.com/mile-slider@0.0.1/src/mile-slider.css">
```


2. Add HTML markup:
```
<div class="mile-slider" id="slider1">
  <button class="mile-slider__nav-button mile-slider__nav-button--left">←</button>
  <button class="mile-slider__nav-button mile-slider__nav-button--right">→</button>
  <div class="mile-slider__content">
    <div>
      <div>
        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="">
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1459716854666-062eac2da3bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI5MzI0fQ&auto=format&fit=crop&w=889&q=80" alt="">
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1437322213019-20ad95053704?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="">
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1461703048574-9a342517f1bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=889&q=80" alt="">
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1441239372925-ac0b51c4c250?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="">
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1455487276747-341d543aa498?ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80" alt="">
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1516655855035-d5215bcb5604?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="">
      </div>
    </div>
  </div>
</div>
```
3. Initialize slider in .js file:
```
import { mileSlider } from "./node_modules/mile-slider/src/mile-slider.js";
```
or
```
import { mileSlider } from "https://unpkg.com/mile-slider@0.0.1/src/mile-slider.js";
```

3. Call `mileSlider()`:
```
mileSlider({
  container: 'slider1',
  animationDuration: 600,
  animationType: 'linear',
  height: 332,
  slidesToShow: 3,
  gap: 24,
  activeSlideStyles: {
    backgroundColor: '#6554C0',
    padding: '16px',
  }
});
```

### Options

| Option              | Type                                         | Description                 |
| ------------------- | -------------------------------------------- | --------------------------- |
| `container`         | String                                       | Slider container ID         |
| `animationDuration` | Number (positive integer)                    | Time in milliseconds between switching slides |
| `animationType`     | String (linear, ease, ease-in, ease-out, etc)| [Animation-timing-function](https://developer.mozilla.org/ru/docs/Web/CSS/animation-timing-function) |
| `height`            | Number (positive integer)                    | Slider height               |
| `slidesToShow`      | Number (positive integer)                    | Number of slides to scroll  |
| `gap`               | Number (positive integer)                    | Gap between slides          |
| `activeSlideStyles` | Object                                       | CSS styles for active slide |

### License

The MIT License.
