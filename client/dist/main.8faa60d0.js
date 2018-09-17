// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/main.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../fonts/bootstrap/glyphicons-halflings-regular.eot":[["glyphicons-halflings-regular.890583e3.eot","fonts/bootstrap/glyphicons-halflings-regular.eot"],"fonts/bootstrap/glyphicons-halflings-regular.eot"],"./../fonts/bootstrap/glyphicons-halflings-regular.woff2":[["glyphicons-halflings-regular.efcf296b.woff2","fonts/bootstrap/glyphicons-halflings-regular.woff2"],"fonts/bootstrap/glyphicons-halflings-regular.woff2"],"./../fonts/bootstrap/glyphicons-halflings-regular.woff":[["glyphicons-halflings-regular.faca9d67.woff","fonts/bootstrap/glyphicons-halflings-regular.woff"],"fonts/bootstrap/glyphicons-halflings-regular.woff"],"./../fonts/bootstrap/glyphicons-halflings-regular.ttf":[["glyphicons-halflings-regular.87fb261d.ttf","fonts/bootstrap/glyphicons-halflings-regular.ttf"],"fonts/bootstrap/glyphicons-halflings-regular.ttf"],"./../fonts/bootstrap/glyphicons-halflings-regular.svg":[["glyphicons-halflings-regular.f47645e5.svg","fonts/bootstrap/glyphicons-halflings-regular.svg"],"fonts/bootstrap/glyphicons-halflings-regular.svg"],"./../imagenes/botones/boton_cerrar.png":[["boton_cerrar.4a2d16af.png","imagenes/botones/boton_cerrar.png"],"imagenes/botones/boton_cerrar.png"],"./../imagenes/botones/boton_cerrar_hover.png":[["boton_cerrar_hover.38d95317.png","imagenes/botones/boton_cerrar_hover.png"],"imagenes/botones/boton_cerrar_hover.png"],"./../imagenes/botones/boton_cerrar_push.png":[["boton_cerrar_push.cae275a6.png","imagenes/botones/boton_cerrar_push.png"],"imagenes/botones/boton_cerrar_push.png"],"./../imagenes/background_heading.png":[["background_heading.57736663.png","imagenes/background_heading.png"],"imagenes/background_heading.png"],"./../imagenes/slider/scale_bar.png":[["scale_bar.372f7b48.png","imagenes/slider/scale_bar.png"],"imagenes/slider/scale_bar.png"],"./../imagenes/slider/scale_bar_handler.png":[["scale_bar_handler.0ba6d800.png","imagenes/slider/scale_bar_handler.png"],"imagenes/slider/scale_bar_handler.png"],"./../imagenes/slider/scale_bar_handler_hover.png":[["scale_bar_handler_hover.2d373ef2.png","imagenes/slider/scale_bar_handler_hover.png"],"imagenes/slider/scale_bar_handler_hover.png"],"./../imagenes/container_content_iner_border.png":[["container_content_iner_border.d8695244.png","imagenes/container_content_iner_border.png"],"imagenes/container_content_iner_border.png"],"./../imagenes/borde.png":[["borde.5912e8c3.png","imagenes/borde.png"],"imagenes/borde.png"],"./../imagenes/borde_heading.png":[["borde_heading.c35979b7.png","imagenes/borde_heading.png"],"imagenes/borde_heading.png"],"./../fonts/MyriadPro-Regular.otf":[["MyriadPro-Regular.830c8e02.otf","fonts/MyriadPro-Regular.otf"],"fonts/MyriadPro-Regular.otf"],"./../fonts/MyriadPro-Bold.otf":[["MyriadPro-Bold.d8773a43.otf","fonts/MyriadPro-Bold.otf"],"fonts/MyriadPro-Bold.otf"],"./../fonts/MyriadPro-Italic.otf":[["MyriadPro-Italic.9903a838.otf","fonts/MyriadPro-Italic.otf"],"fonts/MyriadPro-Italic.otf"],"./../fonts/MyriadPro-BoldItalic.otf":[["MyriadPro-BoldItalic.e12bdd9b.otf","fonts/MyriadPro-BoldItalic.otf"],"fonts/MyriadPro-BoldItalic.otf"],"./../imagenes/botones/boton_normal.png":[["boton_normal.f90c4caf.png","imagenes/botones/boton_normal.png"],"imagenes/botones/boton_normal.png"],"./../imagenes/lighten.png":[["lighten.3ed3cd8d.png","imagenes/lighten.png"],"imagenes/lighten.png"],"./../imagenes/botones/bg_square_button.png":[["bg_square_button.0bcb14b5.png","imagenes/botones/bg_square_button.png"],"imagenes/botones/bg_square_button.png"],"./../imagenes/botones/arrow_left.png":[["arrow_left.ef994e76.png","imagenes/botones/arrow_left.png"],"imagenes/botones/arrow_left.png"],"./../imagenes/botones/arrow_right.png":[["arrow_right.7d8f44eb.png","imagenes/botones/arrow_right.png"],"imagenes/botones/arrow_right.png"],"./../imagenes/background.png":[["background.8f3ac102.png","imagenes/background.png"],"imagenes/background.png"],"./../imagenes/background_images/login.png":[["login.6f4f8bed.png","imagenes/background_images/login.png"],"imagenes/background_images/login.png"],"./../imagenes/background_images/wood2.png":[["wood2.e79d2617.png","imagenes/background_images/wood2.png"],"imagenes/background_images/wood2.png"],"./../imagenes/background_images/wood3.png":[["wood3.7d76f980.png","imagenes/background_images/wood3.png"],"imagenes/background_images/wood3.png"],"./../imagenes/background_images/wood.png":[["wood.8a7658cf.png","imagenes/background_images/wood.png"],"imagenes/background_images/wood.png"],"./../imagenes/facebook.png":[["facebook.2867b6c5.png","imagenes/facebook.png"],"imagenes/facebook.png"],"./../imagenes/twitter.png":[["twitter.47d24c79.png","imagenes/twitter.png"],"imagenes/twitter.png"],"./../imagenes/barras/barra_cargando_vacia.png":[["barra_cargando_vacia.21ab5d30.png","imagenes/barras/barra_cargando_vacia.png"],"imagenes/barras/barra_cargando_vacia.png"],"./../imagenes/barras/barra_cargando_llena.png":[["barra_cargando_llena.560b6e17.png","imagenes/barras/barra_cargando_llena.png"],"imagenes/barras/barra_cargando_llena.png"],"./../imagenes/logo.png":[["logo.be50b51d.png","imagenes/logo.png"],"imagenes/logo.png"],"./../imagenes/interfaz/iconos/dice.png":[["dice.3a155e88.png","imagenes/interfaz/iconos/dice.png"],"imagenes/interfaz/iconos/dice.png"],"./../imagenes/interfaz/iconos/dice_hover.png":[["dice_hover.fb50b6a0.png","imagenes/interfaz/iconos/dice_hover.png"],"imagenes/interfaz/iconos/dice_hover.png"],"./../imagenes/interfaz/iconos/gender_icon_female.png":[["gender_icon_female.033e60ec.png","imagenes/interfaz/iconos/gender_icon_female.png"],"imagenes/interfaz/iconos/gender_icon_female.png"],"./../imagenes/interfaz/iconos/gender_icon_male.png":[["gender_icon_male.d5b7aa8d.png","imagenes/interfaz/iconos/gender_icon_male.png"],"imagenes/interfaz/iconos/gender_icon_male.png"],"./../imagenes/botones/chat_send_btn.png":[["chat_send_btn.b3b0f6b6.png","imagenes/botones/chat_send_btn.png"],"imagenes/botones/chat_send_btn.png"],"./../imagenes/menuJuego_background.png":[["menuJuego_background.30f13849.png","imagenes/menuJuego_background.png"],"imagenes/menuJuego_background.png"],"./../imagenes/botones/boton_inventario.png":[["boton_inventario.8fcceaa8.png","imagenes/botones/boton_inventario.png"],"imagenes/botones/boton_inventario.png"],"./../imagenes/botones/boton_hechizos.png":[["boton_hechizos.16242f21.png","imagenes/botones/boton_hechizos.png"],"imagenes/botones/boton_hechizos.png"],"./../imagenes/active_tab.png":[["active_tab.df3ede47.png","imagenes/active_tab.png"],"imagenes/active_tab.png"],"./../imagenes/botones/boton_arriba_inventario.png":[["boton_arriba_inventario.17e938da.png","imagenes/botones/boton_arriba_inventario.png"],"imagenes/botones/boton_arriba_inventario.png"],"./../imagenes/botones/boton_abajo_inventario.png":[["boton_abajo_inventario.1c7181ce.png","imagenes/botones/boton_abajo_inventario.png"],"imagenes/botones/boton_abajo_inventario.png"],"./../imagenes/interfaz/barras/barra_energia.png":[["barra_energia.1f4f3390.png","imagenes/interfaz/barras/barra_energia.png"],"imagenes/interfaz/barras/barra_energia.png"],"./../imagenes/interfaz/barras/barra_mana.png":[["barra_mana.63dcf76f.png","imagenes/interfaz/barras/barra_mana.png"],"imagenes/interfaz/barras/barra_mana.png"],"./../imagenes/interfaz/barras/barra_vida.png":[["barra_vida.2ff825d2.png","imagenes/interfaz/barras/barra_vida.png"],"imagenes/interfaz/barras/barra_vida.png"],"./../imagenes/interfaz/barras/barra_hambre.png":[["barra_hambre.84e6eda8.png","imagenes/interfaz/barras/barra_hambre.png"],"imagenes/interfaz/barras/barra_hambre.png"],"./../imagenes/interfaz/barras/barra_sed.png":[["barra_sed.84f2eaee.png","imagenes/interfaz/barras/barra_sed.png"],"imagenes/interfaz/barras/barra_sed.png"],"./../imagenes/interfaz/barras/barra_experiencia.png":[["barra_experiencia.1b5185b7.png","imagenes/interfaz/barras/barra_experiencia.png"],"imagenes/interfaz/barras/barra_experiencia.png"],"./../imagenes/interfaz/barras/barra_background.png":[["barra_background.3c246fcf.png","imagenes/interfaz/barras/barra_background.png"],"imagenes/interfaz/barras/barra_background.png"],"./../imagenes/interfaz/iconos/coin.png":[["coin.582d5ca6.png","imagenes/interfaz/iconos/coin.png"],"imagenes/interfaz/iconos/coin.png"],"./../imagenes/interfaz/botonAsignarSkills.png":[["botonAsignarSkills.be5d1d19.png","imagenes/interfaz/botonAsignarSkills.png"],"imagenes/interfaz/botonAsignarSkills.png"],"./../imagenes/botones/menu.png":[["menu.83933970.png","imagenes/botones/menu.png"],"imagenes/botones/menu.png"],"./../imagenes/botones/seguroAtaque.png":[["seguroAtaque.d384cb90.png","imagenes/botones/seguroAtaque.png"],"imagenes/botones/seguroAtaque.png"],"./../imagenes/botones/seguroResucitacion.png":[["seguroResucitacion.a5be2fdb.png","imagenes/botones/seguroResucitacion.png"],"imagenes/botones/seguroResucitacion.png"],"./../imagenes/botones/macroTrabajo.png":[["macroTrabajo.fbaa53e2.png","imagenes/botones/macroTrabajo.png"],"imagenes/botones/macroTrabajo.png"],"./../imagenes/botones/macroHechizos.png":[["macroHechizos.51d3eb8d.png","imagenes/botones/macroHechizos.png"],"imagenes/botones/macroHechizos.png"],"./../imagenes/slot.png":[["slot.7f6ede14.png","imagenes/slot.png"],"imagenes/slot.png"],"./../imagenes/popups/mapa1.jpg":[["mapa1.939a2f6e.jpg","imagenes/popups/mapa1.jpg"],"imagenes/popups/mapa1.jpg"],"./../imagenes/popups/mapa2.jpg":[["mapa2.9294e3d2.jpg","imagenes/popups/mapa2.jpg"],"imagenes/popups/mapa2.jpg"],"./../imagenes/interfaz/iconos/map.png":[["map.1a6a388b.png","imagenes/interfaz/iconos/map.png"],"imagenes/interfaz/iconos/map.png"],"./../imagenes/interfaz/iconos/map_active.png":[["map_active.6fe82351.png","imagenes/interfaz/iconos/map_active.png"],"imagenes/interfaz/iconos/map_active.png"],"./../imagenes/interfaz/iconos/cave.png":[["cave.8fd54e32.png","imagenes/interfaz/iconos/cave.png"],"imagenes/interfaz/iconos/cave.png"],"./../imagenes/interfaz/iconos/cave_active.png":[["cave_active.898c5c92.png","imagenes/interfaz/iconos/cave_active.png"],"imagenes/interfaz/iconos/cave_active.png"],"./../imagenes/interfaz/iconos/wrench.png":[["wrench.71ab26a5.png","imagenes/interfaz/iconos/wrench.png"],"imagenes/interfaz/iconos/wrench.png"],"./../imagenes/interfaz/iconos/wrench_active.png":[["wrench_active.a03bf2c1.png","imagenes/interfaz/iconos/wrench_active.png"],"imagenes/interfaz/iconos/wrench_active.png"],"./../imagenes/interfaz/iconos/speaker.png":[["speaker.c0bb74f9.png","imagenes/interfaz/iconos/speaker.png"],"imagenes/interfaz/iconos/speaker.png"],"./../imagenes/interfaz/iconos/speaker_active.png":[["speaker_active.76909c35.png","imagenes/interfaz/iconos/speaker_active.png"],"imagenes/interfaz/iconos/speaker_active.png"],"./../imagenes/interfaz/iconos/keyboard.png":[["keyboard.bba42473.png","imagenes/interfaz/iconos/keyboard.png"],"imagenes/interfaz/iconos/keyboard.png"],"./../imagenes/interfaz/iconos/keyboard_active.png":[["keyboard_active.d8d885b4.png","imagenes/interfaz/iconos/keyboard_active.png"],"imagenes/interfaz/iconos/keyboard_active.png"],"./../imagenes/botonMas.png":[["botonMas.43dc357c.png","imagenes/botonMas.png"],"imagenes/botonMas.png"],"./../imagenes/botonMasApretado.png":[["botonMasApretado.47e44972.png","imagenes/botonMasApretado.png"],"imagenes/botonMasApretado.png"],"./../imagenes/botonMenos.png":[["botonMenos.6331b0a8.png","imagenes/botonMenos.png"],"imagenes/botonMenos.png"],"./../imagenes/botonMenosApretado.png":[["botonMenosApretado.ab168622.png","imagenes/botonMenosApretado.png"],"imagenes/botonMenosApretado.png"],"./../imagenes/interfaz/iconos/shield.png":[["shield.78bc97bf.png","imagenes/interfaz/iconos/shield.png"],"imagenes/interfaz/iconos/shield.png"],"./../imagenes/interfaz/iconos/shield_active.png":[["shield_active.357332b3.png","imagenes/interfaz/iconos/shield_active.png"],"imagenes/interfaz/iconos/shield_active.png"],"./../imagenes/interfaz/iconos/group.png":[["group.1a4f9b8e.png","imagenes/interfaz/iconos/group.png"],"imagenes/interfaz/iconos/group.png"],"./../imagenes/interfaz/iconos/group_active.png":[["group_active.201aadcc.png","imagenes/interfaz/iconos/group_active.png"],"imagenes/interfaz/iconos/group_active.png"],"./../imagenes/interfaz/iconos/crown.png":[["crown.3ea913b8.png","imagenes/interfaz/iconos/crown.png"],"imagenes/interfaz/iconos/crown.png"],"./../imagenes/interfaz/iconos/crown_active.png":[["crown_active.baefe7f3.png","imagenes/interfaz/iconos/crown_active.png"],"imagenes/interfaz/iconos/crown_active.png"],"./../imagenes/interfaz/iconos/settings.png":[["settings.f072d1e4.png","imagenes/interfaz/iconos/settings.png"],"imagenes/interfaz/iconos/settings.png"],"./../imagenes/interfaz/iconos/settings_active.png":[["settings_active.d42db37e.png","imagenes/interfaz/iconos/settings_active.png"],"imagenes/interfaz/iconos/settings_active.png"],"./../imagenes/background_tab.png":[["background_tab.26731bf1.png","imagenes/background_tab.png"],"imagenes/background_tab.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '54268' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)