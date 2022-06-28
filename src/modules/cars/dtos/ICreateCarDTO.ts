import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
    name: string;
    description: string;
    daily_rate: number;
    fine_amount: number;
    brand: string;
    category_id: string;
    license_plate: string;
    specifications?: Specification[];
    id?: string;
}

export { ICreateCarDTO };
