// Name: Web Storage API
// ID: r3d5t0n3guywebstorage
// Description: Access your browser's local storage using the Web API.
//   Values stored there by a website persist across sessions,
//   until that site's cookies are cleared.
// By: R3d5t0n3_GUY <https://github.com/R3d5t0n3GUY>

(function (S) {
  "use strict";
  if (S.extensions.unsandboxed) {
    class WebStorage {
      getInfo() {
        return {
          id: "r3d5t0n3guywebstorage",
          name: S.translate("Web Storage"),
          color1: "#1FBF5F",
          color2: "#007F2F",
          color3: "#001F00",
          blocks: [
            {
              opcode: "getStorageItem",
              blockType: S.BlockType.REPORTER,
              text: S.translate("get item [KEY] from Web Storage"),
              arguments: {
                KEY: this.fieldParamTemplate("string", "key")
              }
            },
            {
              opcode: "setStorageItem",
              blockType: S.BlockType.COMMAND,
              text: S.translate("set item [KEY] in Web Storage to [VALUE]"),
              arguments: {
                KEY: this.fieldParamTemplate("string", "key"),
                VALUE: this.fieldParamTemplate("string", "new value")
              }
            },
            {
              opcode: "removeStorageItem",
              blockType: S.BlockType.COMMAND,
              text: S.translate("remove item [KEY] from Web Storage"),
              arguments: {
                KEY: this.fieldParamTemplate("string", "key")
              }
            },
            {
              opcode: "clearStorage",
              blockType: S.BlockType.COMMAND,
              hideFromPalette: true,
              text: S.translate("remove all items from Web Storage")
            },
            {
              opcode: "storageHasKey",
              blockType: S.BlockType.BOOLEAN,
              text: S.translate("Web Storage contains key named [KEY]?"),
              arguments: {
                KEY: this.fieldParamTemplate("string", "key")
              }
            },
            {
              opcode: "webStorageCheck",
              blockType: S.BlockType.BOOLEAN,
              text: S.translate("is Web Storage supported?")
            },
            {
              opcode: "getKeyList",
              blockType: S.BlockType.REPORTER,
              text: S.translate("list item keys in Web Storage"),
              disableMonitor: true
            }
          ]
        };
      }
      fieldParamTemplate(argType, text, hidden = false, translate = true) {
        switch (argType) {
          case "string":
          return {
            type: S.ArgumentType.STRING,
            defaultValue: (translate ? S.translate(text) : text),
          };
          case "image":
          return { type: S.ArgumentType.IMAGE, dataURI: text };
          case "label":
          return {
            blockType: S.BlockType.LABEL,
            text: (translate ? S.translate(text) : text),
            hideFromPalette: hidden,
          };
          case "menu":
          return { type: S.ArgumentType.STRING, menu: text };
          case "separator":
          return (hidden ? null : "---");
          default:
          return {};
        }
      }
      getStorageItem(args) {
        return (this.storageHasKey(args) ? localStorage.getItem(args.KEY) : "")
      }
      setStorageItem(args) {
        if (this.webStorageCheck()) {
          localStorage.setItem(args.KEY, args.VALUE)
        }
      }
      removeStorageItem(args) {
        if (this.storageHasKey(args)) {
          localStorage.removeItem(args.KEY)
        }
      }
      clearStorage() {
        if (false) {    // this.webStorageCheck()
          localStorage.clear()
        }
      }
      storageHasKey(args) {
        return (this.webStorageCheck() ? Object.keys(localStorage).findIndex(i => (i === args.KEY)) > -1 : false)
      }
      getKeyList() {
        return (this.webStorageCheck() ? JSON.stringify(Object.keys(localStorage)) : "");
      }
      webStorageCheck() {
        try {
          return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
          return false;
        }
      }
    }
    let ext = new WebStorage();
    S.extensions.register(ext);
    requestAnimationFrame(() => {
      if (!ext.webStorageCheck()) {
        console.warn("localStorage is not supported")
        window.alert(`This extension requires the localStorage API,\n
        which is not supported in your browser`)
      }
    })
  } else {
    throw new Error("This extension must run unsandboxed");
  }
})(Scratch);