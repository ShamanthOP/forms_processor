import { DateTimeScalar } from "graphql-date-scalars";
import GraphQLJSON from "graphql-type-json";
import db from "../modules/db";
import { enqueue } from "../modules/queue";
import { times } from "lodash";

const resolvers = {
    JSON: GraphQLJSON,
    DateTime: DateTimeScalar,

    Query: {
        submissions: () => {
            return db.submission.findMany({ orderBy: { submittedAt: "desc" } });
        },
    },

    Mutation: {
        queueSubmissionGeneration: async (
            _: any,
            { count }: { count: number }
        ) => {
            await Promise.all(
                times(count ?? 1).map(async () => {
                    await enqueue("generateSubmissions");
                })
            );
            return true;
        },
    },
};

export default resolvers;
