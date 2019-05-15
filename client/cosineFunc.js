import similarity from "compute-cosine-similarity";
import { flattenArr } from "./Data/flatArrGen";

export function compare(normArray1, flatRefImage) {
  let flatnormArray1 = flattenArr(normArray1);

  if (flatnormArray1.length !== flatRefImage.length) {
    // for(let i = 0; )
    flatnormArray1 = new Array(flatRefImage.length);
  }
  // return flatImageData.map(pose=>cosineDistanceMatching(pose,flatnormArray1))
  return cosineDistanceMatching(flatRefImage, flatnormArray1);
}

export function cosineDistanceMatching(
  flatnormArray = [],
  flatnormArray1 = []
) {
  let cosineSimilarity = similarity(flatnormArray, flatnormArray1);
  let distance = 2 * (1 - cosineSimilarity);
  //console.log(`distance: ${Math.sqrt(distance)}`)
  return Math.sqrt(distance);
}
