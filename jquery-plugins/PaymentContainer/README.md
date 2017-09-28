
# PaymentContainer

PaymentContainer is a jQuery Plugin to imitate the alipay password input. Like this.

<img src="https://raw.githubusercontent.com/ljxyweb/MarkDownPhotos/master/plugins/pc.gif">


## Index

* [Usage](#usage)
* [Options](#options)
* [Compatibility](#compatibility)
* [License](#license)

## Usage

Include the files

```html
<link rel="stylesheet" type="text/css" href="path/base/defaultpayment.css">
<script src="path/jquery.min.js"></script>
<script src="path/base/jquery-paymentcontainer.js"></script>

<input id="container" minlength="6" maxlength="6" name=" " oncontextmenu="return false" onpaste="return false" oncopy="return false" oncut="return false" autocomplete="off" value="" type="password">
```

Call the the plugin on a container as your wish
```js
$("#container").paymentContainer();
```
All done!



## Options


You can custom the properties by passing options when call the plugin, all available options are listed below.

Call the the plugin on a container as you expected
```js
$("#container").paymentContainer({
    'smallboxwidth': 35,
    'smallboxnum': 6
});
```

|     Option    |  Type  | Default | Description                                |
|:-------------:|:------:|:-------:|--------------------------------------------|
| smallboxwidth | number |    35   | the width of the small password boxes      |
|  smallboxnum  | number |    6    | the number of the the small password boxes |


## Compatibility

* Requires jQuery 1.8+
* Works well with all morder browsers and IE8+.


## License

Licensed under the MIT License
