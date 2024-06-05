import express from "express";
import MemberController from "../../controller/apiController/memberController.js";

const memberRoute = express.Router();
//get list memeber
memberRoute.get("/api/accounts", MemberController.getMembers);

//get member by id
memberRoute.get("/api/accounts/:id", MemberController.getMemberById);


export default memberRoute;