import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokenRepository {
    create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUsersTokenDTO): Promise<UserTokens>;
    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export { IUsersTokenRepository };
