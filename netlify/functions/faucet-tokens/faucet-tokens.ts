import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import { Handler } from "@netlify/functions";

import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const APIURL = "https://api-mumbai.lens.dev/";

const fooBar = gql`
  query Query($accessToken: string) {
    verify(request: { accessToken: $accessToken })
  }
`;

export const apolloClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

// const apolloClient = new ApolloClient({
//   ssrMode: true,
//   link: createHttpLink({
//     uri: APIURL,
//   }),
//   cache: new InMemoryCache(),
// });

export const handler: Handler = async (event, context) => {
  // const { name = "stranger" } = event.queryStringParameters;

  const result = await verifyRequest("foo");
  console.log(result);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello!`,
    }),
  };
};

const verify = async (request: VerifyRequest) => {
  const result = await apolloClient.query({
    query: fooBar,
    variables: {
      accessToken:
        "eyJhbGmiOiJIUzI1NiIsInR5cCI2IkpXVCJ9.eyJpZCI6IjB4RUVBMEMxZjVhYjAxNTlkYmE3NDlEYzBCQWVlNDYyRTVlMjkzZGFhRiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2NDUxODg5OTQsImV4cCI6MTY2MzE4ODk5NH0.dgO9L5NxlVG_8Mc7H-1VFTIYQDRm_I-KCe2nvkLpx5o",
    },
  });

  return result;
};

export const verifyRequest = async (accessToken: string) => {
  try {
    const result = await verify({ accessToken });
    console.log("verify: result", result);

    return result;
  } catch (e) {
    console.log(e);
  }

  return null;
};

const VerifyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "verify" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "request" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "VerifyRequest" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "verify" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "request" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "request" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifyQuery, VerifyQueryVariables>;

/** The access request */
type VerifyRequest = {
  /** The access token */
  accessToken: Scalars["Jwt"];
};

type VerifyQueryVariables = Exact<{
  request: VerifyRequest;
}>;

type VerifyQuery = { __typename?: "Query"; verify: boolean };

export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};

/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BlockchainData: any;
  BroadcastId: any;
  ChainId: any;
  CollectModuleData: any;
  ContractAddress: any;
  CreateHandle: any;
  Cursor: any;
  DateTime: any;
  Ens: any;
  EthereumAddress: any;
  FollowModuleData: any;
  Handle: any;
  HandleClaimIdScalar: any;
  InternalPublicationId: any;
  Jwt: any;
  LimitScalar: any;
  Locale: any;
  Markdown: any;
  MimeType: any;
  NftOwnershipId: any;
  Nonce: any;
  NotificationId: any;
  ProfileId: any;
  ProxyActionId: any;
  PublicationId: any;
  PublicationTag: any;
  PublicationUrl: any;
  ReactionId: any;
  ReferenceModuleData: any;
  Search: any;
  Signature: any;
  Sources: any;
  TimestampScalar: any;
  TxHash: any;
  TxId: any;
  UnixTimestamp: any;
  Url: any;
  Void: any;
};
