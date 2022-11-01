import { writable } from "svelte/store";

// persist an array of objects to localStorage
export const quoteStore = writable(
  JSON.parse(localStorage.getItem("quoteStore")) || [
    // {
    //   title: 'Tab 1',
    //   $id: 1,
  
    //   type: null,
    //   material: '',
  
    //   quantity: 0,
    //   height: 0,
    //   width: 0,
    //   depth: 0,
  
    //   description: '',
    //   requirements: '',
    //   url: '',
    //   address: '',
    //   status: '',
    // },
  ]
);

quoteStore.subscribe((value) => {
  localStorage.setItem("quoteStore", JSON.stringify(value));
});




export const activeStore = writable(JSON.parse(localStorage.getItem("activeStore")) || 3)
activeStore.subscribe((value) => {localStorage.setItem("activeStore", JSON.stringify(value))})

// placeholder, I'll probably use UUIDv4 to generate unique IDs later
export const currentIdStore = writable(JSON.parse(localStorage.getItem("currentIdStore")) || 4)
currentIdStore.subscribe((value) => {localStorage.setItem("currentIdStore", JSON.stringify(value))})

export const loggedInStore = writable(JSON.parse(localStorage.getItem("loggedInStore")) || false)
loggedInStore.subscribe((value) => {localStorage.setItem("loggedInStore", JSON.stringify(value))})

// export const quoteStore = writable([
//   {
//     title: 'Tab 1',
//     id: 1,

//     type: null,
//     material: '',

//     quantity: 0,
//     height: 0,
//     width: 0,
//     depth: 0,

//     desc: '',
//     req: '',
//   },
//   {
//     title: 'Tab 2',
//     id: 2,

//     type: null,
//     material: '',

//     quantity: 0,
//     height: 0,
//     width: 0,
//     depth: 0,

//     desc: '',
//     req: '',
//   },
//   {
//     title: 'Tab 3',
//     id: 3,

//     type: null,
//     material: '',

//     quantity: 0,
//     height: 0,
//     width: 0,
//     depth: 0,

//     desc: '',
//     req: '',
//   },
// ]);

// placeholder, might move active variable to App or Nav?