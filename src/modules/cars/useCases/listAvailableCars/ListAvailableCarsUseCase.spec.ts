import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            brand: "Car Brand",
            category_id: "Category id",
            license_plate: "ABC-1234",
            fine_amount: 60,
            daily_rate: 100,
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            brand: "Car Brand2",
            category_id: "Category id",
            license_plate: "DEF-1234",
            fine_amount: 60,
            daily_rate: 100,
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car Brand2",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            brand: "Car Brand",
            category_id: "Category id",
            license_plate: "GHI-1234",
            fine_amount: 60,
            daily_rate: 100,
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4",
            description: "Car description",
            brand: "Car Brand",
            category_id: "12345",
            license_plate: "JKM-1234",
            fine_amount: 60,
            daily_rate: 100,
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });

        expect(cars).toEqual([car]);
    });
});
