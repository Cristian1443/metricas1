import { Repository } from "typeorm";
import { User } from "../../domain/User";
import { UserPort } from "../../domain/UserPort";
import { UserEntity } from "../entities/UserEntity";
import { AppDataSourse } from "../config/con_data_base";

export class UserAdapter implements UserPort {

    private userRepoitory: Repository<UserEntity>;

    constructor() {
        this.userRepoitory = AppDataSourse.getRepository(UserEntity);
    }
    private toDomain(user:UserEntity):User{
        return{
            id:user.id_user,
            name:user.name_user,
            email:user.email_user,
            password:user.password_user,
            status: user.status_user
        }
        
    }

    private toEntity(user: Omit<User, "id">): UserEntity {
        const userEntity = new UserEntity();
        userEntity.name_user = user.name;
        userEntity.email_user = user.email;
        userEntity.password_user = user.password;
        userEntity.status_user = user.status;
        return userEntity;
    }



    async createUser(user: Omit<User, "id">): Promise<number> {
        try {
            const newUser = this.toEntity(user);
            const savedUser = await this.userRepoitory.save(newUser);
            return savedUser.id_user;
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            throw new Error("Error al crear el usuario: " + (error as Error).message);
        }
    }
    async updateUser(id: number, User: Partial<User>): Promise<boolean> {
        try {
            const existingUser = await this.userRepoitory.findOne({where: {id_user: id} });
            if (!existingUser) {
                throw new Error("Usuario no encontrado");
            }
            Object.assign(existingUser, {
                name_user: User.name ?? existingUser.name_user,
                email_user: User.email ?? existingUser.email_user,  
                password_user: User.password ?? existingUser.password_user,
                status_user: 1
            });
            await this.userRepoitory.save(existingUser);
            return true;
        } catch (error) {
        
            console.error("Error al actualizar el usuario:", error);
            throw new Error("Error al actualizar el usuario: " + (error as Error).message);
        }
        
    }
    async deleteUser(id: number): Promise<boolean> {
        try {
            const existingUser = await this.userRepoitory.findOne({where: {id_user: id} });
            if (!existingUser) {
                throw new Error("Usuario no encontrado");
            }
            Object.assign(existingUser, {
                 status_user: 0
         });
            await this.userRepoitory.save(existingUser);
            return true;
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            throw new Error("Error al eliminar el usuario: " + (error as Error).message);
        }
    }
    async getAllUsers(): Promise<User[]> {
        try{
            const users = await this.userRepoitory.find();
            return users.map(this.toDomain);
        }
        catch(error){
            console.error("Error al crear el usuario:", error);
            throw new Error("Error al crear el usuario: " + (error as Error).message);
    }
  }
    async getUserById(id: number): Promise<User | null> {
        try {
            const user = await this.userRepoitory.findOne({where:{ id_user: id }});
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.error("Error al obtener el usuario por ID:", error);
            throw new Error("Error al obtener el usuario por ID: " + (error as Error).message);
        }
    }
    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.userRepoitory.findOne({where:{email_user: email }});
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.error("Error al obtener el correo:", error);
            throw new Error("Error al obtener el correo: " + (error as Error).message);
        }
    }
}