import express from "express";
import MemberController from "../../controller/apiController/memberController.js";
import { authenticateToken } from "../../middleware/jwtAccessToken.js";
const memberRoute = express.Router();
//get list memeber
memberRoute.get("/api/accounts", authenticateToken ,MemberController.getMembers);

//get member by id
memberRoute.get("/api/accounts/:id",authenticateToken, MemberController.getMemberById);

//edit account
memberRoute.put("/api/accounts/:id", authenticateToken, MemberController.editMember);

export default memberRoute;