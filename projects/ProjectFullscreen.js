// Name: Project Fullscreen
// ID: r3d5t0n3guyprojectfullscreen
// Description: Enter and exit the built-in fullscreen
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
            opcode: 'evaluateFullscreen',
            func: 'evaluate',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is fullscreen?'
          },
        ]
      };
    }
    enter() {
      if (location.pathname != '/fullscreen') {
        document.getElementsByClassName('stage-header_stage-button-icon_3zzFK')[document.getElementsByClassName('stage-header_stage-button-icon_3zzFK').length - 1].parentElement.parentElement.click()
      }
    }
    exit() {
      if (location.pathname == '/fullscreen') {
        document.getElementsByClassName('stage-header_stage-button-icon_3zzFK')[document.getElementsByClassName('stage-header_stage-button-icon_3zzFK').length - 1].parentElement.parentElement.click()
      }
    }
    evaluate() {
      return location.pathname == '/fullscreen'
    }
  }

  Scratch.extensions.register(new ProjectFullscreen());
})(Scratch);