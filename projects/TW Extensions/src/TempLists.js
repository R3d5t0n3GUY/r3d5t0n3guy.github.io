// Name: Temporary Lists
// ID: r3d5t0n3guyTempLists
// Description: Addon for Lily's "Temporary Variables" and "List Tools" that adds temporary lists for various scopes.
// By: R3d5t0n3_GUY <https://scratch.mit.edu/users/R3dstone_engineerer>
// Original: LilyMakesThings and Miyo
// License: MIT AND LGPL-3.0

// REFERENCES:
// "Temporary Variables" By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>, Miyo <https://scratch.mit.edu/users/0znzw/>
// "List Tools" By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed");
  } else {
    class TemporaryLists {
      constructor () {
        this.resetTemporaryLists();

        Scratch.vm.runtime.on("PROJECT_START", () => {
          this.resetTemporaryLists();
        });
        Scratch.vm.runtime.on("PROJECT_STOP_ALL", () => {
          this.resetTemporaryLists();
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
                ITEM: this.fieldParamTemplate("string", "thing"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "deleteFromTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete [IDX] of [SCOPE] list [LIST]"),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "deleteAllOfTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete all of [SCOPE] list [LIST]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "insertIntoTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("insert [ITEM] at [IDX] of [SCOPE] list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("string", "thing"),
                IDX: this.fieldParamTemplate("index"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "replaceItemOfTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("replace item [IDX] of [SCOPE] list [LIST] with [ITEM]"),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                ITEM: this.fieldParamTemplate("string", "thing"),
              },
            },
            {
              opcode: "itemOfTempList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("item [IDX] of [SCOPE] list [LIST]"),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "indexInTempList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("index of [ITEM] in [SCOPE] list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("string", "thing"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "lengthOfTempList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("length of [SCOPE] list [LIST]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "tempListContains",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("[SCOPE] list [LIST] contains [ITEM] ?"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                ITEM: this.fieldParamTemplate("string", "thing"),
              },
            },

            "---",
            this.fieldParamTemplate("label", "Advanced"),

            {
              opcode: "deleteItemsFromTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete items [IDX1] to [IDX2] from [SCOPE] list [LIST]"),
              arguments: {
                IDX1: this.fieldParamTemplate("index", 1),
                IDX2: this.fieldParamTemplate("index", 3),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "deleteAllInstancesFromTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete all instances of [ITEM] in [SCOPE] list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("string", "thing"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
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
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "sortTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("sort [SCOPE] list [LIST] by [METHOD]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                METHOD: {
                  type: Scratch.ArgumentType.STRING,
                  menu: "sortMethod"
                }
              }
            },
            {
              opcode: "deleteTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete [SCOPE] list [LIST]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "deleteAllTempLists",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete all [SCOPE] lists"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
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
                ITEM: this.fieldParamTemplate("string", "thing"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "forEachNum",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each item # [IDX] in [SCOPE] list [LIST]"),
              hideFromPalette: this.isDependencyNotLoaded(),
              arguments: {
                IDX: this.fieldParamTemplate("string", "index"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "forEachItemNum",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each item value [ITEM] # [IDX] in [SCOPE] list [LIST]"),
              hideFromPalette: this.isDependencyNotLoaded(),
              arguments: {
                ITEM: this.fieldParamTemplate("string", "thing"),
                IDX: this.fieldParamTemplate("string", "index"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },

            "---",
            this.fieldParamTemplate("label", "Misc"),
            {
              opcode: "setTempList1ToTempList2",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set [SCOPE1] list [LIST1] to [SCOPE2] list [LIST2]"),
              arguments: {
                SCOPE1: this.fieldParamTemplate("menu", "scope"),
                SCOPE2: this.fieldParamTemplate("menu", "scope"),
                LIST1: this.fieldParamTemplate("string", "list1"),
                LIST2: this.fieldParamTemplate("string", "list2"),
              }
            },
            {
              opcode: "setTempListToList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set [SCOPE] list [LIST] to [LISTS]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                LISTS: this.fieldParamTemplate("menu", "lists"),
              },
            },
            {
              opcode: "setTempListToArray",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set [SCOPE] list [LIST] to array [ARRAY]"),
              disableMonitor: true,
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                ARRAY: this.fieldParamTemplate("string", '["apple","banana", ["cranberry", "durian", ["elderberry"]]]'),
              },
            },
            {
              opcode: "getTempListAsArray",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("[SCOPE] list [LIST] as array"),
              disableMonitor: true,
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "tempListExists", //can't just use 'isListInEnvironment' here
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("[SCOPE] list [LIST] exists?"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              },
            },
            {
              opcode: "listTempLists",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("active [SCOPE] lists"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
              },
              disableMonitor: true,
            },
          ].filter((i) => i),
          menus: {
            scope: {
              acceptReporters: false,
              items: [
                { text: Scratch.translate("thread"), value: "0" },
                { text: Scratch.translate("scoped"), value: "1" },
                { text: Scratch.translate("runtime"), value: "2" }
              ]
            },
            sortMethod: {
              items: [
                { text: Scratch.translate("ascending order"), value: "A-Z" },
                { text: Scratch.translate("descending order"), value: "Z-A" },
                { text: Scratch.translate("increasing frequency"), value: "rarest first" },
                { text: Scratch.translate("decreasing frequency"), value: "popular first" },
                { text: Scratch.translate("reverse order"), value: "reverse" },
                { text: Scratch.translate("randomicity"), value: "shuffle" },
              ]
            },
            lists: { acceptReporters: true, items: "_getLists" },
          },
        };
      }

      /*--------FUNCTIONS--------*/

      // EXTENSION CONSTRUCTION
      resetTemporaryLists() {
        this.resetRuntimeLists();
        this.resetScopedLists();
      }
      resetRuntimeLists() {
        this.runtimeLists = Object.create(null)
      }
      resetScopedLists() {
        this.scopedLists = Object.create(null);
      }
      getListObjectFromName(name, util) {
        const runtime = Scratch.vm.runtime;
        const stageTarget = runtime.getTargetForStage();
        const target = util.target;
        let listObject = Object.create(null);

        listObject = stageTarget?.lookupVariableByNameAndType(name, "list");
        if (listObject) return listObject;
        listObject = target?.lookupVariableByNameAndType(name, "list");
        return (listObject ?? Object.create(null))
      }
      getListEnvironment(args, util, scope = "SCOPE", name = "LIST") {
        switch (args[scope]) {
          case "0": //THREAD
            const thread = util.thread;
            if (!thread.lists) {
              thread.lists = Object.create(null);
            }
            if (!(this.isListInEnvironment(args, util, scope, name))) thread.lists[args[name]] = [];
            return thread.lists[args[name]];
          case "1": //SCOPED
            const id = util.target.id;
            if (!this.scopedLists) {
              this.resetScopedLists();
            }
            if (!this.scopedLists[id]) {
              this.scopedLists[id] = Object.create(null);
            }
            if (!(this.isListInEnvironment(args, util, scope, name))) this.scopedLists[id][args[name]] = [];
            return this.scopedLists[id][args[name]];
          case "2": //RUNTIME
            if (!this.runtimeLists) {
              this.resetRuntimeLists();
            }
            if (!(this.isListInEnvironment(args, util, scope, name))) this.runtimeLists[args[name]] = [];
            return this.runtimeLists[args[name]];
          default: return [];
        }
      }
      isListInEnvironment(args, util, scope = "SCOPE", name = "LIST") {
        switch (args[scope]) {
          case "0": //THREAD
            const thread = util.thread;
            if (!thread.lists) {
              thread.lists = Object.create(null);
            }
            return args[name] in thread.lists;
          case "1": //SCOPED
            const id = util.target.id;
            if (!this.scopedLists) {
              this.resetScopedLists();
            }
            if (!this.scopedLists[id]) {
              this.scopedLists[id] = Object.create(null);
            }
            return args[name] in this.scopedLists[id];
          case "2": //RUNTIME
            if (!this.runtimeLists) {
              this.resetRuntimeLists();
            }
            return args[name] in this.runtimeLists;
          default: return "";
        }
      }
      isDependencyNotLoaded() {
        return !(Scratch?.vm?.runtime?.extensionManager?.isExtensionLoaded("lmsTempVars2") || false);
      }
      fieldParamTemplate(argType, text, hidden = false, translate = true) {
        switch (argType) {
          case "string":
            return {
              type: Scratch.ArgumentType.STRING,
              defaultValue: (translate ? Scratch.translate(text) : text),
            };
          case "index":
            return { type: Scratch.ArgumentType.NUMBER, defaultValue: text };
          case "label":
            return {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate(text),
              hideFromPalette: hidden,
            };
          case "menu":
            return { type: Scratch.ArgumentType.STRING, menu: text };
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
          list.splice(0, list.length)
        }
      }
      deleteAllOfTempList(args, util) {
        let list = this.getListEnvironment(args, util)
        list.splice(0, list.length)
      }
      insertIntoTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          if ((1 <= args.IDX) && (args.IDX < list.length + 1)) {
            list.splice(Math.floor(args.IDX - 1), 0, args.ITEM);
          }
        } else {
          let list = this.getListEnvironment(args, util)
          list.splice(0, list.length, args.ITEM);
        }
      }
      replaceItemOfTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          if ((1 <= args.IDX) && (args.IDX < list.length + 1)) {
            list[args.IDX - 1] = args.ITEM;
          }
        } else {
          let list = this.getListEnvironment(args, util)
          list.splice(0, list.length, args.ITEM);
        }
      }
      itemOfTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          if ((1 <= args.IDX) && (args.IDX < list.length + 1)) {
            return list[args.IDX - 1] ?? "";
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
          return list.length ?? "";
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
          let START = Math.max(1, Math.min(Math.floor(args.IDX1), Math.floor(args.IDX2))), END = Math.min(list.length, Math.max(Math.floor(args.IDX1), Math.floor(args.IDX2)));
          let bound1 = (args.IDX1 >= 1) && (list.length + 1 > args.IDX1), bound2 = (args.IDX2 >= 1) && (list.length + 1 > args.IDX2)
          if (bound1 && bound2) list.splice(START - 1, END - START + 1);
        } else {
          let list = this.getListEnvironment(args, util)
          list.splice(0, list.length)
        }
      }
      deleteAllInstancesFromTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          let filtered = list.filter((i) => i !== args.ITEM);
          list.splice(0, list.length, ...filtered);
        } else {
          let list = this.getListEnvironment(args, util)
          list.splice(0, list.length)
        }
      }
      replaceAllInstancesInTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          let filtered = list.map((i) => i === args.ITEM1 ? args.ITEM2 : i);
          list.splice(0, list.length, ...filtered);
        } else {
          let list = this.getListEnvironment(args, util)
          list.splice(0, list.length)
        }
      }
      sortTempList(args, util) {
       if (this.isListInEnvironment) {
        let list = this.getListEnvironment(args, util)
        let newList = list.valueOf()
        let freqs = {}
        switch (args.METHOD) {
          case "A-Z": 
            newList.sort();
            break;
          case "Z-A":
            newList.sort();
            newList.reverse();
            break;
          case "rarest first":
            for (let i of newList) { freqs[i] = (freqs?.[i] ?? 0) + 1 }
            newList.sort((a,b) => {
              if (freqs[a] !== freqs[b]) {
                return freqs[a] - freqs[b];
              }
              return a.localeCompare(b);
            });
            break;
          case "popular first":
            for (let i of newList) { freqs[i] = (freqs?.[i] ?? 0) + 1 }
            newList.sort((a,b) => {
              if (freqs[b] !== freqs[a]) {
                return freqs[b] - freqs[a];
              }
              return a.localeCompare(b);
            });
            break;
          case "reverse":
            newList.reverse()
            break;
          case "shuffle":
            for (let i = newList.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [newList[i], newList[j]] = [newList[j], newList[i]];
            };
            break;
          default: break;
        }
        list.splice(0, list.length, ...newList);
       } 
      }
      deleteTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          switch (args.SCOPE) {
            case "0": //THREAD
              const thread = util.thread;
              delete thread.lists[args.LIST]
              break;
            case "1": //SCOPED
              const id = util.target.id;
              delete this.scopedLists[id][args.LIST];
              break;
            case "2": //RUNTIME
              delete this.runtimeLists[args.LIST];
              break;
            default: break;
          }
        }
      }
      deleteAllTempLists(args, util) {
        switch (args.SCOPE) {
          case "0": //THREAD
            const thread = util.thread;
            delete thread.lists
            break;
          case "1": //SCOPED
            const id = util.target.id;
            delete this.scopedLists[id];
            break;
          case "2": //RUNTIME
            delete this.runtimeLists;
            break;
          default: break;
        }
      }
      
      // ITERATION LOOPS
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
      setTempList1ToTempList2(args, util) {
        let list1 = this.getListEnvironment(args, util, "SCOPE1", "LIST1");
        if (this.isListInEnvironment(args, util, "SCOPE2", "LIST2")) {
          let list2 = this.getListEnvironment(args, util, "SCOPE2", "LIST2");
          list1.splice(0, list1.length, ...list2);
        } else {
          list1.splice(0, list1.length);
        }
      }
      setTempListToList(args, util) {
        let list1 = this.getListEnvironment(args, util)
        const list2 = this.getListObjectFromName(Scratch.Cast.toString(args.LISTS), util);
        list1.splice(0, list1.length, ...(list2?.value || []));
      }
      setTempListToArray(args, util) {
        let list = this.getListEnvironment(args, util), array;
        try {
          array = Object.values(JSON.parse(args.ARRAY)).flat(Infinity);
        } catch (e) {
          array = [];
        }
        list.splice(0, list.length, ...array)
      }
      getTempListAsArray(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util)
          return JSON.stringify(list || []);
        } else {
          return "";
        }
      }
      tempListExists(args, util) { //mismatching inputs between a block and its opcoded function are ignored by TW -_-
        return this.isListInEnvironment(args, util)
      }
      listTempLists(args, util) {
        return JSON.stringify(Object.keys((() => {
          switch (args.SCOPE) {
            case "0": //THREAD
              const thread = util.thread;
              if (!thread.lists) {
                thread.lists = Object.create(null);
              }
              return thread.lists;
            case "1": //SCOPED
              const id = util.target.id;
              if (!this.scopedLists) {
                this.resetScopedLists();
              }
              if (!this.scopedLists[id]) {
                this.scopedLists[id] = Object.create(null);
              }
              return this.scopedLists?.[id];
            case "2": return this.runtimeLists; //RUNTIME
            default: return null;
          }
        })() ?? []).flat(Infinity));
      }
    }
    const TempLists = new TemporaryLists();
    if (TempLists.isDependencyNotLoaded()) {
      console.warn('Install "Temporary Variables" (by LilyMakesThings) to access iteration loops');
    }
    Scratch.extensions.register(TempLists);
  }
})(Scratch);