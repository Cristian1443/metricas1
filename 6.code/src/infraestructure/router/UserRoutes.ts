import {Router} from 'express';
import { UserAdapter } from '../adpter/UserAdapter';
import { UserApplication } from '../../application/UserApplication';
import { UserController } from '../controller/UserController';


const router = Router();


const userAdapter = new UserAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);
