import { ISkill } from "../interfaces/skill.interface";
import { instances } from "./instances";

export const getAllSkills = async () => {
  return await instances.get("/skills");
};

export const createSkill = async (data: Omit<ISkill, "id">) => {
  return await instances.post("/skills", data);
};
