import db, { generateId } from "../../src/modules/db";

const run = async () => {
    await db.submission.createMany({
        data: [
            {
                id: generateId(),
                submittedAt: new Date(),
                data: {
                    name: "Shamanth",
                    email: "shamanth1604@gmail.com",
                },
            },
        ],
    });
};

// Auto-run if main script (not imported)
if (require.main === module) {
    run().then(() => {
        console.log("Data seed complete");
        process.exit();
    });
}
