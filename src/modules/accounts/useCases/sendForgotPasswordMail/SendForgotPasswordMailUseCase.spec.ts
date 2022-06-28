import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokenRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "646561",
            email: "test@test.com",
            name: "test name",
            password: "12345",
        });

        await sendForgotPasswordMailUseCase.execute("test@test.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send an email if the user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("wrong@email.com")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should be able to create an usersToken", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokenRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            driver_license: "545352",
            email: "test2@test.com",
            name: "test name 2",
            password: "616263",
        });

        await sendForgotPasswordMailUseCase.execute("test2@test.com");

        expect(generateTokenMail).toBeCalled();
    });
});
