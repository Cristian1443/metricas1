import {Router} from 'express';
import { UserAdapter } from '../adpter/UserAdapter';
import { UserApplication } from '../../application/UserApplication';
import { UserController } from '../controller/UserController';



const router = Router();


const userAdapter = new UserAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);
router.post("/users",async(request, response)=>{
    try{
        await userController.registerUser(request, response);
    }catch(error){
        console.error("Error en usuario",error);     
        response.status(400).json({ message: "Error en servidor" });
    }
});
router.get("/users",async(request, response)=>{
    try{
        await userController.allUsers(request, response);
    }catch(error){
        console.error("Error en usuario",error);     
        response.status(400).json({ message: "Error en servidor" });
    }
});
router.get("/users/:id",async(request, response)=>{
    try{
        await userController.searchUserById(request, response);
    }catch(error){
        console.error("Error en usuario",error);     
        response.status(400).json({ message: "Error en servidor" });
    }
});

router.put("/users/:id",async(request, response)=>{
    try{
        await userController.updateUser(request, response);
    }catch(error){
        console.error("Error en usuario",error);     
        response.status(400).json({ message: "Error en servidor" });
    }
});
router.delete("/users/:id",async(request, response)=>{
    try{
        await userController.downdUser(request, response);
    }catch(error){
        console.error("Error en usuario",error);     
        response.status(400).json({ message: "Error en servidor" });
    }
});
router.get("/users/email/:email",async(request, response)=>{
    try{
        await userController.searchUserByEmail(request, response);
    }catch(error){
        console.error("Error en usuario",error);     
        response.status(400).json({ message: "Error en servidor" });
    }
});


export default router;