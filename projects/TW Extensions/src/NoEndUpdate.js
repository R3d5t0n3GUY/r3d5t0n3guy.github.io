// Name: Wait on
// ID: r3d5t0n3guywaiton
// Description: Days since last End Update

(function (S) {
  "use strict";
  if (Scratch.extensions.unsandboxed) {
    class KeepWaiting {
      getInfo() {
        return {
          color1: "#5cb1d6",
          id: "r3d5t0n3guywaiton",
          name: Scratch.translate("Wait on"),
          blocks: [
            {
              opcode: "daycheck",
              blockType: S.BlockType.REPORTER,
              text: S.translate("Days since last End Update")
            }
          ]
        }
      }
      daycheck() {
        const timeDiff = (new Date()).getTime() - new Date(Scratch.Cast.toString('2016-02-29')).getTime();
        return Math.floor(timeDiff / 86400000);
      }
    }
    S.extensions.register(new KeepWaiting());
  } else {
    throw new Error("This extension must run unsandboxed");
  }
})(Scratch);