import {HomeContainer} from "./containers/HomeContainer.js";

$(".slider").slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: true,
    arrows: true,
})

// TODO: Home task:
//     in module mode                       -> make possible structure with api models
//     HomeContainer                        -> HomeContainer.ts                     +
//     dom element access class variables   -> as fields in HomeContainer           +
//     in constructor get the access from   ->                                      +
//     Ascending/Descending etc.            -> enum SortType                        +
//     create a class with visiblity none   -> popup-hidden                         +
//     in change the the css class          -> &-hidden scss in components          +
//     save state pop up is hide/not        -> as field of HomeContainer            +
//     save state of filter mode            -> as field of HomeContainer as DEFAULT +
//     save state of settings mode          -> not implemented                      -

new HomeContainer()
