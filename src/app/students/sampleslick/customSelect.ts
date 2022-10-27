// import { SelectEditor } from 'angular-slickgrid';

// export class CustomSelectEditor extends SelectEditor {
//     private lastEventName = '';
//   constructor(args) {
//     super(args);
//     // retrieve the options that were provided to multipleSelect.JS
//     // we will override the onClose/onOpen to get last event name triggered
//     // Note: make sure that the onClose is still calling the this.save() else nothing will work
//     const libOptions = this.editorDomElement.multipleSelect('getOptions');
//     libOptions.onClose = () => {
//       this.lastEventName = 'onClose';
//       this.save();
//     };
//     libOptions.onOpen = () => {
//       this.lastEventName = 'onOpen';
//     }
//     this.editorDomElement.multipleSelect('refreshOptions', libOptions);
//   }

//   isValueChanged(): boolean {
//     // return true only when it's the onClose event to fire the editCommandHandler
//     if (this.lastEventName === 'onClose') {
//         return true;
//       }
  
//       // but keep previous logic when it's not the onClose event
//       if (this.isMultipleSelect) {
//         return charArraysEqual(this.$editorElm.val(), this.originalValue);
//       }
//       return this.$editorElm.val() !== this.originalValue;
//   }


// }

