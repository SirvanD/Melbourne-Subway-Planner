let travelArray = [];
let travelArraySecond = [];
let routeShowDiv = document.querySelector(".route_show");
let originP = document.querySelector(".origin_div");
let destP = document.querySelector(".dest_div");
let originInputBox = document.querySelector("#origin_input_box");
let destInputBox = document.querySelector("#dest_input_box");
let submitInputBox = document.querySelector("#submit_input_box");
let clearInputBox = document.querySelector("#clear_input_box");
let stopsCounterP = document.querySelector(".stops_counter_p");
let routeShow = document.querySelector(".route_show");

// originDiv.textContent = "This is a test";

let lines = [
  [
    "Flinders Street",
    "Richmond",
    "East Richmond",
    "Burnley",
    "Hawthorn",
    "Glenferrie",
  ],
  [
    "Flagstaff",
    "Melbourne Central",
    "Parliament",
    "Richmond",
    "Kooyong",
    "Tooronga",
  ],
  ["Southern Cross", "Richmond", "South Yarra", "Prahran", "Windsor"],
];

//------------------------------------
// function to find stop line
const findOrigin = (origin) => {
  for (let j = 0; j < lines.length; j++) {
    // console.log(lines.length);
    if (lines[j].includes(origin)) {
      return lines[j];
    }
  }
  return false;
};

// ?
const findOriginReverse = (origin) => {
  for (let j = 0; j < lines.length; j++) {
    // console.log(lines.length);
    if (lines[j].slice().reverse().includes(origin)) {
      return lines[j].slice().reverse();
    }
  }
  return false;
};

// ?
const findDestination = (dest) => {
  for (let j = 0; j < lines.length; j++) {
    if (lines[j].includes(dest)) {
      return lines[j];
    }
  }
  return false;
};

//?
const findDestinationReverse = (dest) => {
  for (let j = 0; j < lines.length; j++) {
    if (lines[j].slice().reverse().includes(dest)) {
      return lines[j].slice().reverse();
    }
  }
  return false;
};

// findOrigin(originInput);
// console.log(findOrigin("Flagstaff"));
// console.log(findDestination("Kooyong"));

const findRoute = (originStop, destStop) => {
  let originFunc = findOrigin(originStop);
  let originFuncReversed = findOriginReverse(originStop);
  let destFuncReversed = findDestinationReverse(destStop);
  let destFunc = findDestination(destStop);
  let originIndex = originFunc.indexOf(originStop);
  let destIndex = destFunc.indexOf(destStop);
  let originIntersection = originFunc.indexOf("Richmond");
  let destIntersection = destFunc.indexOf("Richmond");
  let originReversed = originFunc.slice().reverse();
  let destReversed = destFunc.slice().reverse();
  let originIndexReversed = originReversed.indexOf(originStop);
  let destIndexReversed = destReversed.indexOf(destStop);
  let originIntersectionReversed = originReversed.indexOf("Richmond");
  let destIntersectionReversed = destReversed.indexOf("Richmond");
  //
  // console.log(originFunc);

  // if both stops are in the same line and origin is before intersection
  if (
    findOrigin(originStop) == findDestination(destStop) &&
    originIndex < destIndex
  ) {
    for (let i = originIndex; i <= destIndex; i++) {
      travelArray.push(originFunc[i]);
    }
    travelArraySecond = [];
    return showRoute(travelArray, travelArraySecond);
  } else if (
    // if both stops are in the same line and origin is after intersection - reverse
    findOrigin(originStop) == findDestination(destStop) &&
    originIndex > destIndex
  ) {
    // console.log(originFunc);
    // console.log(originReversed);
    for (let k = originIndexReversed; k <= destIndexReversed; k++) {
      travelArray.push(originReversed[k]);
    }
    travelArraySecond = [];
    // console.log(travelArray);
    return showRoute(travelArray, travelArraySecond);
  } else if (
    // 2 different lines - first one straight and second one reverse
    findOrigin(originStop) !== findDestination(destStop) &&
    originIndex < originIntersection &&
    destIndex < destIntersection
  ) {
    for (let l = originIndex; l <= originIntersection; l++) {
      travelArray.push(originFunc[l]);
    }
    for (let m = destIntersectionReversed; m <= destIndexReversed; m++) {
      travelArraySecond.push(destFuncReversed[m]);
    }
    return showRoute(travelArray, travelArraySecond);
  } else if (
    // 2 lines -> first one reverse and second one straight
    findOrigin(originStop) !== findDestination(destStop) &&
    originIndex > originIntersection &&
    destIndex > destIntersection
  ) {
    // console.log(originIndex, originIntersection);
    // console.log(destIndex, destIntersection);
    for (let n = originIndexReversed; n <= originIntersectionReversed; n++) {
      travelArray.push(originFuncReversed[n]);
    }
    for (let o = destIntersectionReversed; o >= destIndexReversed; o--) {
      travelArraySecond.push(destFuncReversed[o]);
    }
    return showRoute(travelArray, travelArraySecond);
  } else if (
    // 2 lines -> first one reverse and second one reverse
    findOrigin(originStop) !== findDestination(destStop) &&
    originIndex > originIntersection &&
    destIndex < destIntersection
  ) {
    for (let p = originIndex; p >= originIntersection; p--) {
      travelArray.push(originFunc[p]);
      // console.log("this is working");
    }
    for (let q = destIntersectionReversed; q <= destIndexReversed; q++) {
      travelArraySecond.push(destFuncReversed[q]);
      // console.log(travelArray);
    }
    return showRoute(travelArray, travelArraySecond);
  }
  // 2 different lines - both need straight traverse
  else if (
    findOrigin(originStop) !== findDestination(destStop) &&
    originIndex < originIntersection &&
    destIndex > destIntersection
  ) {
    // console.log("this is working");
    for (let l = originIndex; l <= originIntersection; l++) {
      travelArray.push(originFunc[l]);
      // console.log("this is working");
    }
    for (let n = destIntersection; n <= destIndex; n++) {
      travelArraySecond.push(destFunc[n]);
      // console.log(travelArray);
    }
    return showRoute(travelArray, travelArraySecond); //travelArraySecond.join(", ");
  }
};

const showRoute = (originArray, destArray) => {
  // console.log(originArray.join(" -----> "), "\n", "");
  (originP.textContent = originArray.join(" -----> ")), "\n", "";

  // console.log("||");
  // console.log(destArray.join(" -----> "));
  destP.textContent = destArray.join(" -----> ");
  let totalStops = originArray.length - 1 + destArray.length - 1;

  stopsCounterP.textContent = `Total Stops : ${totalStops}`;
};

//Handle Submit function

const handleSubmitFunction = () => {
  travelArray = [];
  travelArraySecond = [];
  routeShow.classList.remove("route_show_hidden");
  routeShow.classList.add("route_show_visible");

  findRoute(originInputBox.value, destInputBox.value);
};

const handleClearFunction = () => {
  routeShow.classList.remove("route_show_visible");
  routeShow.classList.add("route_show_hidden");

  originP.textContent = "";
  destP.textContent = "";
  stopsCounterP.textContent = "";
  travelArray = [];
  travelArraySecond = [];
};

// findRoute("Flinders Street", "Glenferrie");
// findRoute("Flinders Street", "Windsor");
// findRoute("Windsor","Flinders Street");
// findRoute("Glenferrie", "Flinders Street");
// findRoute("Flinders Street", "Flagstaff");

//
submitInputBox.addEventListener("click", handleSubmitFunction);
clearInputBox.addEventListener("click", handleClearFunction);
