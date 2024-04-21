import { ISkill } from "../interfaces/skill.interface";
import { instances } from "./instances";

export const getAllSkills = async (): Promise<ISkill[]> => {
  const response = await instances.get("/skills");
  return response.data;
};

export const createSkill = async (
  data: Omit<ISkill, "id">
): Promise<ISkill> => {
  const response = await instances.post("/skills", data);
  return response.data;
};

export const deleteSkill = async (id: number): Promise<void> => {
  return await instances.delete(`/skills/${id}`);
};

export const updateSkill = async (skill: ISkill): Promise<ISkill> => {
  const response = await instances.put(`/skills/${skill.id}`, skill);
  return response.data;
};

export const getSkillByID = async (id: number): Promise<ISkill> => {
  const response = await instances.get(`/skills/${id}`);
  return response.data;
};
