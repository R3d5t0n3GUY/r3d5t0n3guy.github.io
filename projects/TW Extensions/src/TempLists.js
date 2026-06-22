// Name: Temporary Lists
// ID: r3d5t0n3guyTempLists
// Description: Addon for Lily's "Temporary Variables" and "List Tools" that adds thread and runtime lists.
// By: R3d5t0n3_GUY <https://scratch.mit.edu/users/R3dstone_engineerer>
// Original: LilyMakesThings and Mio
// License: MIT AND LGPL-3.0

// REFERENCES:
// "Temporary Variables" By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>, Mio <https://scratch.mit.edu/users/0znzw/>
// "List Tools" By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed");
  } else {
    
    class TemporaryLists {
      constructor () {
        this.runtimeLists = Object.create(null);

        Scratch.vm.runtime.on("PROJECT_START", () => {
          this.resetRuntimeLists()
        });
        Scratch.vm.runtime.on("PROJECT_STOP_ALL", () => {
          this.resetRuntimeLists()
        });
      }
      
      getInfo() {
        return {
          id: "r3d5t0n3guyTempLists",
          name: Scratch.translate("Temporary Lists"),
          color1: "#ff4e1a",
          color3: "#ff1d00",
          blocks: [
            this.fieldParamTemplate("label", "Basic"),
            {
              opcode: "addToTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("add [ITEM] to [SCOPE] list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "deleteFromTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete [IDX] of [SCOPE] list [LIST]"),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "deleteAllOfTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete all of [SCOPE] list [LIST]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "insertIntoTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("insert [ITEM] at [IDX] of [SCOPE] list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                IDX: this.fieldParamTemplate("index"),
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "replaceItemOfTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("replace item [IDX] of [SCOPE] list [LIST] with [ITEM]"),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
                ITEM: this.fieldParamTemplate("item"),
              },
            },
            {
              opcode: "itemOfTempList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("item [IDX] of [SCOPE] list [LIST]"),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "indexInTempList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("index of [ITEM] in [SCOPE] list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "lengthOfTempList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("length of [SCOPE] list [LIST]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "tempListContains",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("[SCOPE] list [LIST] contains [ITEM] ?"),
              arguments: {
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
                ITEM: this.fieldParamTemplate("item"),
              },
            },

            "---",
            this.fieldParamTemplate("label", "Advanced"),

            {
              opcode: "deleteItemsFromTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete items [IDX1] to [IDX2] from [SCOPE] list [LIST]"),
              arguments: {
                IDX1: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: "1",
                },
                IDX2: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: "3",
                },
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "deleteAllInstancesFromTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete all instances of [ITEM] in [SCOPE] list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "replaceAllInstancesInTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("replace all [ITEM1] with [ITEM2] in [SCOPE] list [LIST]"),
              arguments: {
                ITEM1: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "apple",
                },
                ITEM2: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "banana",
                },
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "setTempListToList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set [SCOPE] list [LIST] to [LISTS]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
                LISTS: this.fieldParamTemplate("lists"),
              },
            },

            this.fieldParamTemplate("separator", "", this.isDependencyNotLoaded()),
            this.fieldParamTemplate("label", "Iteration loops", this.isDependencyNotLoaded()),
            {
              opcode: "forEachItem",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each item value [ITEM] in [SCOPE] list [LIST]"),
              hideFromPalette: this.isDependencyNotLoaded(),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "forEachNum",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each item # [IDX] in [SCOPE] list [LIST]"),
              hideFromPalette: this.isDependencyNotLoaded(),
              arguments: {
                IDX: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "index",
                },
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "forEachItemNum",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each item value [ITEM] # [IDX] in [SCOPE] list [LIST]"),
              hideFromPalette: this.isDependencyNotLoaded(),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                IDX: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "index",
                },
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },

            "---",
            this.fieldParamTemplate("label", "Misc"),
            {
              opcode: "setListToArray",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set [SCOPE] list [LIST] to array [ARRAY]"),
              disableMonitor: true,
              arguments: {
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
                ARRAY: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '["apple","banana"]',
                },
              },
            },
            {
              opcode: "getListAsArray",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("[SCOPE] list [LIST] as array"),
              disableMonitor: true,
              arguments: {
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "isListInEnvironment",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("[SCOPE] list [LIST] exists?"),
              arguments: {
                SCOPE: this.fieldParamTemplate("scope"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "listTempLists",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("active [SCOPE] lists"),
              arguments: {
                SCOPE: this.fieldParamTemplate("scope"),
              },
              disableMonitor: true,
            },
          ].filter((i) => i),
          menus: {
            scope: {
              acceptReporters: false,
              items: [
                { text: "thread", value: "0" },
                { text: "runtime", value: "1" }
              ]
            },
            lists: { acceptReporters: true, items: "_getLists" },
          },
        };
      }

      /*--------FUNCTIONS--------*/

      // EXTENSION CONSTRUCTION
      resetRuntimeLists() {
        this.runtimeLists = Object.create(null)
      }
      getListObjectFromName(name, util) {
        const runtime = Scratch.vm.runtime;
        const stageTarget = runtime.getTargetForStage();
        const target = util.target;
        let listObject = Object.create(null);

        listObject = stageTarget?.lookupVariableByNameAndType(name, "list");
        if (listObject) return listObject;
        listObject = target?.lookupVariableByNameAndType(name, "list");
        return (listObject ? listObject : Object.create(null))
      }
      getListEnvironment(args, util) {
        switch (args.SCOPE) {
          case "0": return (() => { //THREAD
              const thread = util.thread;
              if (!thread.lists) {
                thread.lists = Object.create(null);
              }
              if (!(this.isListInEnvironment(args, util))) thread.lists[args.LIST] = [];
              return thread.lists[args.LIST]
            })();
          case "1": return (() => {
            if (!(this.isListInEnvironment(args, util))) this.runtimeLists[args.LIST] = [];
            return this.runtimeLists[args.LIST]
          })(); //RUNTIME
          default: return [];
        }
      }
      isListInEnvironment(args, util) {
        switch (args.SCOPE) {
          case "0": return (() => {
            const thread = util.thread;
            if (!thread.lists) {
              thread.lists = Object.create(null);
            }
            return args.LIST in thread.lists
          })();
          case "1": return args.LIST in this.runtimeLists
        }
      }
      isDependencyNotLoaded() {
        return !(Scratch?.vm?.runtime?.extensionManager?.isExtensionLoaded("lmsTempVars2") || false);
      }
      fieldParamTemplate(argType, text, hidden = false) {
        switch (argType) {
          case "scope":
            return {
              type: Scratch.ArgumentType.STRING,
              menu: "scope"
            };
          case "list":
            return {
              type: Scratch.ArgumentType.STRING,
              defaultValue: Scratch.translate("list"),
            };
          case "item":
            return {
              type: Scratch.ArgumentType.STRING,
              defaultValue: Scratch.translate("thing"),
            };
          case "index":
            return { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" };
          case "label":
            return {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate(text),
              hideFromPalette: hidden,
            };
          case "lists":
            return { type: Scratch.ArgumentType.STRING, menu: "lists" };
          case "separator":
            return (hidden ? null : "---");
          default:
            return {};
        }
      }
      _getLists() {
        try {
          const lists = (typeof Blockly === "undefined" ? [] : (Blockly?.getMainWorkspace()?.getVariableMap()?.getVariablesOfType("list") || []).map((model) => (model?.name || model)));
          if (lists.length > 0) {
            return (Array.isArray(lists) ? lists : [""]);
          } else {
            return [""];
          }
        } catch (e) {
          return [""];
        }
      }

      // BASIC
      addToTempList(args, util) {
        let list = this.getListEnvironment(args, util)
        list.push(args.ITEM);
      }
      deleteFromTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          if ((1 <= args.IDX) && (args.IDX < list.length + 1)) {
            list.splice(Math.floor(args.IDX - 1), 1);
          }
        } else {
          let list = this.getListEnvironment(args, util)
          list = [];
        }
      }
      deleteAllOfTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          list.splice(0, list.length)
        } else {
          let list = this.getListEnvironment(args, util)
          list = [];
        }
      }
      insertIntoTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          if ((1 <= args.IDX) && (args.IDX < list.length + 1)) {
            list.splice(Math.floor(args.IDX - 1), 0, args.ITEM);
          }
        } else {
          let list = this.getListEnvironment(args, util)
          list = [args.ITEM];
        }
      }
      replaceItemOfTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          if ((1 <= args.IDX) && (args.IDX < list.length + 1)) {
            list[args.IDX - 1] = args.ITEM;
          }
        } else {
          list = [args.ITEM];
        }
      }
      itemOfTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          if ((1 <= args.IDX) && (args.IDX < list.length + 1)) {
            return list[args.IDX - 1] || "";
          } else {
            return ""
          }
        } else {
          return "";
        }
      }
      indexInTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          return list.indexOf(args.ITEM) + 1 || 0;
        } else {
          return "";
        }
      }
      lengthOfTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          return list.length || "";
        } else {
          return "";
        }
      }
      tempListContains(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          return list.indexOf(args.ITEM) > -1;
        } else {
          return false;
        }
      }

      // ADVANCED
      deleteItemsFromTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          if ((1 <= args.IDX1) && (args.IDX1 < list.length + 1)) {
            if ((1 <= args.IDX2) && (args.IDX2 < list.length + 1)) {
              let START = Math.min(Math.floor(args.IDX1), Math.floor(args.IDX2)),
                LEN = Math.max(Math.floor(args.IDX1), Math.floor(args.IDX2)) - START;
              list.splice(START - 1, LEN + 1);
            }
          }
        } else {
          let list = this.getListEnvironment(args, util)
          list = [];
        }
      }
      deleteAllInstancesFromTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          list = list.filter((i) => i !== args.ITEM);
        } else {
          let list = this.getListEnvironment(args, util)
          list = [];
        }
      }
      replaceAllInstancesInTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          list = list.map((i) => i === args.ITEM1 ? args.ITEM2 : i);
        } else {
          let list = this.getListEnvironment(args, util)
          list = [];
        }
      }
      setTempListToList(args, util) {
        let list1 = this.getListEnvironment(args, util)
        const list2 = this.getListObjectFromName(Scratch.Cast.toString(args.LISTS), util);
        list1 = [...(list2?.value || [])];
      }

      // ITERATION LOOPS (ADD "Temporary Variables" (by LilyMakesThings and Mio) TO YOUR PROJECT IF YOU WANT THESE)
      forEachItem(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          if (list.length > 0 && !this.isDependencyNotLoaded()) {
            const thread = util.thread
            const listLength = list.length;
            if (!thread.variables) thread.variables = {};
            const vars = thread.variables;

            if (typeof util.stackFrame.index === "undefined") {
              util.stackFrame.index = 0;
            }

            if (util.stackFrame.index < listLength) {
              util.stackFrame.index++;
              vars[args.ITEM] = list[util.stackFrame.index - 1];
              return true;
            }
          }
        }
      }
      forEachNum(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          if (list.length && !this.isDependencyNotLoaded()) {
            const thread = util.thread
            const listLength = list.length;
            if (!thread.variables) thread.variables = {};
            const vars = thread.variables;

            if (typeof util.stackFrame.index === "undefined") {
              util.stackFrame.index = 0;
            }

            if (util.stackFrame.index < listLength) {
              util.stackFrame.index++;
              vars[args.IDX] = util.stackFrame.index;
              return true;
            }
          }
        }
      }
      forEachItemNum(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          if (list.length > 0 && !this.isDependencyNotLoaded()) {
            const thread = util.thread
            const listLength = list.length;
            if (!thread.variables) thread.variables = {};
            const vars = thread.variables;

            if (typeof util.stackFrame.index === "undefined") {
              util.stackFrame.index = 0;
            }

            if (util.stackFrame.index < listLength) {
              util.stackFrame.index++;
              vars[args.IDX] = util.stackFrame.index;
              vars[args.ITEM] = list[vars[args.IDX] - 1];
              return true;
            }
          }
        }
      }

      // MISC
      setListToArray(args, util) {
        let list = this.getListEnvironment(args, util), array;
        try {
          array = Object.values(JSON.parse(args.ARRAY)).flat(Infinity);
        } catch (e) {
          array = [];
        }
        list.splice(0, list.length, ...array)
      }
      getListAsArray(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          return JSON.stringify(list || []);
        } else {
          return "";
        }
      }
      listTempLists(args, util) {
        let t = this
        return JSON.stringify(Object.keys(((s) => {
          switch (s) {
            case "0": return (() => {
              const thread = util.thread;
              if (!thread.lists) {
                thread.lists = Object.create(null);
              }
              return thread.lists
            });
            case "1": return t.runtimeLists;
            default: return null;
          }
        })(args.SCOPE) || []).flat(Infinity));
      }
    }
    const TempLists = new TemporaryLists();
    if (TempLists.isDependencyNotLoaded()) {
      console.warn('Install "Temporary Variables" (by LilyMakesThings) to access iteration loops');
    }
    Scratch.extensions.register(TempLists);
  }
})(Scratch);
