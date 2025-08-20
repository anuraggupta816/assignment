import { Transaction } from "../models/transaction";
import { Investment } from "../models/investment";

export async function list(userId: number) {
  return Transaction.findAll({
    where: { user_id: userId },
    include: [{ model: Investment, as: "investment" }],
    order: [["id", "DESC"]],
  });
}

export async function create(userId: number, data: Partial<Transaction>) {
  return Transaction.create({ ...data, user_id: userId } as any);
}

export async function overview(userId: number) {
  const investments = await Investment.findAll({ where: { user_id: userId } });
  const totalCurrent = investments.reduce(
    (sum, i) => sum + Number(i.current_value),
    0
  );
  const totalPurchase = investments.reduce(
    (sum, i) => sum + Number(i.purchase_price),
    0
  );
  const performance =
    totalPurchase === 0
      ? 0
      : ((totalCurrent - totalPurchase) / totalPurchase) * 100;
  const byType: Record<
    string,
    { totalCurrent: number; totalPurchase: number }
  > = {};
  for (const i of investments) {
    const key = i.asset_type;
    if (!byType[key]) byType[key] = { totalCurrent: 0, totalPurchase: 0 };
    byType[key].totalCurrent += Number(i.current_value);
    byType[key].totalPurchase += Number(i.purchase_price);
  }
  console.log("cccc:::", {
    totalCurrent,
    totalPurchase,
    performance,
    byType,
    investments,
  });
  return { totalCurrent, totalPurchase, performance, byType, investments };
}
