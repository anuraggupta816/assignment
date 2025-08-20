import { Investment } from "../models/investment";

export async function list(userId: number) {
  const [count, investments]: [number, any[]] = await Promise.all([
    Investment.count({ where: { user_id: userId } }),
    Investment.findAll({
      where: { user_id: userId },
      order: [["id", "DESC"]],
    }),
  ]);
  return {
    count,
    investments,
  };
}

export async function create(userId: number, data: Partial<Investment>) {
  return Investment.create({ ...data, user_id: userId } as any);
}

export async function getById(userId: number, id: number) {
  return Investment.findOne({ where: { id, user_id: userId } });
}

export async function update(
  userId: number,
  id: number,
  data: Partial<Investment>
) {
  const inv = await getById(userId, id);
  if (!inv) return null;
  return inv.update(data);
}

export async function remove(userId: number, id: number) {
  const inv = await getById(userId, id);
  if (!inv) return 0;
  await inv.destroy();
  return 1;
}
