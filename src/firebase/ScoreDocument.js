/*
Bucket priority: Category > Concept > Direct Mention in text > (Partial) keyword
Highest score in the highest bucket above wins.
Ties (excerpts within .20 of each other in the highest bucket) go to the mentions
Multiples scores in the same bucket are added together (e.g., if a video has three partial keyword scores)

{
    winner: Category || Concept || Direct Mention
}


*/

export const scoreByBucket = (doc, searchStr) => {
  let str = searchStr.toLowerCase();
  //console.log("score the docs using the string", str);
  let mapScore = {
    numberOfKeyWordPartialMentions: 0,

    numberOfKeyWordDirectMentions: 0,

    numberOfConceptPartialMentions: 0,
    numberOfConceptDirectMentions: 0,

    numberOfCategoryPartialMentions: 0,
    numberOfCategoryDirectMentions: 0
  };
  let scoreRelevance = {
    kpr: 0,
    kdr: 0,
    conceptr: 0,
    catr: 0
  };

  doc.keywords.forEach(item => {
    if (item.text.toLowerCase().indexOf(str) !== -1) {
      mapScore.numberOfKeyWordPartialMentions++;
      if (scoreRelevance.kpr === 0) {
        scoreRelevance.kpr = item.relevance;
      }
    }
  });

  let filteredDirectKeyWords = doc.keywords.filter(item => {
    return item.text.toLowerCase() === str;
  });

  mapScore.numberOfKeyWordDirectMentions = filteredDirectKeyWords.length;

  if (filteredDirectKeyWords.length > 0) {
    scoreRelevance.kdr = filteredDirectKeyWords[0].relevance;
  }

  /****concepts */
  doc.concepts.forEach(item => {
    if (item.text.toLowerCase().indexOf(str) !== -1) {
      mapScore.numberOfConceptPartialMentions++;
      if (scoreRelevance.conceptr === 0) {
        scoreRelevance.conceptr = item.relevance;
      }
    }
  });

  let conceptsFiltered = doc.concepts.filter(item => {
    return item.text.toLowerCase() === str;
  });

  mapScore.numberOfConceptDirectMentions = conceptsFiltered.length;

  if (conceptsFiltered.length > 0) {
    scoreRelevance.conceptr = conceptsFiltered[0].relevance;
  }

  /******* */

  doc.categories.forEach(item => {
    if (item.label.toLowerCase().indexOf(str) !== -1) {
      mapScore.numberOfCategoryPartialMentions++;
      if (scoreRelevance.catr === 0) {
        scoreRelevance.catr = item.score;
      }
    }
  });

  let catFiltered = doc.categories.filter(item => {
    return item.label.toLowerCase() === str;
  });
  mapScore.numberOfCategoryDirectMentions = catFiltered.length;

  if (catFiltered.length > 0) {
    scoreRelevance.catr = catFiltered[0].score;
  }

  // console.log(
  //   "numberOfKeyWordPartialMentions",
  //   mapScore.numberOfKeyWordPartialMentions
  // );
  // console.log(
  //   "numberOfKeyWordDirectMentions",
  //   mapScore.numberOfKeyWordDirectMentions
  // );
  // console.log("**********");
  // console.log(
  //   "numberOfConceptPartialMentions",
  //   mapScore.numberOfConceptPartialMentions
  // );
  // console.log(
  //   "numberOfConceptDirectMentions",
  //   mapScore.numberOfConceptDirectMentions
  // );

  // console.log("**********");
  // console.log(
  //   "numberOfCategoryPartialMentions",
  //   mapScore.numberOfCategoryPartialMentions
  // );
  // console.log(
  //   "numberOfCategoryDirectMentions",
  //   mapScore.numberOfCategoryDirectMentions
  // );

  let h = Object.keys(mapScore).reduce((a, b) =>
    mapScore[a] > mapScore[b] ? a : b
  );
  //console.log("high score", h);

  let winningBucket = '';
  let sortNumber = 0;
  let relevance = 100;

  switch (h) {
    case 'numberOfKeyWordPartialMentions':
      winningBucket = 'PartialKeyword';
      sortNumber = 3;
      relevance = scoreRelevance.kpr;
      break;
    case 'numberOfKeyWordDirectMentions':
      winningBucket = 'DirectKeyword';
      sortNumber = 2;
      relevance = scoreRelevance.kdr;
      break;
    case 'numberOfConceptPartialMentions':
      winningBucket = 'Concept';
      sortNumber = 1;
      relevance = scoreRelevance.conceptr;
      break;
    case 'numberOfConceptDirectMentions':
      winningBucket = 'Concept';
      sortNumber = 1;
      relevance = scoreRelevance.conceptr;
      break;
    case 'numberOfCategoryPartialMentions':
      winningBucket = 'Category';
      sortNumber = 0;
      relevance = scoreRelevance.catr;
      break;
    case 'numberOfCategoryDirectMentions':
      winningBucket = 'Category';
      sortNumber = 0;
      relevance = scoreRelevance.catr;
      break;

    default:
    // code block
  }
  // console.log(
  //   "winningBucket",
  //   winningBucket,
  //   "sortNumber",
  //   sortNumber,
  //   "relevance",
  //   relevance
  // );
  // console.log(
  //   "winningBucket**************************************************",
  //   winningBucket,
  //   relevance
  // );
  return {
    winningBucket: winningBucket,
    sortNumber: sortNumber,
    str: str,
    relevance: relevance
  };
};

export const removeConsecutiveItems = docs => {
  // console.log(docs);
  var scrubbedDocs = [];
  var selTitlecount = 0;
  var selTitle = '';
  var selIdCount = 0;
  var selid = 0;
  docs.forEach(item => {
    // console.log("we are checking ", item.doc.data.title);
    let title = item.doc.data.title;
    let id = item.doc.id;
    if (selTitle === title) {
      // console.log("hey we have a duplicate", selTitle, title);
      selTitlecount++;
    } else {
      selTitle = title;
      selTitlecount = 0;
    }

    if (id === selid) {
      selIdCount++;
    } else {
      selid = id;
      selIdCount = 0;
    }

    if (selTitlecount < 2 && selIdCount < 1) {
      scrubbedDocs.push(item);
    } else {
      // console.log("we stopped one!!!!!");
    }
  });

  return scrubbedDocs;
};
