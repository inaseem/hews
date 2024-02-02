export type GetArticleResponse = {
  exhaustive: {
    nbHits: boolean;
    typo: boolean;
  };
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  hits: {
    _highlightResult: {
      author: {
        matchLevel: string;
        matchedWords: never[];
        value: string;
      };
      title: {
        matchLevel: string;
        matchedWords: never[];
        value: string;
      };
      url: {
        matchLevel: string;
        matchedWords: never[];
        value: string;
      };
    };
    _tags: string[];
    author: string;
    children: number[];
    created_at: string;
    created_at_i: number;
    num_comments: number;
    objectID: string;
    points: number;
    story_id: number;
    title: string;
    updated_at: string;
    url: string;
  }[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: {
    _request: {
      roundTrip: number;
    };
    afterFetch: {
      merge: {
        total: number;
      };
      total: number;
    };
    total: number;
  };
  query: string;
  serverTimeMS: number;
};

export type GetStoryDetailsResponse = {
  author: string;
  created_at: string;
  created_at_i: number;
  id: number;
  options: never[];
  parent_id: null | string;
  points: number;
  story_id: number;
  text?: string;
  title: string;
  type: string;
  url: string;
  children: GetStoryDetailsResponse[];
};
