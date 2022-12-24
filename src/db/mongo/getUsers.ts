import { mongoDbCollection } from "./index";
import { ObjectId } from "mongodb";

export const getUsers = async (lastUserId?: string, limit = 10) => {
  const aggregations = [
    {
      $sort: {
        _id: 1,
      },
    },
    lastUserId
      ? {
          _id: { $gt: new ObjectId(lastUserId) },
        }
      : null,
    { $limit: limit },
  ];

  return mongoDbCollection
    .aggregate(aggregations.filter((aggregations) => !!aggregations))
    .toArray();
};
