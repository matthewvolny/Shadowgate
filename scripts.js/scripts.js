let PlayerInventory = document.querySelector(".playerInventory");
let locationItems = document.querySelector(".locationItems");

let openAction = document.querySelector(".openButton");
let takeAction = document.querySelector(".takeButton");
let lookAction = document.querySelector(".lookButton");

let skull = document.querySelector(".skull");
let door = document.querySelector(".door");

const playerActions = document.querySelector(".playerDecisionInterface");
const roomContainer = document.querySelector(".room-container");

//player inventory
let inventoryArray = [];

//room objects
const dataObject = [
  {
    baseUrl: "./room1-doorway.png",
    roomScript: "",
    mapCoordinates: [
      { index: 1, position: "top" },
      { index: "", position: "" },
      { index: "", position: "" },
      { index: "", position: "" },
    ],
    items: [
      {
        name: "skull",
        left: "100px",
        right: "100px",
        lookText:
          "It's the skull of some creature. Its meaning seems quite clear: death lurks inside.",
        openText: "As if by magic, the skull rises.",
        openUrl: "./room1-doorway.png",
        takenUrl: "./room1-doorway.png",
      },
      {
        name: "door",
        left: "100px",
        right: "100px",
        lookText: "It's a heavy wooden door with iron hinges.",
        openText: "As if by magic, the skull rises.",
        takenUrl: "./room1-doorway.png",
      },
    ],
  },
];

let roomIndex = 0; // set at 0 for start of game
//render map for current room
const renderMap = (dataObject) => {
  //console.log(dataObject[roomIndex]);
  dataObject[roomIndex].mapCoordinates.forEach((coordinate) => {
    //console.log(`${coordinate.index}`);
    if (coordinate.index !== "") {
      let mapDot = document.createElement("div");
      mapDot.className = `${coordinate.position}`;
      roomContainer.appendChild(mapDot);
    }
  });
};

//after clicking mapDot
//changeRoomIndex()
renderMap(dataObject);

//functions executing on player actions
let genericResponses = "randomly generated responses";
const open = (item) => {
  switch (item) {
    case "skull":
      console.log("the skull opens, it reveals a key");
      let key = document.createElement("div");
      key.innerHTML = "Key";
      locationItems.replaceChild(key, skull);
      key.addEventListener("click", () => {
        item = "key";
        console.log(item);
        evaluateFunction(item);
      });
      break;
    case "door":
      console.log("the door is locked");
      break;
    case "self":
      console.log("you are wasting your time");
      break;
  }
};

const look = (item) => {
  switch (item) {
    case "skull":
      console.log("it is an old skull fitted to the wall");
      break;
    case "door":
      console.log("it is an old, and firmly locked wooden door");
      break;
    case "self":
      console.log("there is no time for vanity");
      break;
    case "key":
      console.log("a tarnished brass key is fixed to the wall");
      break;
  }
};

const take = (item) => {
  switch (item) {
    case "skull":
      console.log("you cannot take it");
      break;
    case "door":
      console.log("you are wasting your time");
      break;
    case "key":
      console.log("you have taken the key");
      inventoryArray.push("key");
      console.log(inventoryArray);
      PlayerInventory.innerHTML = inventoryArray;
      break;
  }
};

//*render initial room image
/*
const renderRoom = (roomNumber) => {
  room.src = `${dataObject[roomNumber].baseUrl}`;
};
roomNumber = 0; //you start out at 0, then clicking on the map, changes that value depending on where you are
renderRoom(roomNumber);
*/

//render items on the screen
/*
renderedItemsArray = [];
renderitems(roomNumber);
const renderItems = (roomNumber) => {
  let newItem = document.createElemente("div");
  newItem.style.width = `${dataObject[roomNumber].width}`;
  newItem.style.height = `${dataObject[roomNumber].height}`;
  newItem.style.left = `${dataObject[roomNumber].left}`;
  newItem.style.top = `${dataObject[roomNumber].top}`;
  newItem.addEventListener("click", (e) => {
    item = `${dataObject[roomNumber].item}`;
    renderedItemsArray.push(item);
    evaluateFunction(item);
  });
};
*/
////////////////////////////////////
////////present in each room///////
////////////////////////////////////

//player actions
let action = "";
playerActions.addEventListener("click", (e) => {
  action = e.target.value;
  console.log(action);
});

//functions called based on the 'action' taken and the 'item' selected
function evaluateFunction() {
  switch (
    action //i.e. if the action is 'open', call open(item)
  ) {
    case "open":
      open(item);
      break;
    case "take":
      take(item);
      break;
    case "look":
      look(item);
      break;
  }
}
