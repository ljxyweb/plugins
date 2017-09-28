
const fs = require('fs');
const path = require('path');
const uglifyjs = require("uglify-js");
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const dir1 = path.resolve(__dirname, 'jquery-plugins');
const dir2 = path.resolve(__dirname, 'js-plugins');

const walk = function (dir) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return
    list.forEach(function (file) {
      file = dir + '/' + file;
      fs.stat(file, function (err, stat) {
        let ext=path.extname(file);
        if (stat && stat.isDirectory()) {
          walk(file)
        } else if (ext === '.js') {
          let name = path.basename(file, '.js')
          if (name.search(/\.min$/) === -1) {
            let text = fs.readFileSync(file, 'utf8');
            let result = uglifyjs.minify(text);
            let newFilePath = dir + '/' + name + '.min.js';
            fs.writeFileSync(newFilePath, result.code, 'utf8');
          }
        }else if(ext === '.css'){
          let name = path.basename(file, '.css')
          if (name.search(/\.min$/) === -1) {
            let text = fs.readFileSync(file, 'utf8');
            let newFilePath = dir + '/' + name + '.min.css';
            //传递zindex: false禁止cssnano的z-index重计算。
            postcss([autoprefixer,cssnano({ zindex: false })])
              .process(text)
              .then(result => {
                 fs.writeFileSync(newFilePath, result.css,'utf8');
          });           
          }
        }
      })
    })
  })
}
walk(dir1)
walk(dir2)