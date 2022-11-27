import { writable } from "svelte/store";



export const statusMap = new Map([
  [-1, 'cancelled'],
  [0, "order placed"],
  [1, "quote in progress"],
  [2, "quote sent"],
  [3, "quote approved"],
  [4, "in printing"],
  [5, "awaiting payment"],
  [6, "shipped"],
]);



export const addressStore = writable(
  JSON.parse(localStorage.getItem('address')) || {
    'full-name': '',
    autocomplete: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  }
)

addressStore.subscribe(value => {
  localStorage.setItem('address', JSON.stringify(value))
})

  



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

export const emailStore = writable(JSON.parse(localStorage.getItem("emailStore")) || '')
emailStore.subscribe((value) => {localStorage.setItem("emailStore", JSON.stringify(value))})

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