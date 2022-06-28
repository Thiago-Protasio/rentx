import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Car name",
            description: "Car description",
            brand: "Car Brand",
            category_id: "Category",
            license_plate: "ABC-1234",
            fine_amount: 60,
            daily_rate: 100,
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be to create a new car if the license plate is already registered", async () => {
        await createCarUseCase.execute({
            name: "Car1",
            description: "Car description",
            brand: "Car Brand",
            category_id: "Category",
            license_plate: "ABC-1234",
            fine_amount: 60,
            daily_rate: 100,
        });

        await expect(
            createCarUseCase.execute({
                name: "Car2",
                description: "Car description",
                brand: "Car Brand",
                category_id: "Category",
                license_plate: "ABC-1234",
                fine_amount: 60,
                daily_rate: 100,
            })
        ).rejects.toEqual(new AppError("Car already exists!"));
    });

    it("A created car must be available by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car available",
            description: "Car description",
            brand: "Car Brand",
            category_id: "Category",
            license_plate: "DEF-1234",
            fine_amount: 60,
            daily_rate: 100,
        });

        expect(car.available).toBe(true);
    });
});
