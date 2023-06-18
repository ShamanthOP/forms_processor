import { faker } from "@faker-js/faker";
import { random } from "lodash";
import db, { generateId } from "./db";

const submission = async () => {
    return await db.submission.create({
        data: {
            id: generateId(),
            submittedAt: new Date(),
            data: {
                name: faker.name.fullName(),
                email: faker.internet.email(),
                company: faker.company.name(),
                comments: faker.lorem.words(random(30, false)),
            },
        },
    });
};

const ModGenerate = { submission };

export default ModGenerate;
