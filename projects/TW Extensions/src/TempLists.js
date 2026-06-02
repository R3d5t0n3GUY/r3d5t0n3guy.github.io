// Name: Temporary Lists
// ID: r3d5t0n3guyTempLists
// Description: Addon for Lily's "Temporary Variables" that adds thread lists
// Original Extensions By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// This Add-On By: R3d5t0n3_GUY <https://github.com/R3d5t0n3GUY>
// License: MIT AND LGPL-3.0
// WORK IN PROGRESS

(function (Scratch) {
  "use strict";

  const label = (name, hidden) => ({
    blockType: Scratch.BlockType.LABEL,
    text: name,
    hideFromPalette: hidden,
  });

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed")
  } else if (!runtime.extensionManager.isExtensionLoaded("lmsTempVars2")) {
    throw new Error('Please install "Temporary Variables" (by LilyMakesThings) before loading this extension!')
  } else {
    
    /* -- SETUP -- */
    const vm = Scratch.vm;
    const runtime = vm.runtime;

    const getVarObjectFromName = function (name, util, type) {
      const stageTarget = runtime.getTargetForStage();
      const target = util.target;
      let listObject = Object.create(null);

      listObject = stageTarget.lookupVariableByNameAndType(name, type);
      if (listObject) return listObject;
      listObject = target.lookupVariableByNameAndType(name, type);
      if (listObject) return listObject;
    };

    class TempLists {
      getInfo() {
        return {
          id: "r3d5t0n3guyTempLists",
          name: Scratch.translate("Temporary Lists"),
          color1: "#ff661a",
          color2: "#f2590d",
          color3: "#e64d00",
          blocks: [
            label(Scratch.translate("Thread Lists"), false),
            {
              opcode: "addToThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("add [STRING] to list [NAME]"),
              arguments: {
                STRING: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "thing",
                },
                NAME: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "thread list"
                }
              },
            },
            {
              opcode: "deleteFromThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete [IDX] of list [NAME]"),
              arguments: {
                IDX: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: "1",
                },
                NAME: {
                type: Scratch.ArgumentType.STRING,
                  defaultValue: "thread list"
                }
              },
            },
            {
              opcode: "forEachItem",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each item value [ITEM] in [NAME]"),
              arguments: {
                ITEM: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "name",
                },
                NAME: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "thread list"
                }
              },
            },
            {
              opcode: "forEachNum",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each item # [IDX] in [NAME]"),
              arguments: {
                IDX: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "index",
                },
                NAME: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "thread list"
                }
              },
            },
            {
              opcode: "forEachItemNum",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each item value [ITEM] # [IDX] in [NAME]"),
              arguments: {
                ITEM: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "name",
                },
                IDX: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "index",
                },
                NAME: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "thread list"
                }
              },
            },
            
            "---",
        {
            opcode: "setListToArray",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [NAME] to array [ARRAY]"),
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thread list"
              },
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["apple","banana"]',
              },
            },
          },
          {
            opcode: "getListAsArray",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[NAME] as array"),
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thread list"
              },
            },
          },

            "---",

            {
              opcode: "threadListExists",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("thread list [NAME] exists?"),
              arguments: {
                NAME: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "list",
                },
              },
            },
            {
              opcode: "listThreadLists",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("active thread lists"),
              disableMonitor: true,
            },
          ],
        };
      }

      addToThreadList() {

      }

      deleteFromThreadList() {

      }

      deleteAllOfThreadList() {

      }

      insertIntoThreadList() {

      }

      replaceItemOfThreadList() {

      }

      indexInThreadList() {

      }

      itemOfThreadList() {

      }

      lengthOfThreadList() {

      }

      threadListContains() {

      }

      forEachItem() {

      }

      forEachNum() {

      }

      forEachItemNum(args, util) {
        /* const list = getVarObjectFromName(
          Scratch.Cast.toString(args.LIST),
          util,
          "list"
        );
        if (!list) return false;
        const listLength = list.value.length;

        const thread = util.thread;
        if (!thread.variables) thread.variables = {};
        const vars = thread.variables;

        if (typeof util.stackFrame.index === "undefined") {
          util.stackFrame.index = 0;
        }

        if (util.stackFrame.index < listLength) {
          util.stackFrame.index++;
          vars[args.VAR] = util.stackFrame.index;
          return true;
        } */
      }

      setListToArray() {

      }

      getListAsArray() {

      }

      threadListExists(args, util) {
        /* const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        return Object.prototype.hasOwnProperty.call(thread.lists, args.LIST); */
      }

      listThreadLists(args, util) {
        /* const thread = util.thread;
        if (!thread.lists) {
            thread.lists = Object.create(null);
        }
        return Object.keys(thread.lists).join(","); */
      }

    }
  }
  
  // The expose format follows TurboWarp's convention of `ext_${extensionId}`.
  // Expose the extension on runtime for others to use.
  const extension = new TempLists();
  Scratch.vm.runtime.ext_r3d5t0n3guyTempLists = extension;
  Scratch.extensions.register(extension);

})(Scratch);

/* // A LOT of moving and editing is left... ಠ_ಠ
    deleteItems(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return false;
      const listLength = list.value.length;
      let num1 = 0;
      let num2 = 0;
      if (!list) return;
      if (args.NUM1 > args.NUM2) {
        num1 = args.NUM2 - 1;
        num2 = args.NUM1 - 1;
      } else {
        num1 = args.NUM1 - 1;
        num2 = args.NUM2 - 1;
      }
      const listPart1 = list.value.slice(0, num1);
      const listPart2 = list.value.slice(num2 + 1, listLength);
      list.value = listPart1.concat(listPart2);
    }

    deleteAllOfItem(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return;
      const newList = list.value.filter(function (model) {
        return model !== args.ITEM;
      });
      list.value = newList;
    }

    replaceAllOfItem(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return;
      const listLength = list.value.length;
      const item1 = args.ITEM1;
      const item2 = args.ITEM2;
      let newList = [];
      for (let i = 0; i < listLength; i++) {
        if (list.value[i] === item1) {
          newList.push(item2);
        } else {
          newList.push(list.value[i]);
        }
      }
      list.value = newList;
    }

    repeatList(args, util) {
      const list1 = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST1),
        util,
        "list"
      );
      if (!list1) return;
      const list2 = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST2),
        util,
        "list"
      );
      if (!list2) return;
      const currentVal = list1.value;
      for (let i = 0; i < args.NUM; i++) {
        list2.value = list2.value.concat(currentVal);
      }
    }

    getListJoin(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return "";
      return list.value.join(args.STRING);
    }

    timesItemAppears(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return 0;
      return list.value.filter((model) => model == args.ITEM).length;
    }

    itemIndex(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return 0;
      let indexes = [];
      for (let index = 0; index < list.value.length; index++) {
        if (list.value[index] === args.ITEM) {
          indexes.push(index);
        }
      }

      switch (args.INDEX) {
        case "_first_":
          return Scratch.Cast.toNumber(indexes[0] + 1);
        case "_last_":
          return Scratch.Cast.toNumber(indexes[indexes.length - 1] + 1);
        case "_random_":
          return Scratch.Cast.toNumber(
            indexes[Math.floor(Math.random() * indexes.length)] + 1
          );
        default:
          return Scratch.Cast.toNumber(indexes[args.INDEX - 1] + 1);
      }
    }

    listIsEmpty(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return true;
      if (list.value.length > 0) return false;
      return true;
    }

    itemNumExists(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return false;
      const listIndex = Scratch.Cast.toListIndex(
        args.NUM,
        list.value.length,
        false
      );
      if (listIndex === Scratch.Cast.LIST_INVALID) return false;
      return true;
    }

    orderIs(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return false;

      for (let i = 0; i < list.value.length - 1; i++) {
        const compare = Scratch.Cast.compare(list.value[i + 1], list.value[i]);
        if (compare > 0 && args.ORDER === "descending") return false;
        if (compare < 0 && args.ORDER === "ascending") return false;
      }
      return true;
    }

    orderList(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return;
      if (args.ORDER === "reversed") {
        list.value.reverse();
      } else if (args.ORDER === "randomised") {
        const randomised = list.value
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        list.value = randomised;
      } else if (args.ORDER === "ascending") {
        list.value.sort(Scratch.Cast.compare);
      } else if (args.ORDER === "descending") {
        list.value.sort(Scratch.Cast.compare).reverse();
      }
      list._monitorUpToDate = false;
    }

    setListToList(args, util) {
      const list1 = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST1),
        util,
        "list"
      );
      if (!list1) return;
      const list2 = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST2),
        util,
        "list"
      );
      if (!list2) return;
      list1.value = list2.value;
    }

    joinLists(args, util) {
      const list1 = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST1),
        util,
        "list"
      );
      if (!list1) return;
      const list2 = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST2),
        util,
        "list"
      );
      if (!list2) return;
      list2.value = list2.value.concat(list1.value);
    }

    forEachListItem(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return false;
      const listLength = list.value.length;

      const thread = util.thread;
      if (!thread.variables) thread.variables = {};
      const vars = thread.variables;

      if (typeof util.stackFrame.index === "undefined") {
        util.stackFrame.index = 0;
      }

      if (util.stackFrame.index < listLength) {
        let itemIndex = util.stackFrame.index;
        vars[args.VAR] = list.value[itemIndex];
        util.stackFrame.index++;
        return true;
      }
    }

    setListArray(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return;

      let array;
      try {
        array = JSON.parse(args.ARRAY);
      } catch (error) {
        return;
      }

      if (!Array.isArray(array)) return;
      const newArray = array;
      list.value = newArray;
    }

    getListArray(args, util) {
      const list = getVarObjectFromName(
        Scratch.Cast.toString(args.LIST),
        util,
        "list"
      );
      if (!list) return "";
      return JSON.stringify(list.value);
    }
 */