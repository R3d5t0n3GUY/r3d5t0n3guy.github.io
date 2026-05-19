// Name: Project Fullscreen
// ID: r3d5t0n3guyprojectfullscreen
// Description: Enter and exit TurboWarp's fullscreen
// By: R3d5t0n3_GUY

(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run unsandboxed');
  }
  
  class ProjectFullscreen {
    getInfo() {
      return {
        id: 'ProjectFullscreen',
        name: 'Project Fullscreen',
        color1: '#1FBF5F',
        blocks: [
          {
            opcode: 'enterFullscreen',
            func: 'enter',
            blockType: Scratch.BlockType.COMMAND,
            text: 'enter fullscreen',
          },
          {
            opcode: 'exitFullscreen',
            func: 'exit',
            blockType: Scratch.BlockType.COMMAND,
            text: 'exit fullscreen',
          },
          {
            opcode: 'alterFullscreen',
            func: 'switchMode',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "[mode] fullscreen"
            ),
            arguments: {
              mode: {
                type: Scratch.ArgumentType.STRING,
                menu: "fullScreenActionMenu"
              }
            }
          },
          {
            opcode: 'evaluateFullscreen',
            func: 'evaluate',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is fullscreen?'
          },
        ],
        menus: {
            fullScreenActionMenu: {
              items: [
                {
                  text: Scratch.translate('enter'),
                  value: 'enterFullscreen'
                },
                {
                  text: Scratch.translate('exit'),
                  value: 'exitFullscreen'
                },
                {
                  text: Scratch.translate('toggle'),
                  value: 'toggleFullscreen'
                },
              ]
            }
        }
      };
    }
    switchMode({mode}) {
      if ((this.evaluate()) === (mode === "exitFullscreen") || mode === "toggleFullscreen") this.toggle()
    }
    enter() {
      if (!this.evaluate()) this.toggle()
    }
    exit() {
      if (this.evaluate()) this.toggle()
    }
    toggle() {
      document.getElementsByClassName('stage-header_stage-button-icon_3zzFK')[document.getElementsByClassName('stage-header_stage-button-icon_3zzFK').length - 1].click()
    }
    evaluate() {
      return location.pathname.search(/\/fullscreen/i) > -1
    }
  }

  Scratch.extensions.register(new ProjectFullscreen());
})(Scratch);