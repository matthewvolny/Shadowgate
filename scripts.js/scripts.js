let PlayerInventory = document.querySelector(".playerInventory");
let locationItems = document.querySelector(".locationItems");

let openAction = document.querySelector(".open");
let takeAction = document.querySelector(".take");
let lookAction = document.querySelector(".look");

let skull = document.querySelector(".skull");
let door = document.querySelector(".door");

const primaryActions = document.querySelector(".player-primary-actions");
const mapArea = document.querySelector(".map-area");
const roomArea = document.querySelector(".room-area");

//player inventory
let playerInventoryArray = [];

//room objects
const dataObject = [
  {
    baseUrl: "./room1-doorway.png",
    entryScript:
      "The last thing that you remember is standing before the wizard Lakmir as he waved his hands. Now you find yourself staring at an entryway which lies at the edge of a forest. The Druid's words ring in your ears: within the castle Shadowgate lies your quest. The dreaded Warlock Lord will use his Black Magic to raise the Behemoth from the dark depths. The combination of his evil arts and the great Titan's power will surely destroy us all!! You are the last of the line of Kings, the seed of prophecy that was foretold eons ago. Only you can stop the evil one from darkening our world forever! Fare thee well. Gritting your teeth, you swear by your god's name that you will destroy the Warlock Lord!!",
    reentryScript:
      "It's the entrance to Shadowgate. You can hear wolves howling deep in the forest behind you...",
    mapCoordinates: [
      { index: 1, position: "top" }, //top
      { index: "", position: "" }, //right
      { index: "", position: "" }, //bottom
      { index: "", position: "" }, //left
    ],
    items: [
      {
        name: "skull",
        position: "skull",
        lookText:
          "It's the skull of some creature. Its meaning seems quite clear: death lurks inside.",
        openText: "As if by magic, the skull rises.",
        useText: "",
        leaveText: "",
        takeText: "",
        closeText: "The Skull is closed.",
        hitText: "",
        speakText: "",
        lookEffect: "",
        openEffect: "itemAppears(key)",
        useEffect: "",
        leaveEffect: "",
        takeEffect: "",
        closeEffect: "",
        hitEffect: "",
        speakEffect: "",
        lookUrl: "",
        openUrl: "./room1-doorway.png",
        useUrl: "",
        leaveUrl: "",
        takeUrl: "",
        closeUrl: "",
        hitUrl: "",
        speakUrl: "",
      },
      {
        name: "key",
        position: "key",
        lookText: "It's a small iron key",
        openText: "",
        useText: "",
        leaveText: "",
        takeText: "",
        closeText: "",
        hitText: "",
        speakText: "",
        lookEffect: "",
        openEffect: "",
        useEffect: "",
        leaveEffect: "",
        takeEffect: "",
        closeEffect: "",
        hitEffect: "",
        speakEffect: "",
        lookUrl: "",
        openUrl: "./room1-doorway.png",
        useUrl: "",
        leaveUrl: "",
        takeUrl: "",
        closeUrl: "",
        hitUrl: "",
        speakUrl: "",
      },
      {
        name: "door",
        position: "door",
        lookText: "It's a heavy wooden door with iron hinges.",
        openText:
          "The door is open. It's the door leading into the castle Shadowgate.",
        useText: "",
        leaveText: "",
        takeText: "",
        closeText: "",
        hitText: "",
        speakText: "",
        lookUrl: "",
        openUrl: "./room1-doorway.png",
        useUrl: "",
        leaveUrl: "",
        takeUrl: "",
        closeUrl: "",
        hitUrl: "",
        speakUrl: "",
      },
      {
        name: "wall",
        position: "wall",
        lookText: "It's a stone wall.",
        openText: "",
        useText: "",
        leaveText: "",
        takeText: "",
        closeText: "",
        hitText: "",
        speakText: "",
        lookUrl: "",
        openUrl: "",
        useUrl: "",
        leaveUrl: "",
        takeUrl: "",
        closeUrl: "",
        hitUrl: "",
        speakUrl: "",
      },
    ],
  },
  {
    baseUrl: "room2",
    entryScript:
      "That pitiful wizard Lakmir was a fool to send a buffoon like you to stop me. You will surely regret it for the only thing here for you is a horrible death! The sound of maniacal laughter echoes in your ears.",
    reentryScript:
      "You stand in a long corridor. Huge stone archways line the entire hall.",
    mapCoordinates: [
      { index: 2, position: "top" },
      { index: "", position: "" },
      { index: 0, position: "bottom" },
      { index: "", position: "" },
    ],
    items: [
      {
        name: "closet door",
        position: "",
        lookText:
          "Even though this door is only an inch thick, it is very sturdy.",
        openText: "The door is locked",
        useText: "",
        leaveText: "",
        takeText: "",
        closeText: "",
        hitText: "",
        speakText: "",
        lookUrl: "",
        openUrl: "",
        useUrl: "",
        leaveUrl: "",
        takeUrl: "",
        closeUrl: "",
        hitUrl: "",
        speakUrl: "",
      },
      {
        name: "far door",
        position: "",
        lookText: "This wooden door is reinforced with heavy sheets of steel.",
        openText: "the door is locked",
        useText: "",
        leaveText: "",
        takeText: "",
        closeText: "",
        hitText: "",
        speakText: "",
        lookUrl: "",
        openUrl: "",
        useUrl: "",
        leaveUrl: "",
        takeUrl: "",
        closeUrl: "",
        hitUrl: "",
        speakUrl: "",
      },
    ],
  },
];

//roomIndex specifies player's location in the game
let roomIndex = 0; // set at 0 for start of game

//render map for current room
const renderMap = (dataObject) => {
  dataObject[roomIndex].mapCoordinates.forEach((coordinate) => {
    if (coordinate.index !== "") {
      let mapDot = document.createElement("div");
      mapDot.innerHTML = `<div onclick="changeRoom(${coordinate.index})">*</div>`;
      console.log(coordinate.index);
      mapDot.className = `${coordinate.position}`; //to position the elements
      mapArea.appendChild(mapDot);
    }
  });
};

//render room url
const renderRoom = (dataObject) => {
  let roomImage = document.createElement("img");
  roomImage.innerHTML = `<img onclick="....could I have items here..." src = "(${dataObject[roomIndex].baseUrl})">*</img>`;
  roomImage.className = "room-image";
  roomArea.appendChild(roomImage);
};

//render items in the room
const renderItems = (dataObject) => {
  dataObject[roomIndex].items.forEach((item) => {
    let itemDot = document.createElement("div");
    itemDot.innerHTML = `<div>*</div>`;
    console.log(item.name);
    itemDot.classList.add(`${item.position}`, "item"); //to position the elements
    console.log(item.position);
    roomArea.appendChild(itemDot);
  });
};

//player actions
let action = "";
primaryActions.addEventListener("click", (event) => {
  action = event.target.getAttribute("value");
  console.log(action);
});

//event listener for newly created items, checks for a class of "item"
const body = document.querySelector("body");
body.addEventListener("click", function (event) {
  if (event.target.classList.contains("item")) {
    console.log(event.target.classList[0]);
    evaluateFunction(action, event.target.classList[0]);
  }
});
//`${item.name}, ${item.lookText}, ${item.openText}, ${item.useText}, ${item.leaveText}, ${item.takeText}, ${item.closeText}, ${item.hitText}, ${item.speakText}, ${item.lookUrl}, ${item.openUrl}, ${item.useUrl}, ${item.leaveUrl}, ${item.takeUrl}, ${item.closeUrl}, ${item.hitUrl}, ${item.speakUrl}`;
//changes room, calls renderMap to generate new room
const changeRoom = (y) => {
  mapArea.innerHTML = "";
  roomArea.innerHTML = "";
  roomIndex = y;
  console.log(roomIndex);
  renderMap(dataObject);
  renderItems(dataObject);
  renderRoom(dataObject);
};

renderMap(dataObject);
renderItems(dataObject);

//*render initial room image
/*
const renderRoom = (roomNumber) => {
  room.src = `${dataObject[roomNumber].baseUrl}`;
};
roomNumber = 0; //you start out at 0, then clicking on the map, changes that value depending on where you are
renderRoom(roomNumber);
*/

//functions called based on the 'action' taken and the 'item' selected
const evaluateFunction = (action, x) => {
  let itemProperties = dataObject[roomIndex].items.find((currentItemInfo) => {
    return currentItemInfo.position == x;
  }); //'itemProperties' now contains all the properties of the selected item
  console.log(itemProperties);
  console.log(itemProperties.openText);
  if (action === "look" && itemProperties.openText != "") {
    console.log(itemProperties.lookText);
    console.log(itemProperties.lookUrl);
  } else if (action === "open" && itemProperties.openText != "") {
    console.log(itemProperties.openText);
    console.log(itemProperties.openUrl);
  } else if (action === "use" && itemProperties.useText != "") {
    console.log(itemProperties.useText);
    console.log(itemProperties.useUrl);
  } else if (action === "leave" && itemProperties.leaveText != "") {
    console.log(itemProperties.leaveText);
    console.log(itemProperties.leaveUrl);
  } else if (action === "take" && itemProperties.takeText != "") {
    console.log(itemProperties.takeText);
    if (
      itemProperties.takeText[0] === `The ${itemProperties.name} is in hand`
    ) {
      playerInventoryArray.push(itemProperties.name);
      console.log(itemProperties.takeUrl);
    }
  } else if (action === "close" && itemProperties.closeText != "") {
    console.log(itemProperties.closeText);
    console.log(itemProperties.closeUrl);
  } else if (action === "hit" && itemProperties.hitText != "") {
    console.log(itemProperties.hitText);
    console.log(itemProperties.hitUrl);
  } else if (action === "speak" && itemProperties.speakText != "") {
    console.log(itemProperties.speakText);
    console.log(itemProperties.speakUrl);
  } else {
  }
};
