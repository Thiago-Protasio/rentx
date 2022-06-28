import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        );
    });

    it("Should not be able to add a new specification to a car that does not exist", async () => {
        const car_id = "1234";
        const specification_id = ["54321"];
        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specification_id,
            })
        ).rejects.toEqual(new AppError("Car does not exists"));
    });

    it("Should be able to add a new specification to a car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            brand: "Car Brand",
            category_id: "Category",
            license_plate: "ABC-1234",
            fine_amount: 60,
            daily_rate: 100,
        });

        const specification = await specificationRepositoryInMemory.create({
            description: "test",
            name: "test",
        });

        const specification_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specification_id,
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
