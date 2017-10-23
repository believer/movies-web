/**
 * @flow
 * @relayHash 5d5da53dd138dab1617d6f048334dbc0
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type FeedContainerQueryResponse = {|
  +feed: $ReadOnlyArray<?{| |}>;
|};
*/


/*
query FeedContainerQuery {
  feed {
    ...Feed_feed
  }
}

fragment Feed_feed on Movie {
  genres
  id
  rating
  title
  user {
    email
  }
  views
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FeedContainerQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Movie",
        "name": "feed",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Feed_feed",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "FeedContainerQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "FeedContainerQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Movie",
        "name": "feed",
        "plural": true,
        "selections": [
          {
            "kind": "InlineFragment",
            "type": "Movie",
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "genres",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "rating",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "User",
                "name": "user",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "email",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "views",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query FeedContainerQuery {\n  feed {\n    ...Feed_feed\n  }\n}\n\nfragment Feed_feed on Movie {\n  genres\n  id\n  rating\n  title\n  user {\n    email\n  }\n  views\n}\n"
};

module.exports = batch;
