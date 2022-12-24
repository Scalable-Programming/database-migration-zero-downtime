import { mongoDbCollection } from "./index";
import { UserSchema } from "./types";
import { ObjectId, WithId } from "mongodb";

interface Props {
  createdAt?: Date;
  lastUserId?: string;
  limit?: number;
}

export const getUsers = async ({
  lastUserId,
  limit = 10,
  createdAt,
}: Props) => {
  const aggregations = [
    // Only for migration
    createdAt
      ? {
          $match: {
            createdAt: { $lte: createdAt },
          },
        }
      : null,
    lastUserId
      ? {
          $match: {
            _id: { $gt: new ObjectId(lastUserId) },
          },
        }
      : null,
    {
      $sort: {
        _id: 1,
      },
    },
    { $limit: limit },
  ];

  return mongoDbCollection
    .aggregate<WithId<UserSchema>>(
      aggregations.filter((aggregations) => !!aggregations)
    )
    .toArray();
};
