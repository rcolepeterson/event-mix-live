import fakeData from './fakeDataTwo';
import {scoreByBucket, removeConsecutiveItems} from './ScoreDocument';

/*
Bucket priority: Category > Concept > Direct Mention in text > (Partial) keyword
Highest score in the highest bucket above wins.
Ties (excerpts within .20 of each other in the highest bucket) go to the mentions
Multiples scores in the same bucket are added together (e.g., if a video has three partial keyword scores)
*/

export const searchByString = (documents, strArray) => {
  let arr = strArray.map(item => {
    return search(documents, item);
  });

  var merged = [].concat.apply([], arr);
  //console.log("searchByString", merged.length, " documents to score");
  let scoredDocuments = merged.map(doc => {
    return {
      doc,
      score: scoreByBucket(doc.data.NLU.result, doc.strSearchValue)
    };
  });

  // let sortedByScore = scoredDocuments.sort((a, b) => {
  //   return a.score.sortNumber > b.score.sortNumber ? 1 : -1;
  // });

  //console.log("scoredDocuments", sortedByScore);
  //let removeConsecutiveDocs = removeConsecutiveItems(sortedByScore);

  // removeConsecutiveDocs.forEach(item => {
  //   if (item.score.winningBucket === "Category") {
  //     item.score.sortNumber =
  //       item.score.sortNumber + item.doc.data.NLU.result.categories[0].score;
  //   } else if (item.score.winningBucket === "Concept") {
  //     item.score.sortNumber =
  //       item.score.sortNumber + item.doc.data.NLU.result.concepts[0].relevance;
  //   } else if (
  //     item.score.winningBucket === "PartialKeyword" ||
  //     item.score.winningBucket === "DirectKeyword"
  //   ) {
  //     item.score.sortNumber =
  //       item.score.sortNumber + item.doc.data.NLU.result.keywords[0].relevance;
  //   }
  // });

  // let sortedByScoreTwo = removeConsecutiveDocs.sort((a, b) => {
  //   return a.score.sortNumber > b.score.sortNumber ? 1 : -1;
  // });

  //let sortRelvanceDocs = sortByRelevance(removeConsecutiveDocs);
  // console.log("removeConsecutiveDocs", removeConsecutiveDocs);
  let CatDocs = scoredDocuments
    .filter(item => {
      return item.score.winningBucket === 'Category';
    })
    .sort((a, b) => {
      return a.score.relevance < b.score.relevance ? 1 : -1;
    });

  let ConceptDocs = scoredDocuments
    .filter(item => {
      return item.score.winningBucket === 'Concept';
    })
    .sort((a, b) => {
      return a.score.relevance < b.score.relevance ? 1 : -1;
    });

  let DirectKeywordDocs = scoredDocuments
    .filter(item => {
      return item.score.winningBucket === 'DirectKeyword';
    })
    .sort((a, b) => {
      return a.score.relevance < b.score.relevance ? 1 : -1;
    });

  let PartialKeyWordDocs = scoredDocuments
    .filter(item => {
      return item.score.winningBucket === 'PartialKeyword';
    })
    .sort((a, b) => {
      return a.score.relevance < b.score.relevance ? 1 : -1;
    });

  let rCatDocs = removeConsecutiveItems(CatDocs);
  let rConceptDocs = removeConsecutiveItems(ConceptDocs);
  let rDirectKeywordDocs = removeConsecutiveItems(DirectKeywordDocs);
  let rPartialKeyWordDocs = removeConsecutiveItems(PartialKeyWordDocs);

  return [
    ...rCatDocs,
    ...rConceptDocs,
    ...rDirectKeywordDocs,
    ...rPartialKeyWordDocs
  ];
};
//dbpedia_resource: "http://dbpedia.org/resource/DNA", relevance: 0.96686, text: "DNA"
// const sortByRelevance = documents => {
//   let concepts = documents
//     .filter(item => item.score.winningBucket === "Concept")
//     .sort((a, b) => {
//       return a.doc.data.relevance > b.doc.data.relevance ? 1 : -1;
//     });
//   return concepts;
// };

export const search = (documents, str) => {
  documents = fakeData;

  if (!str) {
    console.log('you did not pass anything in.');
    return [];
  }

  let filteredDocs = documents.filter(item => {
    return item.data.NLU && item.data.NLU.result;
  });

  console.log(
    'we will search ',
    filteredDocs.length,
    'documents by the string',
    str
  );

  let allResults = [];

  filteredDocs.forEach(function(o) {
    o.data.NLU.result.keywords.forEach(item => {
      if (item.text.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
        allResults.push(o);
      }
    });
  });

  filteredDocs.forEach(function(o) {
    o.data.NLU.result.categories.forEach(item => {
      if (item.label.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
        allResults.push(o);
      }
    });
  });

  filteredDocs.forEach(function(o) {
    o.data.NLU.result.concepts.forEach((item, i) => {
      if (item.text.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
        // console.log(i, "concept filtred docs", item.text.toLowerCase());
        allResults.push(o);
      }
    });
  });

  allResults.forEach(function(o) {
    return (o.strSearchValue = str);
  });

  return allResults;
};
