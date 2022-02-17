import { InMemoryChallengeRepository } from "../../tests/repositories/InMemoryChallengeRepository";
import { InMemoryStudentsRepository } from "../../tests/repositories/InMemoryStudentRepository";
import { CreateChallengeSubmission } from "./CreateChallengeSubmission";

import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/student";

describe("Create challenge submission use case", () => {
  it("should be able to create a new challenge submission", async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const challengesRepository = new InMemoryChallengeRepository();

    const student = Student.create({
      name: "Diego",
      email: "doe@example.com",
    });

    const challenge = Challenge.create({
      title: "Challenge 01",
      instructionsUrl: "http://example.com",
    });

    studentsRepository.items.push(student);
    challengesRepository.items.push(challenge);

    const sut = new CreateChallengeSubmission(
      studentsRepository,
      challengesRepository
    );

    const response = await sut.execute({
      studentId: student.id,
      challengeId: challenge.id,
    });

    expect(response).toBeTruthy();
  });
});
